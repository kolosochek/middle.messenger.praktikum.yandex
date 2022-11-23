import Block from '../../utils/Block';
import { ChatAsideProfile } from '../../components/ChatAsideProfile';
import { ChatAsideSearch } from '../../components/ChatAsideSearch';
import { ChatConversationList } from '../../components/ChatConversationList';
import { ChatWindow } from '../../components/ChatWindow';
import { ChatSettings } from '../../components/ChatSettings';
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
    window.localStorage.setItem('activeChatId', id.toString());
  }

  public static getActiveChatId = (): string => {
    this.activeChatId = window.localStorage.getItem('activeChatId');
    return this.activeChatId;
  }

  public static getActiveChat = (): object | undefined => {
    // let's update activeChatId to make a proper ID of chat that we wanna get
    this.getActiveChatId();
    for (const conversation of data) {
      if (conversation.chat_id == this.activeChatId) {
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
          this.setProps({
            activeChatId: IndexView.getActiveChatId(),
            activeChat: IndexView.getActiveChat(),
            conversationList: IndexView.getData(),
          });
        }
      },
    });

    // chatWindow
    this.children.chatWindow = new ChatWindow({
      activeChat: IndexView.getActiveChat(),
      props: {
        children: new ChatSettings({})
      } 
    });
    
    
  }



  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
