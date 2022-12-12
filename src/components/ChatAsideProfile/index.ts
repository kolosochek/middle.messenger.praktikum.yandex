import { ShowModal } from '../../utils/ShowModal';
import { ChatAPI } from '../../utils/ChatAPI';
import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatAsideProfileProps {
  events?: {
    click?: (e:MouseEvent) => void,
    submit?: (e:SubmitEvent) => void,
  } 
}

export class ChatAsideProfile extends Block<ChatAsideProfileProps> {
  constructor(props: ChatAsideProfileProps) {
    super({ ...props });
  }

  public init(){
    ShowModal.bindToWindow();
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
