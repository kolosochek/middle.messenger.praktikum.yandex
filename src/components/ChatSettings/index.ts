import Block from '../../utils/Block';
import { ShowModal } from '../../utils/ShowModal';
import { ChatUserInterface } from '../../model/Store';
import template from './template';
import styles from './style.module.less';

interface ChatSettingsProps {
  activeChat?: Record<string, string>;
  chatUsers?: ChatUserInterface[];
  userId: string;
  events?: {
    click: (e:MouseEvent) => void;
  }
}

export class ChatSettings extends Block<ChatSettingsProps> {
  constructor(props: ChatSettingsProps) {
    super({ ...props });
  }

  init() {
    ShowModal.bindToWindow();
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
