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
        const target = e.target.closest('.b-chat-settings-link');
        if (target !== null){
          document.querySelector('.b-chat-settings-wrapper').classList.toggle('state__visible');
        }
      }
    }
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
