import Block from '../../utils/Block';
import { ChatAPI, ChatListInterface } from '../../utils/ChatAPI'
import { ConversationType } from '../../model/data';
import template from './template';
import styles from './style.module.less';


interface ChatListProps {
  chatList?: ChatListInterface[];
  activeChatId?: string;
  activeChat?: ConversationType;

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
      this.chatList = chatList as ChatListInterface[];
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
