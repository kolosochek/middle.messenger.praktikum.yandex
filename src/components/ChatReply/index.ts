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
      click: (e) => {
        const target = e.target.closest(`.${styles['b-attach-file-link']}`);
        const element = document.querySelector(`.${styles['b-chat-reply-attachment-wrapper']}`);
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
      nowrap: 'true',
      errorMessage: "Can't be empty",

      events: {
        focus: (e) => {
          Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
            ? Validation.removeFieldIsValid(e.target, e.target.parentNode, styles)
            : Validation.setFieldIsValid(e.target, e.target.parentNode, styles)
        },
        blur: (e) => {
          Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
            ? Validation.removeFieldIsValid(e.target, e.target.parentNode, styles)
            : Validation.setFieldIsValid(e.target, e.target.parentNode, styles)
        },
      }
    });
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
