import Block from '../../utils/Block';
import { InputComponent } from '../../components/InputComponent';
import { Validation } from '../../utils/Validation';
import template from './template';
import styles from './style.module.less';


interface AuthViewProps {
  mode: 'auth' | 'signup' | 'logout';
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export class AuthView extends Block<AuthViewProps> {
  private _logoutUser(): void {
    window.localStorage.removeItem('isAuthorized');
  }

  private _loginUser(): void {
    window.localStorage.setItem('isAuthorized', 'true');
  }

  public static getIsAuthorized(): string | null {
    return window.localStorage.getItem('isAuthorized');
  }

  init() {
    const mode = this.props.mode;

    switch (mode) {
      // auth
      case 'auth': {
        // loginInputComponent
        this.children.loginInputComponent = new InputComponent({
          label: 'Login',
          name: 'login',
          type: 'text',
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
          }
        });


        // passwordInputComponent
        this.children.passwordInputComponent = new InputComponent({
          label: 'Password',
          name: 'password',
          type: 'password',
          errorMessage: 'Password must be 8-40 length, contain at least one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
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
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
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
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
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
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
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
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
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
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
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
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
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
            focus: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target.name, e.target.value)
                ? Validation.removeFieldIsInvalid(e.target, styles)
                : Validation.setFieldIsInvalid(e.target, styles)
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
    this.props.events = {
      submit: (e) => {
        e.preventDefault();
        const form:HTMLFormElement = e.target;
        const formAllFields = form.querySelectorAll<HTMLInputElement[]>('input');
        if (formAllFields.length) {
          formAllFields.forEach((element:HTMLInputElement) => {
            Validation.validateFieldByType(element.name, element.value)
              ? Validation.removeFieldIsInvalid(element, styles)
              : Validation.setFieldIsInvalid(element, styles)
          });
        }

        const formInvalidFields = form.querySelectorAll<NodeList>('input[isinvalid="true"]');
        if (formInvalidFields.length) {
          form.classList.add(`${styles['state__invalid']}`);
        } else {
          form.classList.remove(`${styles['state__invalid']}`);
          // check passwords for equality
          if (mode === 'signup') {
            const passwordField = form.querySelector<HTMLInputElement>('input[name="password"]');
            const confirmPasswordField = form.querySelector<HTMLInputElement>('input[name="confirm_password"]');
            if (Validation.comparePasswordFields(passwordField, confirmPasswordField, styles)) {
              // TODO: remove me
              // sprint_2_task
              const formData = Object.fromEntries(new FormData(form));
              console.log(formData);
              //
              const result = prompt('Change page?', `yeah`)
              if (result !== null) {
                this._loginUser();
                window.location.hash = '/';
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }
            }
          } else {
            // TODO: remove me
            // sprint_2_task
            console.log(Object.fromEntries(new FormData(form)));
            //
            const result = prompt('Change page?', `yeah`)
            if (result !== null) {
              this._loginUser();
              window.location.hash = '/';
              window.dispatchEvent(new HashChangeEvent("hashchange"));
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
