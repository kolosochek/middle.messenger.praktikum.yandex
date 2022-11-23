import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';
import user from '../../model/user.js'


interface ProfileViewProps {
  mode: string;
}


export class ProfileView extends Block<ProfileViewProps> {
  constructor(context: any) {
    super(context);
  }


  init() {
    const mode = this.props.mode;
    this.props.profile = user;    
    }


  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
