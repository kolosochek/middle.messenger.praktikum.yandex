import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatReplyProps {
  events?: {
    click: (e:any) => void;
  }
}

export class ChatReply extends Block<ChatReplyProps> {
  constructor(props: ChatReplyProps) {
    super({ ...props });
  }

  protected init(): void {
    this.props.events = {
      click: (e) => {
        e.preventDefault();
        // debug
        console.log(e.target);
        //
        const target = e.target.closest(`.${styles['b-attach-file-link']}`);
        const element = document.querySelector(`.${styles['b-chat-reply-attachment-wrapper']}`);
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
