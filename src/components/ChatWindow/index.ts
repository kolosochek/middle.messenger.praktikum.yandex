import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatWindowProps {
  activeChat?: object;
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({ ...props });
  }
  
  render() {
    // debug
    //console.log(this.compile(template, { ...this.props, styles }))
    //
    return this.compile(template, { ...this.props, styles });
  }
}
