import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatAsideSearchProps {
  events?: Record<string, never> 
}

export class ChatAsideSearch extends Block<ChatAsideSearchProps> {
  constructor(props: ChatAsideSearchProps) {
    super({ ...props });
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
