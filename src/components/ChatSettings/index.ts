import Block from '../../utils/Block';
import { ShowModal } from '../../utils/ShowModal';
import { ChatUserInterface } from '../../model/Store';
import template from './template';
import styles from './style.module.less';

interface ChatSettingsProps {
  userId: string;
  activeChat?: Record<string, string>;
  chatUsers?: ChatUserInterface[];
  isChatAdmin?: boolean;
  events?: {
    click: (e:MouseEvent) => void;
  }
}

export class ChatSettings extends Block<ChatSettingsProps> {
  init() {
    ShowModal.bindToWindow();
  }
  
  render() {
    if (Array.isArray(this.props.chatUsers)) {
      for (const user of this.props.chatUsers) {
        if(user.id.toString() == this.props.userId && user.role == 'admin') {
          this.props.isChatAdmin = true;
        }
      }
    }
    return this.compile(template, { ...this.props, styles });
  }
}
