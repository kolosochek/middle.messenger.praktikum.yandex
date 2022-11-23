import Block from '../../utils/Block';
import { InputComponent } from '../../components/InputComponent';
import template from './template';
import styles from './style.module.less';


interface AuthViewProps {
  mode: string;
  events?: {
    submit: (e: any) => void;
  };
}


export class AuthView extends Block<AuthViewProps> {
  constructor(context: any) {
    super(context);
  }

  private _logoutUser(): void {
    window.localStorage.removeItem('isAuthorized');
  }

  private _loginUser(): void {
    window.localStorage.setItem('isAuthorized', 'true');
  }

  protected static getIsAuthorized(): string | null {
    return window.localStorage.getItem('isAuthorized');
  }

  init() {
    const mode = this.props.mode;

    switch (mode) {
      // auth
      case 'auth': {
        this.setProps({
          events: {
            // on auth form submit
            submit: (e) => {
              //e.preventDefault();
              this._loginUser();
              // TODO
              // console.log() all form fields
              console.log('TODO: console.log() all form fields!')
            }
          }
        });

        // loginInputComponent
        this.children.loginInputComponent = new InputComponent({
          title: 'Login',
          name: 'login',
          type: 'text',
          required: 'true',
          isValid: 'true',
          errorMessage: '',
        });

        // passwordInputComponent
        this.children.passwordInputComponent = new InputComponent({
          title: 'Password',
          name: 'password',
          type: 'password',
          required: 'true',
          isValid: 'true'
        });
        break;
      }
      // signup
      case 'signup': {
        this.setProps({
          events: {            
            // on signup form submit
            submit: (e) => {
              //e.preventDefault();
              this._loginUser();
              // TODO
              // console.log() all form fields
              console.log('TODO: console.log() all form fields!')
            }
          }
        });

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
        break;
      }
      // logout
      case 'logout': {
        this._logoutUser();
        window.location.hash = '/';
      }
      default: {
        throw new Error(`AuthView: no action for this mode: ${mode}!`);
      }
    }
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
