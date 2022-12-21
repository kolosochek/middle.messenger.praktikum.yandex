import Block from '../../utils/Block';
import { InputComponent } from '../InputComponent';
import template from './template';
import styles from './style.module.less';

interface ChatReplyProps {
  events?: {
    click?: (e: MouseEvent) => void;
    submit?: (e: SubmitEvent) => void;
  }
}

export class ChatReply extends Block<ChatReplyProps> {
  public init():void {
    this.children.messageInputComponent = new InputComponent({
      name: 'message',
      type: 'text',
      errorMessage: "Can't be empty",
      tabindex: '0',
      styles: styles,
    });
  }


  public render() {
    return this.compile(template, { ...this.props, styles });
  }
}
