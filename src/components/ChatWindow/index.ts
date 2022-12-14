import Block from '../../utils/Block';
import { ChatSettings } from '../ChatSettings';
import { ChatReply } from '../ChatReply';
import { ChatMessageInterface, ChatUserInterface } from '../../model/Store';
import { Store } from '../../model/Store';
import template from './template';
import * as styles from './style.module.less';

interface ChatWindowProps {
  chatUsers?: string|number|null;
  chatMessages?: ChatMessageInterface[];
  userId?: number | string,
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({ ...props });
  }

  init() {
    // chatSettings
    this.children.chatSettings = new ChatSettings({
      chatUsers: Store.getItem('chatUsers') as ChatUserInterface[],
      userId: Store.getUserId(),
    });

    // chatReply
    this.children.chatReply = new ChatReply({});
  }

  public componentDidUpdate(): boolean {
    this.children.chatSettings.setProps(this.props);
    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
