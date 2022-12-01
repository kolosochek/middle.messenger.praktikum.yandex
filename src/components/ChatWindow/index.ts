import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';
import { ChatSettings } from '../ChatSettings';
import { ChatReply } from '../ChatReply';

interface ChatWindowProps {
  activeChat?: object;
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({ ...props });
  }

  init(){
    // chatSettings
    this.children.chatSettings = new ChatSettings({
      activeChat: this.props.activeChat
    });

    // chatReply
    this.children.chatReply = new ChatReply({});
  }

  protected componentDidUpdate(): boolean {
    this.children.chatSettings.setProps(this.props);
    return true
  }

  render() {
    
    return this.compile(template, { ...this.props, styles });
  }
}
