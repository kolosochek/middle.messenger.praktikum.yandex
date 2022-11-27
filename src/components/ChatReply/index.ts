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
        const target = e.target.closest('.b-attach-file-link');
        if (target !== null){
          document.querySelector('.b-chat-reply-attachment-wrapper').classList.toggle('state__visible');
        }
      }
    }
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
