import Block from '../../utils/Block';
import { ChatAsideProfile } from '../../components/ChatAsideProfile';
import { ChatAsideSearch } from '../../components/ChatAsideSearch';
import { ChatConversationList } from '../../components/ChatConversationList';
import { ChatWindow } from '../../components/ChatWindow';
import { APIData } from '../../model/data';
import template from './template';
import styles from './style.module.less';


interface IndexViewProps {
  conversationList?: object[];
  activeChatId?: string | boolean;
  activeChat?: object;
}


export class IndexView extends Block<IndexViewProps> {
  public activeChatId: string | null;
  public activeChat: object;
  public conversationList: object[];

  public static setActiveChatId = (id: string | number): void => {
    this.activeChatId = window.localStorage.setItem('activeChatId', id.toString());
  }

  public static getActiveChatId = (): string => {
    return this.activeChatId ? this.activeChatId : window.localStorage.getItem('activeChatId');
  }

  public static getActiveChat = (): object | undefined => {
    const activeChatId = this.getActiveChatId();
    for (const conversation of APIData.getData()) {
      if (conversation.chat_id == activeChatId) {
        return conversation;
      } 
    }
  }



  init() {
    // chatAsideProfile
    this.children.chatAsideProfile = new ChatAsideProfile({});    

    // chatAsideSearch
    this.children.chatAsideSearch = new ChatAsideSearch({});

    // chatConversationList
    this.children.chatConversationList = new ChatConversationList({
      activeChatId: IndexView.getActiveChatId(),
      conversationList: APIData.getData(),
      events: {
        click: (e) => {
          // get chatId from click
          const activeChatId = e.target.closest("div[chat_id]").getAttribute('chat_id');
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
    return this.compile(template, { ...this.props, styles });
  }

}
