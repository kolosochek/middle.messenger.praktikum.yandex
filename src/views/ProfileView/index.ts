import Block from '../../utils/Block';
import { InputComponent } from '../../components/InputComponent';
import template from './template';
import styles from './style.module.less';
import user from '../../model/user'


interface ProfileViewProps {
  mode: string;
}


export class ProfileView extends Block<ProfileViewProps> {
  constructor(context: any) {
    super(context);
  }


  init() {
    const mode = this.props.mode;
    // debug
    //console.log("mode");
    //console.log(mode);

    this.props.profile = user;

    // loginInputComponent
    this.children.loginInputComponent = new InputComponent({
      title: 'Login',
      name: 'login',
      type: 'text',
      required: 'true',
      isValid: 'true',
      errorMessage: '',
    });


  }



  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
