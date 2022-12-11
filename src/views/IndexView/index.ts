import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import { ChatAsideProfile } from '../../components/ChatAsideProfile';
import { ChatAsideSearch } from '../../components/ChatAsideSearch';
import { ChatList } from '../../components/ChatList';
import { ChatWindow } from '../../components/ChatWindow';
import { Validation } from '../../utils/Validation';
import { ChatAPI } from '../../utils/ChatAPI'
import { WebSocketAPI } from '../../utils/WebSocketAPI'
import { Store } from '../../model/Store'
import { ChatListItemInterface, ChatMessageInterface, ChatUserInterface } from '../../model/Store';
import template from './template';
import styles from './style.module.less';
import chatReplyStyles from '../../components/ChatReply/style.module.less'

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
  public activeChatId: string | null;

  public static setActiveChatId = (id: string | number): void => {
    this.activeChatId = `${id}`;
    window.localStorage.setItem('activeChatId', id.toString());
  }

  public static getActiveChatId = (): string => {
    return this.activeChatId ? this.activeChatId : window.localStorage.getItem('activeChatId');
  }

  public static getChatUsers = (): ChatUserInterface[] => {
    return this.chatUsers ? this.chatUsers : JSON.parse(window.localStorage.getItem('chatUsers')!);
  }

  public static setChatUsers(chatUsersObject: ChatUserInterface[]) {
    window.localStorage.setItem('chatUsers', JSON.stringify(chatUsersObject));
  }

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
      throw new Error(`Can't get chat List, reason: ${responseError}`)
    })
    // chatList
    this.children.chatList = new ChatList({
      events: {
        click: (e) => {
          // get chatId from click
          const activeChatId = e.target!.closest<HTMLDivElement>("div[chat_id]").getAttribute('chat_id');
          IndexView.setActiveChatId(activeChatId);

          // toggle active class on proper ChatList item  and rerender that component
          this.children.chatList.setProps({
            activeChatId: IndexView.getActiveChatId(),
          });

          // get chatUsers
          this.chatAPI.getChatUsers(IndexView.getActiveChatId()!).then((chatUsersObject) => {
            IndexView.setChatUsers(chatUsersObject)
          })
          .catch((responseError) => {
            throw new Error(`Can't get chat users. Reason: ${responseError}`)
          })

          // get chat token
          this.chatAPI.getChatToken(IndexView.getActiveChatId()! as number).then((activeChatObject) => {
            this.activeChatToken = activeChatObject['token'];
            // create new webSocket
            this.webSocket = new WebSocketAPI(this.userId, IndexView.getActiveChatId()!, this.activeChatToken)
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
                  chatUsers: IndexView.getChatUsers(),
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
    // chatAsideSearch
    this.children.chatAsideSearch = new ChatAsideSearch({});
    // chatWindow
    this.children.chatWindow = new ChatWindow({
      chatUsers: IndexView.getChatUsers(),
    });

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
