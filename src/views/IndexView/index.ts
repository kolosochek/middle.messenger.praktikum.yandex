import Block from '../../utils/Block';
import {RouteI, Router} from '../../utils/Router';
import { Store } from '../../model/Store'
import { ChatListItemInterface, ChatMessageInterface, ChatUserInterface } from '../../model/Store';
import { ChatAsideProfile } from '../../components/ChatAsideProfile';
import { ChatAsideSearch } from '../../components/ChatAsideSearch';
import { ChatList } from '../../components/ChatList';
import { ChatWindow } from '../../components/ChatWindow';
import { Validation } from '../../utils/Validation';
import { ChatAPI } from '../../utils/ChatAPI'
import { WebSocketAPI } from '../../utils/WebSocketAPI'
import template from './template';
import styles from "./style.module.less";
import chatReplyStyles from '../../components/ChatReply/style.module.less'
import chatSettingsStyles from '../../components/ChatSettings/style.module.less'

export interface IndexViewProps {
  router: Router;
}

export class IndexView extends Block<IndexViewProps> {
  public chatAPI = new ChatAPI();
  public webSocket: WebSocketAPI;
  public chatList: Partial<ChatListItemInterface[]> | object;
  public chatUsers: Partial<ChatUserInterface[]>;
  public activeChatToken: string | number;


  public updateChatUsers() {
    // get chatUsers
    this.chatAPI.getChatUsers(Store.getItem('activeChatId')!).then((chatUsersObject) => {
      Store.setItem('chatUsers', chatUsersObject)
    })
      .catch((responseError) => {
        throw new Error(`Can't get chat users. Reason: ${responseError.reason ?? responseError}`)
      })
  }



  public init() {
    // purge view to default state
    Store.clean();
    this.chatAPI = new ChatAPI();
    // get aside chatList items
    this.chatAPI.getChatList().then((chatList) => {
      Store.setItem('chatList', chatList);
      this.chatList = chatList;
    }).catch((responseError) => {
      throw new Error(`Can't get chat List, reason: ${responseError.reason}`)
    })
    // chatList
    this.children.chatList = new ChatList({
      events: {
        click: (e:MouseEvent) => {
          // get chatId from click
          const activeChatId = (e.target! as Element).closest("div[chat_id]")!.getAttribute('chat_id');
          Store.setItem('activeChatId', activeChatId!);

          // toggle active class on proper ChatList item  and rerender that component
          this.children.chatList.setProps({
            activeChatId: Store.getItem('activeChatId'),
          });

          this.updateChatUsers();

          // get chat token
          this.chatAPI.getChatToken(Store.getItem('activeChatId')!).then((activeChatObject) => {
            const token = (activeChatObject as unknown as Record<string, string>)['token']
            this.activeChatToken = token;
            // create new webSocket
            this.webSocket = new WebSocketAPI(Store.getUserId()!, Store.getItem('activeChatId')!, this.activeChatToken!)
            this.webSocket.keepAlive();
            this.webSocket.socket.addEventListener('open', () => {
              this.webSocket.getOldChatMessages();
            })

            // new message recieved
            this.webSocket.socket.addEventListener('message', (event) => {
              const dataObject = JSON.parse(event.data);
              // if we got a new message(!Array)
              if (!Array.isArray(dataObject)) {
                if (dataObject.type == 'message' && dataObject.content) {
                  // got new message
                  this.chatAPI.getChatList().then((chatList) => {
                    this.chatList = chatList;
                    this.children.chatList.setProps({
                      chatList: this.chatList,
                    })
                  }).catch((responseError) => {
                    throw new Error(`Can't get chat List, reason: ${responseError}`)
                  })
                  // refresh messages in the chat
                  this.webSocket.getOldChatMessages();
                }
                if (dataObject.type == 'pong') {
                  console.log('keepAlive response')
                }

              } else if (Array.isArray(dataObject)) {
                // old chat messages recieved
                const oldMessages: ChatMessageInterface[] = dataObject as ChatMessageInterface[];
                // let's update children components
                this.children.chatWindow.setProps({
                  chatMessages: oldMessages.reverse(),
                  chatUsers: Store.getItem('chatUsers'),
                  userId: Store.getUserId(),
                })
              } else {
                throw new Error(`Got new unexpected socket data, event is: ${event.toString()} `)
              }
            });
          })
            .catch((responseError) => {
              throw new Error(responseError)
            })
        }
      },
    });

    // chatAsideProfile
    this.children.chatAsideProfile = new ChatAsideProfile({
      router: this.props.router,
    });
    // create new chat
    this.children.chatAsideProfile.props.events = {
      click: (e: MouseEvent) => {
        const target: HTMLLinkElement = (e.target! as Element).closest('#create_chat')!;
        if (target !== null) {
          e.preventDefault();
          document.querySelector("form#create_chat_form")!.addEventListener('submit', (e) => {
            e.preventDefault();
            const form: HTMLFormElement = (e.target! as Element).closest('form')!;
            const input: HTMLInputElement = form.querySelector('input')!;
            if (form !== null && input !== null && input.value.length) {
              this.chatAPI.createChat(Validation.escapeHtml(input.value)).then(() => {
                const element: HTMLDivElement = document.querySelector(`div#modalwindow`)!;
                if (element !== null) {
                  this.children.chatList.init()
                  element.classList.toggle('state__visible');
                }
              })
                .catch((requestError) => {
                  throw new Error(`Can't create new chat, reason: ${requestError.reason}`)
                })
            }
          })
        }
      }
    }
    // chatAsideSearch
    this.children.chatAsideSearch = new ChatAsideSearch({});
    // chatWindow
    this.children.chatWindow = new ChatWindow({
      chatUsers: Store.getItem('chatUsers'),
    });

    //chatSettings click
    this.children.chatWindow.children.chatSettings.props.events = {
      click: (e: MouseEvent) => {
        const target = (e.target! as Element).closest<HTMLLinkElement>(`.${chatSettingsStyles['b-chat-settings-link']}`);
        if (target !== null) {
          e.preventDefault();
          const element = document.querySelector<HTMLDivElement>(`.${chatSettingsStyles['b-chat-settings-wrapper']}`)
          if (target !== null && element !== null) {
            element.classList.toggle('state__visible');
            // add user to the chat
            const addUserLink = element.querySelector<HTMLLinkElement>('#add_user_link');
            if (addUserLink !== null) {
              addUserLink.addEventListener('click', () => {
                element.classList.toggle('state__visible');
                const addUserChatForm:Element = document.querySelector<HTMLFormElement>('form#add_user')!;
                if (addUserChatForm !== null) {
                  addUserChatForm.addEventListener('submit', (e: SubmitEvent) => {
                    e.preventDefault();
                    if ((addUserChatForm as HTMLFormElement).login.value) {
                      this.chatAPI.findUser({
                        'login': Validation.escapeHtml((addUserChatForm as HTMLFormElement).login.value),
                      }).then((foundUsers) => {
                        if (foundUsers && Array.isArray(foundUsers) && foundUsers.length) {
                          Validation.setFormError((addUserChatForm as HTMLFormElement), chatSettingsStyles, '');
                          const getExistingChatUsersId = (): string[] => {
                            const resultArr = []
                            const chatUsers = Store.getItem('chatUsers');
                            for (const user of chatUsers) {
                              resultArr.push(user.id)
                            }
                            return resultArr
                          }
                          const userFound = foundUsers[0];
                          const users = getExistingChatUsersId();
                          let isUserAlreadyInChat = false;
                          users.forEach((id) => {
                            if (id == userFound.id) {
                              isUserAlreadyInChat = true;
                            }
                          })
                          if (isUserAlreadyInChat) {
                            Validation.setFormError(addUserChatForm as HTMLFormElement, chatSettingsStyles, `User ${(addUserChatForm as HTMLFormElement).login.value} is already in the chat!`);
                          } else {
                            users.push(userFound.id)
                            this.chatAPI.addUser({
                              "users": users,
                              "chatId": Store.getItem('activeChatId'),
                            }).then(() => {
                              this.chatAPI.getChatUsers(Store.getItem('activeChatId')!).then((chatUsersObject) => {
                                Store.setItem('chatUsers', chatUsersObject)
                                this.children.chatWindow.children.chatSettings.setProps({
                                  chatUsers: Store.getItem('chatUsers'),
                                })
                              })
                                .catch((responseError) => {
                                  throw new Error(`Can't get chat users. Reason: ${responseError.reason ?? responseError}`)
                                })
                            }).catch((requestError) => {
                              Validation.setFormError(addUserChatForm as HTMLFormElement, chatSettingsStyles, requestError.reason);
                            }).finally(() => {
                              const closeModalNode = addUserChatForm.parentNode!.parentNode! as HTMLElement
                              closeModalNode.classList.remove('state__visible');
                            })
                          }
                        } else {
                          Validation.setFormError(addUserChatForm as HTMLFormElement, chatSettingsStyles, `No users has been found!`)
                        }
                      }).catch((requestError) => {
                        Validation.setFormError(addUserChatForm as HTMLFormElement, chatSettingsStyles, requestError.reason);
                      })
                    } else {
                      Validation.setFormError(addUserChatForm as HTMLFormElement, chatSettingsStyles, `Username can't be empty!`);
                    }
                  })
                }
              })
            }
            // remove user from chat
            const removeUserLink = element.querySelector<HTMLLinkElement>('#remove_user_link');
            if (removeUserLink !== null) {
              removeUserLink.addEventListener('click', () => {
                element.classList.toggle('state__visible');
                const removeUserChatForm = document.querySelector<HTMLFormElement>('form#remove_user');
                if (removeUserChatForm !== null) {
                  removeUserChatForm.addEventListener('submit', (e: SubmitEvent) => {
                    e.preventDefault();
                    if (removeUserChatForm.login.value) {
                      const isUserAlreadyInChat = (username: string): string | boolean => {
                        let isUserInChat: string | boolean = false;
                        for (const user of Store.getItem('chatUsers')) {
                          if (username == user.login && user.id !== Store.getUserId()) {
                            isUserInChat = user.id
                          }
                        }
                        return isUserInChat;
                      }
                      const userInChat = isUserAlreadyInChat(removeUserChatForm.login.value);
                      if (userInChat) {
                        this.chatAPI.removeUser({
                          "users": [`${userInChat}`],
                          "chatId": Store.getItem('activeChatId'),
                        }).then(() => {
                          this.chatAPI.getChatUsers(Store.getItem('activeChatId')!).then((chatUsersObject) => {
                            Store.setItem('chatUsers', chatUsersObject)
                            this.children.chatWindow.children.chatSettings.setProps({
                              chatUsers: Store.getItem('chatUsers')
                            })
                          })
                            .catch((responseError) => {
                              throw new Error(`Can't get chat users. Reason: ${responseError.reason ?? responseError}`)
                            })
                        }).catch((requestError) => {
                          Validation.setFormError(removeUserChatForm, chatSettingsStyles, requestError.reason);
                        }).finally(() => {
                          const closeModalNode = removeUserChatForm.parentNode!.parentNode! as HTMLElement
                          closeModalNode.classList.remove('state__visible');
                        })
                      } else {
                        Validation.setFormError(removeUserChatForm, chatSettingsStyles, `User ${Validation.escapeHtml(removeUserChatForm.login.value)} is not in the chat! Or can't remove self!`);
                      }
                    } else {
                      Validation.setFormError(removeUserChatForm, chatSettingsStyles, `Username can't be empty!`);
                    }
                  })
                }
              })
            }
            // delete chat
            const deleteChatLink = element.querySelector<HTMLLinkElement>('#delete_chat_link');
            if (deleteChatLink !== null) {
              deleteChatLink.addEventListener('click', () => {
                element.classList.toggle('state__visible');
                const deleteChatForm = document.querySelector<HTMLFormElement>('form#delete_chat');
                if (deleteChatForm !== null) {
                  const closeModal = deleteChatForm.querySelector<HTMLButtonElement>("#close_modal")!
                  closeModal.addEventListener('click', (e: MouseEvent) => {
                    e.preventDefault();
                    const closeModalNode = deleteChatForm.parentNode!.parentNode! as HTMLElement
                    closeModalNode.click();
                  })
                  deleteChatForm.addEventListener('submit', (e: SubmitEvent) => {
                    e.preventDefault();
                    this.chatAPI.deleteChat(Store.getItem('activeChatId')).then(() => {
                      Store.clean();
                      this.children.chatList.init();
                      this.children.chatWindow.setProps({
                        chatUsers: null,
                      });
                      const closeModalNode = deleteChatForm.parentNode!.parentNode! as HTMLElement
                      closeModalNode.click();
                    }).catch((responseError) => {
                      console.log(`Can't delete chat. Reason: ${responseError.reason ?? responseError}`)
                    }).finally(() => {
                      const closeModalNode = deleteChatForm.parentNode!.parentNode! as HTMLElement
                      closeModalNode.classList.remove('state__visible');
                    })
                  })
                }
              })
            }
          }
        }
        const chatUserWrapper = (e.target! as Element).closest<HTMLLIElement>(`.${chatSettingsStyles['b-chat-users-wrapper']}`);
        if(chatUserWrapper){
          e.preventDefault();
          const chatUserLinks = chatUserWrapper.querySelectorAll(`a.${chatSettingsStyles['b-link']}`)
          if (chatUserLinks.length){
            chatUserLinks.forEach((link:HTMLLinkElement) => {
              if (link !== null){
                this.props.router.go(`/settings` as RouteI['path'])
              }
            })
          }
        }
      }
    }

    // chatReply submit event handler
    this.children.chatWindow.children.chatReply.props.events = {
      submit: (e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formAllFields = form.querySelectorAll<HTMLInputElement>('input');
        const message = form.querySelector<HTMLInputElement>('input[name="message"]')!;
        if (formAllFields.length) {
          formAllFields.forEach((element: HTMLInputElement) => {
            Validation.validateField(element, chatReplyStyles)
          });
        }
        const formInvalidFields = form.querySelectorAll<HTMLInputElement>('input[isInvalid=true]');
        if (formInvalidFields.length) {
          form.classList.add(`${chatReplyStyles['state__invalid']}`);
        } else {
          form.classList.remove(`${chatReplyStyles['state__invalid']}`);
          this.webSocket.socket.send(JSON.stringify({
            content: Validation.escapeHtml(form.message.value),
            type: 'message',
          }));
          message.value = '';
        }
      },
      click: (e: MouseEvent) => {
        const target = (e.target! as Element).closest(`.${chatReplyStyles['b-attach-file-link']}`);
        const element = document.querySelector<HTMLElement>(`.${chatReplyStyles['b-chat-reply-attachment-wrapper']}`);
        if (target !== null && element) {
          element.classList.toggle('state__visible');
        }
      },
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
