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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, styles)
                : Validation.setFieldIsValid(e.target, styles)
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
        const form = e.target;

        const formAllFields = form.querySelectorAll('input');
        if (formAllFields.length) {
          formAllFields.forEach((element) => {
            Validation.validateFieldByType(element.getAttribute('name'), element.value)
              ? Validation.removeFieldIsValid(element, styles)
              : Validation.setFieldIsValid(element, styles)
          });
        }

        // check passwords for equality
        const passwordFields = form.querySelectorAll('input[name="password"], input[name="confirm_password"]');
        if (passwordFields.length == 2) {
          passwordFields.forEach((element) => {
            if (element.value && Validation.validateFieldByType(element.getAttribute('name'), element.value)) {
              Validation.compareFields(passwordFields[0].value, passwordFields[1].value)
                ? Validation.removeFieldIsValid(element, styles, "Passwords didn't match")
                : Validation.setFieldIsValid(element, styles, "Passwords didn't match")
            } else {
              Validation.setFieldIsValid(element, styles);
            }
          })
        }
        //

        const formInvalidFields = form.querySelectorAll('input[isinvalid="true"]');
        if (formInvalidFields.length) {
          form.classList.add(`${styles['state__invalid']}`);
        } else {
          form.classList.remove(`${styles['state__invalid']}`);
          // TODO: remove me
          // sprint_2_task
          console.log(Object.fromEntries(new FormData(form)));
          //
          this._loginUser();
          const result = prompt('Change page?', `yeah`)
          if (result !== null) {
            window.location.hash = '/';
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }
        }
      }
    }
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
