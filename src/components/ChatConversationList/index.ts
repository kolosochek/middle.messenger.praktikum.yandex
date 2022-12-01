import Block from '../../utils/Block';
import { ConversationType } from '../../model/data';
import template from './template';
import styles from './style.module.less';


interface ChatConversationListProps {
  conversationList?: ConversationType[];
  activeChatId?: string;
  activeChat?: ConversationType;

  events?: {
    click: (e: MouseEvent) => void;
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
