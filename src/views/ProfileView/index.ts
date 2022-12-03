import Block from '../../utils/Block';
import { User } from '../../model/user';
import { ProfileField } from '../../components/ProfileField';
import { Validation } from '../../utils/Validation';
import { ShowModal } from '../../utils/ShowModal';
import template from './template';
import styles from './style.module.less';


interface ProfileViewProps {
  mode: "view" | "edit"| "change-password";
  profile?: object;

  events?: {
    submit: (e: SubmitEvent) => void;
  };
}


export class ProfileView extends Block<ProfileViewProps> {
  init() {
    ShowModal.bindToWindow();
    const viewMode = this.props.mode;
    switch (viewMode) {
      case 'view': {
        this.props.profile = User.getUserProfile();

        //ProfileFieldEmail
        this.children.profileFieldEmail = new ProfileField({
          name: 'email',
          label: 'Email:',
          value: this.props.profile.email,
        });

        //ProfileFieldFirstName
        this.children.profileFieldFirstName = new ProfileField({
          name: 'first_name',
          label: 'First name:',
          value: this.props.profile.first_name,
        });

        //ProfileFieldSecondName
        this.children.profileFieldSecondName = new ProfileField({
          name: 'second_name',
          label: 'Last name:',
          value: this.props.profile.last_name,
        });

        //ProfileFieldLogin
        this.children.profileFieldLogin = new ProfileField({
          name: 'login',
          label: 'Login:',
          value: this.props.profile.login,
        });

        //ProfileFieldDisplayName
        this.children.profileFieldDisplayName = new ProfileField({
          name: 'display_name',
          label: 'Display name:',
          value: this.props.profile.login,
        });

        //ProfileFieldPhone
        this.children.profileFieldPhone = new ProfileField({
          name: 'phone',
          label: 'Phone:',
          value: this.props.profile.phone,
        });

        break;
      }
      case 'edit': {
        this.props.profile = User.getUserProfile();

        //ProfileFieldEmail
        this.children.profileFieldEmail = new ProfileField({
          mode: viewMode,
          name: 'email',
          label: 'Email:',
          value: this.props.profile.email,
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });

        //ProfileFieldFirstName
        this.children.profileFieldFirstName = new ProfileField({
          mode: viewMode,
          name: 'first_name',
          label: 'First name:',
          value: this.props.profile.first_name,
          errorMessage: 'First name is invalid!',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });

        //ProfileFieldSecondName
        this.children.profileFieldSecondName = new ProfileField({
          mode: viewMode,
          name: 'second_name',
          label: 'Last name:',
          value: this.props.profile.last_name,
          errorMessage: 'Last name is invalid!',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });

        //ProfileFieldLogin
        this.children.profileFieldLogin = new ProfileField({
          mode: viewMode,
          name: 'login',
          label: 'Login:',
          value: this.props.profile.login,
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });

        //ProfileFieldDisplayName
        this.children.profileFieldDisplayName = new ProfileField({
          mode: viewMode,
          name: 'display_name',
          label: 'Display name:',
          value: this.props.profile.login,
        });

        //ProfileFieldPhone
        this.children.profileFieldPhone = new ProfileField({
          mode: viewMode,
          name: 'phone',
          label: 'Phone:',
          value: this.props.profile.phone,
          errorMessage: 'Phone is invalid',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });

        break;
      }
      case 'change-password': {
        this.props.profile = User.getUserProfile();

        //ProfileFieldOldPassword
        this.children.profileFieldOldPassword = new ProfileField({
          mode: viewMode,
          name: 'old_password',
          label: 'Old password:',
          type: 'password',
          value: '**********',
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });

        //ProfileFieldNewPassword
        this.children.profileFieldNewPassword = new ProfileField({
          mode: viewMode,
          name: 'password',
          label: 'New password:',
          type: 'password',
          value: '**********',
          defaultErrorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });

        //ProfileFieldNewPassword
        this.children.profileFieldConfirmPassword = new ProfileField({
          mode: viewMode,
          name: 'confirm_password',
          label: 'Confirm new password:',
          type: 'password',
          value: '**********',
          defaultErrorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? Validation.removeFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
                : Validation.setFieldIsValid(e.target, e.target.parentNode.parentNode, styles)
            },
          }
        });
        break;
      }
      default: {
        this.props.profile = User.getUserProfile();
        break;
      }
    }

    this.props.events = {
      submit: (e) => {
        e.preventDefault();
        const form = e.target;
        const formAllFields = form.querySelectorAll('input');
        if (formAllFields.length) {
          formAllFields.forEach((element) => {
            Validation.validateFieldByType(element?.getAttribute('name'), element.value)
              ? Validation.removeFieldIsValid(element, element.parentNode.parentNode, styles)
              : Validation.setFieldIsValid(element, element.parentNode.parentNode, styles)
          });
        }

        if (this.props.mode === 'change-password') {
          // check passwords for equality
          const passwordFields = form.querySelectorAll('input[name="password"], input[name="confirm_password"]');
          if (passwordFields.length == 2) {
            passwordFields.forEach((element) => {
              if (element.value && Validation.validateFieldByType(element.getAttribute('name'), element.value)) {
                Validation.compareFields(passwordFields[0].value, passwordFields[1].value)
                  ? Validation.removeFieldIsValid(element, element.parentNode.parentNode, styles, "Passwords didn't match")
                  : Validation.setFieldIsValid(element, element.parentNode.parentNode, styles, "Passwords didn't match")
              } else {
                Validation.setFieldIsValid(element, element.parentNode.parentNode, styles);
              }
            })
          }
          //
        }

        const formInvalidFields = form.querySelectorAll('input[isinvalid="true"]');
        if (formInvalidFields.length) {
          form.classList.add(`${styles['state__invalid']}`);
        } else {
          form.classList.remove(`${styles['state__invalid']}`);
          // TODO: remove me
          // sprint_2_task
          const formData = Object.fromEntries(new FormData(form));
          console.log(formData);
          //
          const result = prompt('Change page?', `yeah`)
          if (result !== null) {
            window.location.hash = '/profile';
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
