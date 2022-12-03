import Block from '../../utils/Block';
import { ChatSettings } from '../ChatSettings';
import { ChatReply } from '../ChatReply';
import { Validation } from '../../utils/Validation';
import template from './template';
import styles from './style.module.less';
import { ConversationType } from '../../model/data';

interface ChatWindowProps {
  activeChat?: ConversationType;
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({ ...props });
  }

  init() {
    // chatSettings
    this.children.chatSettings = new ChatSettings({
      activeChat: this.props.activeChat
    });

    // chatReply
    this.children.chatReply = new ChatReply({
      events: {
        submit: (e) => {
          e.preventDefault();
          const form = e.target;
          const formAllFields = form.querySelectorAll('input');
          const message = form.querySelector('input[name="message"]');
          if (formAllFields.length) {
            formAllFields.forEach((element) => {
              Validation.validateFieldByType(element.getAttribute('name'), element.value)
                ? Validation.removeFieldIsValid(element, element.parentNode, styles)
                : Validation.setFieldIsValid(element, element.parentNode, styles)
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
            const date = new Date();
            const addZero = (i:string|number):string|number => {
              if (i < 10) {i = "0" + i}
              return i;
            }
            const newMessage = {
              'message': {
                'author': 'Me',
                'time': `${addZero(date.getHours())}:${addZero(date.getMinutes())}`,
                'date': `${addZero(date.getDay())}.${addZero(date.getMonth())}.${addZero(date.getFullYear())}`,
                'text': message.value,
              }
            }
            if (message.value) {
              this.props.activeChat.messages.push(newMessage);
              this.setProps(this.props.activeChat);
              message.value = '';
            }

          }
        }
      }
    });
  }

  protected componentDidUpdate(): boolean {
    this.children.chatSettings.setProps(this.props);
    //this.props.activeChat = 
    return true;
  }

  render() {

    return this.compile(template, { ...this.props, styles });
  }
}
