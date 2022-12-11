import Block from '../../utils/Block';
import { ChatAPI } from '../../utils/ChatAPI'
import { ChatListItemInterface } from '../../model/Store';
import template from './template';
import styles from './style.module.less';


interface ChatListProps {
  chatList?: ChatListItemInterface[];
  activeChatId?: string;
  activeChat?: ChatListItemInterface;

  events?: {
    click: (e: MouseEvent) => void;
  };
}

export class ChatList extends Block<ChatListProps> {
  public chatAPI:ChatAPI;
  public chatList: ChatListProps['chatList'];

  constructor(props: ChatListProps) {
    super({ ...props });
  }

  init(){
    this.chatAPI = new ChatAPI();
    this.chatAPI.getChatList()
    .then((chatList) => {
      this.chatList = chatList as ChatListItemInterface[];
      this.setProps({
        chatList: this.chatList,
      })
      //
    }).catch((responseError) => {
      throw new Error(`Can't get chat List, reason: ${responseError}`)
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
