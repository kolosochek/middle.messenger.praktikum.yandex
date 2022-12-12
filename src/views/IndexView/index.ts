import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import { Store } from '../../model/Store'
import { ChatAsideProfile } from '../../components/ChatAsideProfile';
import { ChatAsideSearch } from '../../components/ChatAsideSearch';
import { ChatList } from '../../components/ChatList';
import { ChatWindow } from '../../components/ChatWindow';
import { Validation } from '../../utils/Validation';
import { ChatAPI } from '../../utils/ChatAPI'
import { WebSocketAPI } from '../../utils/WebSocketAPI'
import { ChatListItemInterface, ChatMessageInterface, ChatUserInterface } from '../../model/Store';
import template from './template';
import styles from './style.module.less';
import chatReplyStyles from '../../components/ChatReply/style.module.less'
import chatSettingsStyles from '../../components/ChatSettings/style.module.less'

interface IndexViewProps {
  router?: Router;
}

export class IndexView extends Block<IndexViewProps> {
  public chatAPI: ChatAPI;
  public webSocket: WebSocketAPI;
  public chatList: ChatListItemInterface[];
  public chatUsers: ChatUserInterface[]
  public activeChatToken: string;
  public userId: string | number;


  constructor() {
    super({});
    Store.clean();
  }

  public init() {
    this.chatAPI = new ChatAPI();
    // get current user ID
    this.userId = Store.getUserId();
    // get aside chatList items
    this.chatAPI.getChatList().then((chatList) => {
      this.chatList = chatList;
    }).catch((responseError) => {
      throw new Error(`Can't get chat List, reason: ${responseError.reason}`)
    })
    // chatList
    this.children.chatList = new ChatList({
      events: {
        click: (e) => {
          // get chatId from click
          const activeChatId = e.target!.closest<HTMLDivElement>("div[chat_id]").getAttribute('chat_id');
          Store.setItem('activeChatId', activeChatId);

          // toggle active class on proper ChatList item  and rerender that component
          this.children.chatList.setProps({
            activeChatId: Store.getItem('activeChatId'),
          });

          // get chatUsers
          this.chatAPI.getChatUsers(Store.getItem('activeChatId')!).then((chatUsersObject) => {
            Store.setItem('chatUsers', chatUsersObject)
          })
          .catch((responseError) => {
            throw new Error(`Can't get chat users. Reason: ${responseError}`)
          })

          // get chat token
          this.chatAPI.getChatToken(Store.getItem('activeChatId')! as number).then((activeChatObject) => {
            this.activeChatToken = activeChatObject['token'];
            // create new webSocket
            this.webSocket = new WebSocketAPI(this.userId, Store.getItem('activeChatId')!, this.activeChatToken)
            //this.webSocket.keepAlive();
            this.webSocket.socket.addEventListener('open', () => {
              this.webSocket.getOldChatMessages();
            })

            // new message recieved
            this.webSocket.socket.addEventListener('message', (event) => {
              const dataObject = JSON.parse(event.data);
              //
              console.log(dataObject);
              //
              // if we got a new message(!Array)
              if (!Array.isArray(dataObject)) {
                if(dataObject.type == 'message'){
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
                
              } else if(Array.isArray(dataObject)) {
                // old chat messages recieved
                const oldMessages:ChatMessageInterface[] = dataObject as ChatMessageInterface[];
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
    this.children.chatAsideProfile = new ChatAsideProfile({});
    // create new chat
    this.children.chatAsideProfile.props.events = {
      click: (e:MouseEvent) => {
        const target:HTMLLinkElement = e.target!.closest('#create_chat');
        if (target !== null){
          e.preventDefault();
  
          document.querySelector("form#create_chat_form")!.addEventListener('submit', (e) => {
            e.preventDefault();
            const form:HTMLFormElement = e.target!.closest('form');
            const input:HTMLInputElement = form.querySelector('input')!;
            if (form !== null && input !== null && input.value.length){
              this.chatAPI.createChat(input.value).then(() => {
                const element:HTMLDivElement = document.querySelector(`div#modalwindow`)!;
                if (element !== null){
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
      click: (e:MouseEvent) => {
        const target = e.target!.closest<HTMLLinkElement>(`.${chatSettingsStyles['b-chat-settings-link']}`);
        if (target !== null) {
          e.preventDefault();
          const element = document.querySelector<HTMLDivElement>(`.${chatSettingsStyles['b-chat-settings-wrapper']}`)
          if (target !== null && element){
            element.classList.toggle('state__visible');

            const deleteChatLink = element.querySelector<HTMLLinkElement>('#delete_chat_link');
            if (deleteChatLink !== null){
              deleteChatLink.addEventListener('click', (e:MouseEvent) => {
                // delete chat
                const deleteChatForm:HTMLFormElement|null = document.querySelector('form#delete_chat');
                if (deleteChatForm !== null) {
                  deleteChatForm.addEventListener('submit', (e:SubmitEvent) => {
                    e.preventDefault();
                    this.chatAPI.deleteChat(Store.getItem('activeChatId')).then(() => {
                      Store.clean();
                      this.children.chatList.init();
                      this.children.chatWindow.setProps({
                        chatUsers: null,
                      });
                      const closeModal = e.target.querySelector<HTMLButtonElement>("#close_modal")!
                      element.classList.toggle('state__visible');
                      closeModal.click();
                      //e.target.closest('#close_modal').trigger('click');
                    }).catch((requestError) => {
                      throw new Error(`Can't delete chat by id ${Store.getItem('activeChatId')}, reason: ${requestError}`)
                    })
                  })
                }
              })
            }
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
          // formData
          const formData = Object.fromEntries(new FormData(form));
          this.webSocket.socket.send(JSON.stringify({
            content: `${formData.message}`,
            type: 'message',
          }));
          message.value = '';
        }
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
