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
    this.props.events = {
      click: (e) => {
        const target = e.target!.closest<HTMLLinkElement>(`.${styles['b-chat-settings-link']}`);
        if (target !== null) {
          e.preventDefault();
          const element = document.querySelector(`.${styles['b-chat-settings-wrapper']}`)
          if (target !== null && element){
            element.classList.toggle('state__visible');
          }  
        }
      }
    }
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
