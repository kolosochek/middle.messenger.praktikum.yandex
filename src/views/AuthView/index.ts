import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import { Validation } from '../../utils/Validation';
import { AuthAPI, AuthFormInterface, RegisterFormInterface } from '../../utils/AuthAPI';
import { Store } from '../../model/Store';
import { InputComponent } from '../../components/InputComponent';
import template from './template';
import styles from './style.module.less';


interface AuthViewProps {
  mode: 'auth' | 'signup' | 'logout';
  router: Router;
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export class AuthView extends Block<AuthViewProps> {
  public authAPI: AuthAPI;

  private _logoutUser(): void {
    Store.clean();
    Store.removeItem('isAuthorized');
    Store.removeItem('profile');
  }

  private _loginUser(): void {
    Store.setItem('isAuthorized', 'true');
    Store.getUserId();
  }

  public static getIsAuthorized(): boolean {
    return Boolean(Store.getItem('isAuthorized'));
  }

  init() {
    this.authAPI = new AuthAPI();
    const viewMode = this.props.mode as AuthViewProps['mode'];

    switch (viewMode as AuthViewProps['mode']) {
      // auth
      case 'auth': {
        // loginInputComponent
        this.children.loginInputComponent = new InputComponent({
          label: 'Login',
          name: 'login',
          type: 'text',
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',
          events: {
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
          }
        });
        // passwordInputComponent
        this.children.passwordInputComponent = new InputComponent({
          label: 'Password',
          name: 'password',
          type: 'password',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',
          events: {
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
          }
        });
        break;
      }
      // logout
      case 'logout': {
        this.authAPI.logoutUser().then(() => {
          this._logoutUser();
          this.props.router.go('/');
        }).catch(() => {
          this._logoutUser();
          this.props.router.go('/');
        });
        break;
      }
      default: {
        throw new Error(`AuthView: no action for this mode: ${viewMode}!`);
      }
    }

    // auth page form submit
    this.props.events = {
      submit: (e:SubmitEvent) => {
        e.preventDefault();
        const form: HTMLFormElement = e.target!;
        const formAllFields = form.querySelectorAll<HTMLInputElement>('input');
        if (formAllFields.length) {
          formAllFields.forEach((element: HTMLInputElement) => {
            Validation.validateField(element, styles);
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
            this.authAPI.authorizeUser(formData as AuthFormInterface).then(() => {
              this._loginUser();
              this.props.router.go('/messenger');
            }).catch((requestError) => {
              if (requestError.reason !== 'User already in system') {
                Validation.setFormError(form, styles, requestError.reason);
              } else {
                this._loginUser();
                this.props.router.go('/messenger');
              }
            })
          } else if (viewMode === 'signup') {
            // passwords are equal?
            const passwordField = form.querySelector<HTMLInputElement>('input[name="password"]');
            const confirmPasswordField = form.querySelector<HTMLInputElement>('input[name="confirm_password"]');
            if (Validation.comparePasswordFields(passwordField, confirmPasswordField, styles)) {
              const formData = Object.fromEntries(new FormData(form));
              // register user
              this.authAPI.registerUser(formData as RegisterFormInterface).then(() => {
                this._loginUser();
                this.props.router.go('/messenger');
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
