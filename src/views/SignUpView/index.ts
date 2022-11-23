import Block from '../../utils/Block';
import { InputComponent } from '../../components/InputComponent';
import template from './template';
import styles from './style.module.less';


interface SignUpViewProps {
}


export class SignUpView extends Block<SignUpViewProps> {
  constructor(context: any) {
    super(context);
  }

  init() {

    // emailInputComponent
    this.children.emailInputComponent = new InputComponent({
      title: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'sebastian1337@gmail.com',
      required: 'true',
      isValid: 'true',
      errorMessage: '',
    });

    // firstNameInputComponent
    this.children.firstNameInputComponent = new InputComponent({
      title: 'First name',
      name: 'first_name',
      type: 'text',
      placeholder: 'Sebastian',
      required: 'true',
      isValid: 'true',
      errorMessage: '',
    });

    // lastNameInputComponent
    this.children.lastNameInputComponent = new InputComponent({
      title: 'Last name',
      name: 'second_name',
      type: 'text',
      placeholder: 'Pereiro',
      required: 'true',
      isValid: 'true',
      errorMessage: '',
    });

    // loginInputComponent
    this.children.loginInputComponent = new InputComponent({
      title: 'Login',
      name: 'login',
      type: 'text',
      placeholder: 'sebastian1337',
      required: 'true',
      isValid: 'true',
      errorMessage: '',
    });
    // phoneInputComponent
    this.children.phoneInputComponent = new InputComponent({
      title: 'Phone',
      name: 'phone',
      type: 'tel',
      pattern: '[+]{1}[0-9]{6,14}',
      placeholder: '+7 904 889 1488',
      required: 'true',
      isValid: 'true',
      errorMessage: '',
    });

    // passwordInputComponent
    this.children.passwordInputComponent = new InputComponent({
      title: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '123123',
      required: 'true',
      isValid: 'true'
    });

    // confirmPasswordInputComponent
    this.children.confirmPasswordInputComponent = new InputComponent({
      title: 'Confirm password',
      name: 'confirm_password',
      type: 'password',
      placeholder: '123123',
      required: 'true',
      isValid: 'true'
    });
  }



  render() {
    // debug
    //console.log(this.props);
    //
    return this.compile(template, { ...this.props, styles });
  }

}
