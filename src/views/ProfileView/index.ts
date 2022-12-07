import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import { User } from '../../model/user';
import { ProfileInterface } from '../../model/user';
import { InputComponent } from '../../components/InputComponent';
import { Validation } from '../../utils/Validation';
import { ShowModal } from '../../utils/ShowModal';
import template from './template';
import styles from './style.module.less';


interface ProfileViewProps {
  mode: "view" | "edit" | "change-password";
  profile?: ProfileInterface;

  events?: {
    submit: (e: SubmitEvent) => void;
  };
}


export class ProfileView extends Block<ProfileViewProps> {
  private _validateField(e:FocusEvent|HTMLInputElement){
    if(e instanceof HTMLInputElement){
      Validation.validateFieldByType(e.name, e.value)
        ? Validation.removeFieldIsInvalid(e, styles)
        : Validation.setFieldIsInvalid(e, styles)
    } else {
      Validation.validateFieldByType(e.target.name, e.target.value)
        ? Validation.removeFieldIsInvalid(e.target, styles)
        : Validation.setFieldIsInvalid(e.target, styles)
    }
    
  }

  init() {
    ShowModal.bindToWindow();
    this.props.profile = User.getUserProfile();
    const viewMode = this.props.mode as ProfileViewProps['mode'];
    switch (viewMode) {
      case 'view': {
        //ProfileFieldEmail
        this.children.profileFieldEmail = new InputComponent({
          name: 'email',
          label: 'Email:',
          value: this.props.profile.email,
          type: 'text',
          class: `${styles['b-profile-field']}`,
          isDisabled: true,
        });

        //ProfileFieldFirstName
        this.children.profileFieldFirstName = new InputComponent({
          name: 'first_name',
          label: 'First name:',
          value: this.props.profile.first_name,
          class: `${styles['b-profile-field']}`,
          isDisabled: true,
        });

        //ProfileFieldSecondName
        this.children.profileFieldSecondName = new InputComponent({
          name: 'second_name',
          label: 'Last name:',
          value: this.props.profile.last_name,
          class: `${styles['b-profile-field']}`,
          isDisabled: true,
        });

        //ProfileFieldLogin
        this.children.profileFieldLogin = new InputComponent({
          name: 'login',
          label: 'Login:',
          value: this.props.profile.login,
          class: `${styles['b-profile-field']}`,
          isDisabled: true,
        });

        //ProfileFieldDisplayName
        this.children.profileFieldDisplayName = new InputComponent({
          name: 'display_name',
          label: 'Display name:',
          value: this.props.profile.login,
          class: `${styles['b-profile-field']}`,
          isDisabled: true,
        });

        //ProfileFieldPhone
        this.children.profileFieldPhone = new InputComponent({
          name: 'phone',
          label: 'Phone:',
          value: this.props.profile.phone,
          class: `${styles['b-profile-field']}`,
          isDisabled: true,
        });

        break;
      }
      case 'edit': {
        //ProfileFieldEmail
        this.children.profileFieldEmail = new InputComponent({
          name: 'email',
          label: 'Email:',
          placeholder: this.props.profile.email,
          type: 'text',
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Email is invalid!',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });

        //ProfileFieldFirstName
        this.children.profileFieldFirstName = new InputComponent({
          name: 'first_name',
          label: 'First name:',
          placeholder: this.props.profile.first_name,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'First name is invalid!',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });

        //ProfileFieldSecondName
        this.children.profileFieldSecondName = new InputComponent({
          name: 'second_name',
          label: 'Last name:',
          placeholder: this.props.profile.last_name,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Last name is invalid!',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });

        //ProfileFieldLogin
        this.children.profileFieldLogin = new InputComponent({
          name: 'login',
          label: 'Login:',
          placeholder: this.props.profile.login,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });

        //ProfileFieldDisplayName
        this.children.profileFieldDisplayName = new InputComponent({
          name: 'display_name',
          label: 'Display name:',
          placeholder: this.props.profile.login,
          class: `${styles['b-profile-field']}`,
        });

        //ProfileFieldPhone
        this.children.profileFieldPhone = new InputComponent({
          name: 'phone',
          label: 'Phone:',
          placeholder: this.props.profile.phone,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Phone is invalid',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });

        break;
      }
      case 'change-password': {
        //ProfileFieldOldPassword
        this.children.profileFieldOldPassword = new InputComponent({
          name: 'old_password',
          label: 'Old password:',
          type: 'password',
          placeholder: '**********',
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });

        //ProfileFieldNewPassword
        this.children.profileFieldNewPassword = new InputComponent({
          name: 'password',
          label: 'New password:',
          type: 'password',
          placeholder: '**********',
          class: `${styles['b-profile-field']}`,
          defaultErrorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });

        //ProfileFieldNewPassword
        this.children.profileFieldConfirmPassword = new InputComponent({
          name: 'confirm_password',
          label: 'Confirm new password:',
          type: 'password',
          placeholder: '**********',
          class: `${styles['b-profile-field']}`,
          defaultErrorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => this._validateField(e),
            blur: (e) => this._validateField(e),
          }
        });
        break;
      }
      default: {
        break;
      }
    }

    this.props.events = {
      submit: (e) => {
        e.preventDefault();
        const form: HTMLFormElement = e.target!;
        const formAllFields = form.querySelectorAll<HTMLInputElement>('input');
        if (formAllFields.length) {
          formAllFields.forEach((element: HTMLInputElement) => {
            this._validateField(element);
          });
        }

        const formInvalidFields = form.querySelectorAll('input[isinvalid="true"]');
        if (formInvalidFields.length) {
          form.classList.add(`${styles['state__invalid']}`);
        } else {
          form.classList.remove(`${styles['state__invalid']}`);
          // check password for equality
          if (this.props.mode === 'change-password') {
            // check passwords for equality
            const passwordField = form.querySelector<HTMLInputElement>('input[name="password"]');
            const confirmPasswordField = form.querySelector<HTMLInputElement>('input[name="confirm_password"]');
            if (Validation.comparePasswordFields(passwordField, confirmPasswordField, styles)) {
              /* TODO: remove me
              // sprint_2_task
              const formData = Object.fromEntries(new FormData(form));
              console.log(formData);
              */
              const result = prompt('Change page?', `yeah`)
              if (result !== null) {
                Router.go("/settings")
              }
              }
            //
          } else {
            // TODO: remove me
            // sprint_2_task
            const formData = Object.fromEntries(new FormData(form));
            console.log(formData);
            //
            const result = prompt('Change page?', `yeah`)
            if (result !== null) {
              Router.go("/settings")
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
