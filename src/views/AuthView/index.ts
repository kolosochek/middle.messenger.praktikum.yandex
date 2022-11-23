import Block from '../../utils/Block';
import { InputComponent } from '../../components/InputComponent';
import template from './template';
import styles from './style.module.less';


interface AuthViewProps {
  mode?: string;
  events?: {
    submit: (e:any) => void;
  };
}


export class AuthView extends Block<AuthViewProps> {
  constructor(context: any) {
    super(context);
  }

  private _logoutUser():void {
    window.localStorage.removeItem('isAuthorized');
  }

  private _loginUser():void {
    window.localStorage.setItem('isAuthorized', 'true');
  }

  protected static getIsAuthorized():string | null {
    return window.localStorage.getItem('isAuthorized');
  }

  init() {
    const mode = this.props.mode;
    // if we wanna log user out
    if(mode === 'logout'){
      this._logoutUser();
      window.location.hash = '/';
    }

    // on auth form submit
    if(mode === 'auth'){
      this.setProps({ events: {
        submit: (e) => {
          //e.preventDefault();
          this._loginUser();
          // TODO
          // console.log() all form fields
          console.log('TODO: console.log() all form fields!')
        }
      }})
    }

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

  }
  

  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
