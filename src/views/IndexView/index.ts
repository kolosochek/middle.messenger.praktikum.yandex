import Block from '../../utils/Block';
import { ChatAsideProfile } from '../../components/ChatAsideProfile';
import { ChatAsideSearch } from '../../components/ChatAsideSearch';
import { ChatConversationList } from '../../components/ChatConversationList';
import { ChatWindow } from '../../components/ChatWindow';
import template from './template';
import styles from './style.module.less';
import data from '../../model/data.js'


interface IndexViewProps {
  conversationList?: object[];
  activeChatId?: string | boolean;
  activeChat?: object;
}


export class IndexView extends Block<IndexViewProps> {
  constructor(context: any) {
    super(context);
  }

  public activeChatId: string | null;
  public activeChat: object;
  public conversationList: object[];

  public static setActiveChatId = (id: string | number): void => {
    this.activeChatId = window.localStorage.setItem('activeChatId', id.toString());
  }

  public static getActiveChatId = (): string | number => {
    return this.activeChatId ? this.activeChatId : window.localStorage.getItem('activeChatId');
  }

  public static getActiveChat = (): object | undefined => {
    const activeChatId = this.getActiveChatId();
    for (const conversation of IndexView.getData()) {
      if (conversation.chat_id == activeChatId) {
        return conversation;
      } 
    }
  }

  public static getData = (): object[] => {
    return data;
  }


  init() {
    // chatAsideProfile
    this.children.chatAsideProfile = new ChatAsideProfile({});    

    // chatAsideSearch
    this.children.chatAsideSearch = new ChatAsideSearch({});

    // chatConversationList
    this.children.chatConversationList = new ChatConversationList({
      activeChatId: IndexView.getActiveChatId(),
      conversationList: IndexView.getData(),
      events: {
        click: (e) => {
          // get chatId from click
          const activeChatId = e.target.closest(".b-conversation").getAttribute('chat_id');
          IndexView.setActiveChatId(activeChatId);

          this.children.chatConversationList.setProps({
            activeChatId: activeChatId,
          });

          this.children.chatWindow.setProps({
            activeChat: IndexView.getActiveChat(),
          });
        }
      },
    });


    // chatWindow
    this.children.chatWindow = new ChatWindow({
      activeChat: IndexView.getActiveChat(),
    });  
  }

  render() {
    return this.compile(template, { ...this.props, ...this.children, styles });
  }

}
