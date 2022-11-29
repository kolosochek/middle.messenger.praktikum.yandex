import Block from '../../utils/Block';
import { Validation } from '../../utils/Validation';
import { InputComponent } from '../InputComponent';
import template from './template';
import styles from './style.module.less';

interface ChatReplyProps {
  events?: {
    click: (e:MouseEvent) => void;
    submit: (e:SubmitEvent) => void;
  }
}

export class ChatReply extends Block<ChatReplyProps> {
  constructor(props: ChatReplyProps) {
    super({ ...props });
  }

  private _removeFieldIsValid(node: HTMLElement | null): void {
    if (node !== null) {
      node.removeAttribute('isInvalid');
      node.parentNode?.classList.remove(`${styles['state__invalid']}`);
    }
  }
  private _setFieldIsValid(node: HTMLElement | null): void {
    if (node !== null) {
      node.setAttribute('isInvalid', 'true');
      node.parentNode?.classList.add(`${styles['state__invalid']}`);
    }
  }

  init() {
    this.props.events = {
      submit: (e) => {
        e.preventDefault();
        const form = e.target;
        const formAllFields = form.querySelectorAll('input');
        if (formAllFields.length) {
          formAllFields.forEach((element) => {
            Validation.validateFieldByType(element?.getAttribute('name'), element.value)
              ? this._removeFieldIsValid(element)
              : this._setFieldIsValid(element)
          });
        }
        const formInvalidFields = form.querySelectorAll('input[isInvalid=true]');
        if (formInvalidFields.length) {
          form.classList.add(`${styles['state__invalid']}`);
        } else {
          form.classList.remove(`${styles['state__invalid']}`);
          // TODO: remove me
          // sprint_2_task
          console.log(Object.fromEntries(new FormData(form)));
          //
        }
      },
      click: (e) => {
        const target = e.target.closest(`.${styles['b-attach-file-link']}`);
        const element = document.querySelector(`.${styles['b-chat-reply-attachment-wrapper']}`);
        if (target !== null && element){
          element.classList.toggle('state__visible');
        }
      }
    }

    this.children.messageInputComponent = new InputComponent({
      name: 'message',
      type: 'text',
      nowrap: 'true',
      errorMessage: "Can't be empty",

      events: {
        focus: (e) => {
          Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
            ? this._removeFieldIsValid(e.target)
            : this._setFieldIsValid(e.target)
        },
        blur: (e) => {
          Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
            ? this._removeFieldIsValid(e.target)
            : this._setFieldIsValid(e.target)
        },
      }
    });
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
