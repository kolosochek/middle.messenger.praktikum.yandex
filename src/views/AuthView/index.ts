import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import { Validation } from '../../utils/Validation';
import { AuthAPI, AuthFormInterface, RegisterFormInterface } from '../../utils/AuthAPI';
import { InputComponent } from '../../components/InputComponent';
import template from './template';
import styles from './style.module.less';


interface AuthViewProps {
  mode: 'auth' | 'signup' | 'logout';
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export class AuthView extends Block<AuthViewProps> {
  private _validateField(e: FocusEvent | HTMLInputElement) {
    if (e instanceof HTMLInputElement) {
      Validation.validateFieldByType(e.name, e.value)
        ? Validation.removeFieldIsInvalid(e, styles)
        : Validation.setFieldIsInvalid(e, styles)
    } else {
      Validation.validateFieldByType(e.target.name, e.target.value)
        ? Validation.removeFieldIsInvalid(e.target, styles)
        : Validation.setFieldIsInvalid(e.target, styles)
    }
  }

  private _logoutUser(): void {
    window.localStorage.removeItem('isAuthorized');
  }

  private _loginUser(): void {
    window.localStorage.setItem('isAuthorized', 'true');
  }

  public static getIsAuthorized(): boolean {
    return Boolean(window.localStorage.getItem('isAuthorized'));
  }

  init() {
    const authAPI = new AuthAPI();
    const viewMode = this.props.mode as AuthViewProps['mode'];

    switch (viewMode) {
      // auth
      case 'auth': {
        // loginInputComponent
        this.children.loginInputComponent = new InputComponent({
          label: 'Login',
          name: 'login',
          type: 'text',
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        // passwordInputComponent
        this.children.passwordInputComponent = new InputComponent({
          label: 'Password',
          name: 'password',
          type: 'password',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        break;
      }
      // signup
      case 'signup': {
        // emailInputComponent
        this.children.emailInputComponent = new InputComponent({
          label: 'Email',
          name: 'email',
          type: 'email',
          placeholder: 'sebastian1337@gmail.com',
          errorMessage: 'Email is invalid!',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        // firstNameInputComponent
        this.children.firstNameInputComponent = new InputComponent({
          label: 'First name',
          name: 'first_name',
          type: 'text',
          placeholder: 'Sebastian',
          errorMessage: 'First name is invalid',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        // lastNameInputComponent
        this.children.lastNameInputComponent = new InputComponent({
          label: 'Last name',
          name: 'second_name',
          type: 'text',
          placeholder: 'Pereiro',
          errorMessage: 'Last name is invalid',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        // loginInputComponent
        this.children.loginInputComponent = new InputComponent({
          label: 'Login',
          name: 'login',
          type: 'text',
          placeholder: 'sebastian1337',
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        // phoneInputComponent
        this.children.phoneInputComponent = new InputComponent({
          label: 'Phone',
          name: 'phone',
          type: 'tel',
          //pattern: '[+]{1}[0-9]{6,14}',
          placeholder: '+79048891488',
          errorMessage: 'Phone is invalid',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        // passwordInputComponent
        this.children.passwordInputComponent = new InputComponent({
          label: 'Password',
          name: 'password',
          type: 'password',
          placeholder: 'ASDASDASD2',
          defaultErrorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        // confirmPasswordInputComponent
        this.children.confirmPasswordInputComponent = new InputComponent({
          label: 'Confirm password',
          name: 'confirm_password',
          type: 'password',
          placeholder: 'ASDASDASD2',
          defaultErrorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',
          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        break;
      }
      // logout
      case 'logout': {
        authAPI.logoutUser().then(() => {
          this._logoutUser();
          Router.go('/');
        }).catch(() => {
          this._logoutUser();
          Router.go('/');
        });
        break;
      }
      default: {
        throw new Error(`AuthView: no action for this mode: ${viewMode}!`);
      }
    }

    // auth page form submit
    this.props.events = {
      submit: (e) => {
        e.preventDefault();
        const form: HTMLFormElement = e.target;
        const formAllFields = form.querySelectorAll<HTMLInputElement>('input');
        if (formAllFields.length) {
          formAllFields.forEach((element: HTMLInputElement) => {
            this._validateField(element);
          });
        }
        // check inputs for validation
        const formInvalidFields = form.querySelectorAll<HTMLInputElement>('input[isinvalid="true"]');
        if (formInvalidFields.length) {
          form.classList.add(`${styles['state__invalid']}`);
        } else {
          form.classList.remove(`${styles['state__invalid']}`);
          if (viewMode === 'auth') {
            const formData = Object.fromEntries(new FormData(form));
            // auth user
            authAPI.authorizeUser(formData as AuthFormInterface).then(() => {
              this._loginUser();
              Router.go('/messenger');
            }).catch((requestError) => {
                Validation.setFormError(form, styles, requestError.reason);
            })
          } else if (viewMode === 'signup') {
            // passwords are equal?
            const passwordField = form.querySelector<HTMLInputElement>('input[name="password"]');
            const confirmPasswordField = form.querySelector<HTMLInputElement>('input[name="confirm_password"]');
            if (Validation.comparePasswordFields(passwordField, confirmPasswordField, styles)) {
              const formData = Object.fromEntries(new FormData(form));
              // register user
              authAPI.registerUser(formData as RegisterFormInterface).then(() => {
                this._loginUser();
                Router.go('/messenger');
              }).catch((requestError) => {
                Validation.setFormError(form, styles, requestError.reason);
              })
            }
          }
        }
      }
    }
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
