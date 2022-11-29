import Block from '../../utils/Block';
import { InputComponent } from '../../components/InputComponent';
import { Validation } from '../../utils/Validation';
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

  public static getIsAuthorized(): string | null {
    return window.localStorage.getItem('isAuthorized');
  }

  private static _removeFieldIsValid(node: HTMLElement | null): void {
    if (node !== null) {
      node.removeAttribute('isInvalid');
      node.parentNode?.classList.remove(`${styles['state__invalid']}`);
    }
  }
  private static _setFieldIsValid(node: HTMLElement | null): void {
    if (node !== null) {
      node.setAttribute('isInvalid', 'true');
      node.parentNode?.classList.add(`${styles['state__invalid']}`);
    }
  }

  init() {
    const mode = this.props.mode;

    switch (mode) {
      // auth
      case 'auth': {
        // loginInputComponent
        this.children.loginInputComponent = new InputComponent({
          title: 'Login',
          name: 'login',
          type: 'text',
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });


        // passwordInputComponent
        this.children.passwordInputComponent = new InputComponent({
          title: 'Password',
          name: 'password',
          type: 'password',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });
        break;
      }

      // signup
      case 'signup': {
        // emailInputComponent
        this.children.emailInputComponent = new InputComponent({
          title: 'Email',
          name: 'email',
          type: 'email',
          placeholder: 'sebastian1337@gmail.com',
          errorMessage: 'Email is invalid!',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });

        // firstNameInputComponent
        this.children.firstNameInputComponent = new InputComponent({
          title: 'First name',
          name: 'first_name',
          type: 'text',
          placeholder: 'Sebastian',
          errorMessage: 'First name is invalid',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });

        // lastNameInputComponent
        this.children.lastNameInputComponent = new InputComponent({
          title: 'Last name',
          name: 'second_name',
          type: 'text',
          placeholder: 'Pereiro',
          errorMessage: 'Last name is invalid',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });

        // loginInputComponent
        this.children.loginInputComponent = new InputComponent({
          title: 'Login',
          name: 'login',
          type: 'text',
          placeholder: 'sebastian1337',
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });

        // phoneInputComponent
        this.children.phoneInputComponent = new InputComponent({
          title: 'Phone',
          name: 'phone',
          type: 'tel',
          //pattern: '[+]{1}[0-9]{6,14}',
          placeholder: '+7 904 889 1488',
          errorMessage: 'Phone is invalid',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });

        // passwordInputComponent
        this.children.passwordInputComponent = new InputComponent({
          title: 'Password',
          name: 'password',
          type: 'password',
          placeholder: '123A123',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });

        // confirmPasswordInputComponent
        this.children.confirmPasswordInputComponent = new InputComponent({
          title: 'Confirm password',
          name: 'confirm_password',
          type: 'password',
          placeholder: '123123',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? AuthView._removeFieldIsValid(e.target)
                : AuthView._setFieldIsValid(e.target)
            },
          }
        });
        break;
      }

      // logout
      case 'logout': {
        this._logoutUser();
        window.location.hash = '/';
        break;
      }
      default: {
        throw new Error(`AuthView: no action for this mode: ${mode}!`);
      }
    }

    // auth page form submit
    this.setProps({
      events: {
        submit: (e) => {
          e.preventDefault();
          const form = e.target;
          const formAllFields = form.querySelectorAll('input');
          // debug
          console.log(formAllFields);
          //
          if (formAllFields.length){
            formAllFields.forEach((element) => {
              Validation.validateFieldByType(element?.getAttribute('name'), element.value)
                ? AuthView._removeFieldIsValid(element)
                : AuthView._setFieldIsValid(element)
            });
          }
          const formInvalidFields = form.querySelectorAll('input[isInvalid=true]');
          if (formInvalidFields.length) {

          } else {
            this._loginUser();
            window.location.hash = '/';
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }

          // TODO
          // console.log() all form fields
          //console.log('TODO: console.log() all form fields!');

        }
      }
    });
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
