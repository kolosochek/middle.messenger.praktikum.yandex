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

  init(){
    this.children.chatSettings = new ChatSettings({
      activeChat: this.props.activeChat
    });
  }

  protected componentDidUpdate(oldProps: ChatWindowProps, newProps: ChatWindowProps): boolean {
    this.children.chatSettings.setProps(this.props);
    return true
  }

  render() {
    
    return this.compile(template, { ...this.props, styles });
  }
}
