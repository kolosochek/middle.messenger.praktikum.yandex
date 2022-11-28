import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatSettingsProps {
  activeChat?: object;
  events?: {
    click: (e:any) => void;
  }
}

export class ChatSettings extends Block<ChatSettingsProps> {
  constructor(props: ChatSettingsProps) {
    super({ ...props });
  }

  protected init(): void {
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
