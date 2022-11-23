import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';
import { ChatSettings } from '../ChatSettings';

interface ChatWindowProps {
  activeChat?: object;
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({ ...props });
  }

  init() {
    // chatSettings
    this.children.chatSettings = new ChatSettings({});
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
