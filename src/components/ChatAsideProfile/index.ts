import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatAsideProfileProps {
  events?: never; 
}

export class ChatAsideProfile extends Block<ChatAsideProfileProps> {
  constructor(props: ChatAsideProfileProps) {
    super({ ...props });
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
