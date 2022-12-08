import Block from '../../utils/Block';
import { ChatAsideProfile } from '../../components/ChatAsideProfile';
import { ChatAsideSearch } from '../../components/ChatAsideSearch';
import { ChatList } from '../../components/ChatList';
import { ChatWindow } from '../../components/ChatWindow';
import { Validation } from '../../utils/Validation';
import { AuthAPI } from '../../utils/AuthAPI';
import { ChatAPI, ChatListInterface } from '../../utils/ChatAPI'
import { WebSocketAPI } from '../../utils/WebSocketAPI'
import template from './template';
import styles from './style.module.less';
import chatReplyStyles from '../../components/ChatReply/style.module.less'

interface IndexViewProps {
  events?: unknown;
}

export class IndexView extends Block<IndexViewProps> {
  public chatAPI = new ChatAPI();
  public chatList: ChatListInterface[];
  public activeChatToken: string;
  public webSocket: WebSocketAPI;
  public userId: string | number;
  public authAPI: AuthAPI;
  public activeChatId: string | null;

  public static setActiveChatId = (id: string | number): void => {
    this.activeChatId = window.localStorage.setItem('activeChatId', id.toString());
  }

  public static getActiveChatId = (): string => {
    return this.activeChatId ? this.activeChatId : window.localStorage.getItem('activeChatId');
  }

  public static setChatUsers(chatUsersObject: object) {
    window.localStorage.setItem('activeChatId', JSON.stringify(chatUsersObject));
  }



  init() {
    // get current user ID
    this.authAPI = new AuthAPI();
    this.userId = this.authAPI.getUserId();
    this.chatAPI = new ChatAPI();
    // get aside chatList items
    this.chatAPI.getChatList().then((chatList) => {
      this.chatList = chatList as ChatListInterface[];
    }).catch((responseError) => {
      throw new Error(`Can't get chat List, reason: ${responseError}`)
    })
    // chatList
    this.children.chatList = new ChatList({
      activeChatId: IndexView.getActiveChatId(),
      events: {
        click: (e) => {
          // get chatId from click
          const activeChatId = e.target.closest<HTMLDivElement>("div[chat_id]").getAttribute('chat_id');
          this.activeChatId = activeChatId;
          IndexView.setActiveChatId(activeChatId);

          // toggle active class on proper ChatList item  and rerender that component
          this.children.chatList.setProps({
            activeChatId: activeChatId,
          });

          // get chatUsers
          this.chatAPI.getChatUsers(this.activeChatId!).then((chatUsersObject) => {
            IndexView.setChatUsers(chatUsersObject)
          })
            .catch((responseError) => {
              throw new Error(`Can't get chat users. Reason: ${responseError}`)
            })

          // get chat token
          this.chatAPI.getChatToken(activeChatId as number).then((activeChatObject) => {
            this.activeChatToken = activeChatObject['token'];
            // create new webSocket
            this.webSocket = new WebSocketAPI(this.userId, this.activeChatId!, this.activeChatToken)
            //this.webSocket.keepAlive();
            this.webSocket.socket.addEventListener('open', () => {
              this.webSocket.getOldChatMessages().then((oldMessages) => {
                // set children props
                this.children.chatWindow.setProps({
                  activeChat: oldMessages.reverse(),
                  userId: this.authAPI.getUserId(),
                })
                //
              }).catch(() => {
                throw new Error(`Can't get old chat messages from WebSocket`)
              })
            })
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
    this.children.chatWindow = new ChatWindow({});
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
        // new message recieved
        this.webSocket.socket.addEventListener('message', (event) => {
          // if we got a new message(!Array)
          if (!Array.isArray(JSON.parse(event.data))) {
            // get new aside chat list
            this.chatAPI.getChatList().then((chatList) => {
              this.chatList = chatList as ChatListInterface[];

              this.children.chatList.setProps({
                chatList: this.chatList,
              })

            }).catch((responseError) => {
              throw new Error(`Can't get chat List, reason: ${responseError}`)
            })
            // refresh messages in the chat
            this.webSocket.getOldChatMessages().then((oldMessages) => {

              // and set proper props for nested components
              this.children.chatWindow.setProps({
                activeChat: oldMessages.reverse(),
                userId: this.authAPI.getUserId(),
              })

            }).catch(() => {
              throw new Error(`Can't get old chat messages from WebSocket`)
            })
          }
        });
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
