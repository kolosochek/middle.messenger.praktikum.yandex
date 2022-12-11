import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import { ProfileAPI } from '../../utils/ProfileAPI';
import { ProfileInterface } from '../../model/user';
import { InputComponent } from '../../components/InputComponent';
import { Validation } from '../../utils/Validation';
import { ShowModal } from '../../utils/ShowModal';
import template from './template';
import styles from './style.module.less';


interface ProfileViewProps {
  mode: "view" | "edit" | "change-password";
  router: Router;
  profile?: ProfileInterface;
  userId?: number;
  isCanChangeProfile: boolean;

  events?: {
    submit: (e: SubmitEvent) => void;
  };
}


export class ProfileView extends Block<ProfileViewProps> {
  public profileAPI:ProfileAPI;


  private createProfileFields(profile:ProfileInterface):void {
    //ProfileFieldEmail
    this.children.profileFieldEmail = new InputComponent({
      name: 'email',
      label: 'Email:',
      value: profile.email,
      type: 'text',
      class: `${styles['b-profile-field']}`,
      isDisabled: true,
    });

    //ProfileFieldFirstName
    this.children.profileFieldFirstName = new InputComponent({
      name: 'first_name',
      label: 'First name:',
      value: profile.first_name,
      class: `${styles['b-profile-field']}`,
      isDisabled: true,
    });

    //ProfileFieldSecondName
    this.children.profileFieldSecondName = new InputComponent({
      name: 'second_name',
      label: 'Last name:',
      value: profile.second_name,
      class: `${styles['b-profile-field']}`,
      isDisabled: true,
    });

    //ProfileFieldLogin
    this.children.profileFieldLogin = new InputComponent({
      name: 'login',
      label: 'Login:',
      value: profile.login,
      class: `${styles['b-profile-field']}`,
      isDisabled: true,
    });

    //ProfileFieldDisplayName
    this.children.profileFieldDisplayName = new InputComponent({
      name: 'display_name',
      label: 'Display name:',
      value: profile.login,
      class: `${styles['b-profile-field']}`,
      isDisabled: true,
    });

    //ProfileFieldPhone
    this.children.profileFieldPhone = new InputComponent({
      name: 'phone',
      label: 'Phone:',
      value: profile.phone,
      class: `${styles['b-profile-field']}`,
      isDisabled: true,
    });
  }

  public getUserProfile():ProfileInterface {
    return JSON.parse(window.localStorage.getItem('userObject')!) as ProfileInterface;
  }

  init() {
    this.profileAPI = new ProfileAPI();
    this.props.isCanChangeProfile = true;
    // modal
    ShowModal.bindToWindow();    
    
    // get View mode and switch it
    const viewMode = this.props.mode as ProfileViewProps['mode'];
    switch (viewMode) {
      case 'view': {
        if (this.props.userId){
          // fetch user data by given ID
          this.profileAPI.getUserProfile(this.props.userId).then((requestSuccess) => {
            this.props.profile = requestSuccess as ProfileInterface;

            // debug
            console.log('this.props.profile')
            console.log(this.props.profile)
            //

            this.props.isCanChangeProfile = false;
            this.createProfileFields(this.props.profile);
          }).catch((requestError) => {
            throw new Error(`Can't get user profile, user is is: ${this.props.userId}, reason: ${requestError}`)
          })
        } else {
          this.props.profile = this.getUserProfile();
          this.createProfileFields(this.props.profile);
        }
        
        /*
        {
          "id": 133,
          "first_name": "Slatrex",
          "second_name": "Slatrex",
          "display_name": null,
          "login": "slatrex",
          "avatar": "/a1c13f2b-fe82-43ee-9c02-1d5c7899b837/0ad1c483-befa-4eb5-8fa9-e6d1962d3b32_ivana-la-2N6wr_tVIgM-unsplash.jpg",
          "email": "slatrex+11@yandex.ru",
          "phone": "8888888888888"
        }
        */

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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
            focus: (e) => Validation.validateField(e, styles),
            blur: (e) => Validation.validateField(e, styles),
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
        const form = e.target! as HTMLFormElement;
        const formAllFields = form.querySelectorAll<HTMLInputElement>('input');
        if (formAllFields.length) {
          formAllFields.forEach((element: HTMLInputElement) => {
            Validation.validateField(element, styles)
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
