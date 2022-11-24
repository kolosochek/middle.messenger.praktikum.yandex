import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';
import { ChatSettings } from '../ChatSettings';

interface ChatWindowProps {
  activeChat?: object;
  children?: any;
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({ ...props });
  }

  init(){
    this.children.chatSettings = new ChatSettings({});
  }


  render() {
    // debug
    //console.log(this.compile(template, { ...this.props, styles }))
    return this.compile(template, { ...this.props, styles });
  }
}
