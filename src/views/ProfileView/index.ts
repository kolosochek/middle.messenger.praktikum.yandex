import Block from '../../utils/Block';
import { User } from '../../model/user';
import { ProfileField } from '../../components/ProfileField';
import { Validation } from '../../utils/Validation';
import { ShowModal } from '../../utils/ShowModal';
import template from './template';
import styles from './style.module.less';


interface ProfileViewProps {
  mode: string;
  profile?: object;

  events?: {
    submit: (e: SubmitEvent) => void;
  };
}


export class ProfileView extends Block<ProfileViewProps> {

  private static _removeFieldIsValid(node: HTMLElement | null): void {
    if (node !== null) {
      node.removeAttribute('isInvalid');
      node.parentNode?.parentNode?.classList.remove(`${styles['state__invalid']}`);
    }
  }
  private static _setFieldIsValid(node: HTMLElement | null): void {
    if (node !== null) {
      node.setAttribute('isInvalid', 'true');
      node.parentNode?.parentNode?.classList.add(`${styles['state__invalid']}`);
    }
  }


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
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
          errorMessage: 'Password must be 8-40 length, with one Capital letter, and digit',

          events: {
            focus: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
            },
            blur: (e) => {
              Validation.validateFieldByType(e.target?.getAttribute('name'), e.target?.value)
                ? ProfileView._removeFieldIsValid(e.target)
                : ProfileView._setFieldIsValid(e.target)
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
        // debug
        //console.log(form);
        //
        if (formAllFields.length) {
          formAllFields.forEach((element) => {
            Validation.validateFieldByType(element?.getAttribute('name'), element.value)
              ? ProfileView._removeFieldIsValid(element)
              : ProfileView._setFieldIsValid(element)
          });
        }
        const formInvalidFields = form.querySelectorAll('input[isInvalid=true]');
        if (formInvalidFields.length) {
          form.classList.add(`${styles['state__invalid']}`);
        } else {
          form.classList.remove(`${styles['state__invalid']}`);
          // TODO: remove me
          // sprint_2_task
          console.log(Object.fromEntries(new FormData(form)));
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
