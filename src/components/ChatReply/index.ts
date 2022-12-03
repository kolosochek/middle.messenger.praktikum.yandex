import Block from '../../utils/Block';
import { Validation } from '../../utils/Validation';
import { InputComponent } from '../InputComponent';
import template from './template';
import styles from './style.module.less';

interface ChatReplyProps {
  events?: {
    click?: (e:MouseEvent) => void;
    submit?: (e:SubmitEvent) => void;
  }
}

export class ChatReply extends Block<ChatReplyProps> {
  constructor(props: ChatReplyProps) {
    super({ ...props });
    this.props.events = Object.assign({
      click: (e:MouseEvent) => {
        const target = e.target.closest(`.${styles['b-attach-file-link']}`);
        const element = document.querySelector<HTMLElement>(`.${styles['b-chat-reply-attachment-wrapper']}`);
        if (target !== null && element){
          element.classList.toggle('state__visible');
        }
      }, 
  }, this.props.events);
  }

  init() {
    this.children.messageInputComponent = new InputComponent({
      name: 'message',
      type: 'text',
      errorMessage: "Can't be empty",

      events: {
        focus: (e) => {
          Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
            ? Validation.removeFieldIsInvalid(e.target, styles)
            : Validation.setFieldIsInvalid(e.target, styles)
        },
        blur: (e) => {
          Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
            ? Validation.removeFieldIsInvalid(e.target, styles)
            : Validation.setFieldIsInvalid(e.target, styles)
        },
      }
    });
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
