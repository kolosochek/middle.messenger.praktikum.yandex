import { ShowModal } from '../../utils/ShowModal';
import { Router } from '../../utils/Router';
import { Link } from '../Link';
import Block from '../../utils/Block';
import template from './template';
import * as styles from './style.module.less';

interface ChatAsideProfileProps {
  router: Router,
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
    // my profile link
    this.children.myProfileLink = new Link({ 
      router: this.props.router,
      href: '/settings',
      title: 'My profile',
      class: `${styles['b-link']} ${styles['b-profile']}`,
    });
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
