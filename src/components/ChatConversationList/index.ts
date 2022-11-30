import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatConversationListProps {
  conversationList?: object[];
  activeChatId?: string | boolean;
  activeChat?: object;

  events?: {
    click: (e:MouseEvent) => void;
  };
}

export class ChatConversationList extends Block<ChatConversationListProps> {
  constructor(props: ChatConversationListProps) {
    super({ ...props });
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
