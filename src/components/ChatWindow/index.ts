import Block from '../../utils/Block';
import { ChatSettings } from '../ChatSettings';
import { ChatReply } from '../ChatReply';
import { Validation } from '../../utils/Validation';
import { ConversationType } from '../../model/data';
import template from './template';
import styles from './style.module.less';

interface ChatWindowProps {
  activeChatId?: string|number|null;
  activeChat?: ConversationType;
  userId?: number | string,
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({ ...props });
  }

  public static getChatUsers(): object {
    return window.localStorage.getItem('chatUsers') ? JSON.parse(window.localStorage.getItem('chatUsers')!) : {};
  }

  init() {
    // chatSettings
    this.children.chatSettings = new ChatSettings({
      chatUsers: ChatWindow.getChatUsers(),
      activeChat: this.props.activeChat
    });

    // chatReply
    this.children.chatReply = new ChatReply({});
  }

  public componentDidUpdate(): boolean {
    this.children.chatSettings.setProps(this.props);
    return true;
  }

  render() {
    //
    console.log(this)
    //
    return this.compile(template, { ...this.props, styles });
  }
}
