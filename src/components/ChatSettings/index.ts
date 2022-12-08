import Block from '../../utils/Block';
import { ShowModal } from '../../utils/ShowModal';
import template from './template';
import styles from './style.module.less';

interface ChatSettingsProps {
  activeChat?: object;
  chatUsers?: object;
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
        e.preventDefault();
        const target = e.target.closest(`.${styles['b-chat-settings-link']}`);
        const element = document.querySelector(`.${styles['b-chat-settings-wrapper']}`)
        if (target !== null && element){
          element.classList.toggle('state__visible');
        }
      }
    }
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
