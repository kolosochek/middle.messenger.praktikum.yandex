import Block from '../../utils/Block';
import { ShowModal } from '../../utils/ShowModal';
import { Router } from '../../utils/Router';
import { Store } from '../../model/Store';
import { AuthAPI } from '../../utils/AuthAPI';
import { ProfileAPI } from '../../utils/ProfileAPI';
import { UpdateProfileInterface, ProfileInterface, UpdateProfilePasswordInterface } from '../../model/Store';
import { InputComponent } from '../../components/InputComponent';
import { Validation } from '../../utils/Validation';
import { Link } from '../../components/Link';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import template from './template';
import styles from './style.module.less';


export interface ProfileViewProps {
  mode: "view" | "edit" | "change-password";
  router: Router;
  profile?: ProfileInterface;
  isCanChangeProfile: boolean;

  events?: {
    submit: (e: SubmitEvent) => void;
  };
}


export class ProfileView extends Block<ProfileViewProps> {
  public profileAPI:ProfileAPI;
  public authAPI:AuthAPI;


  init() {
    // modal
    ShowModal.bindToWindow();    
    this.props.profile = Store.getItem('profile') as ProfileInterface;
    this.profileAPI = new ProfileAPI();
    this.authAPI = new AuthAPI();

    
    // get View mode and switch it
    const viewMode = this.props.mode as ProfileViewProps['mode'];
    switch (viewMode) {
      case 'view': {
        this.props.isCanChangeProfile = true;

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
          value: this.props.profile.second_name,
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
          value: this.props.profile.display_name,
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
        // edit profile link
        this.children.editProfileLink = new Link({ 
          router: this.props.router,
          href: '/settings-edit',
          title: 'Edit profile info',
          class: styles['b-link'],
        });
        // change profile password link
        this.children.changePasswordLink = new Link({ 
          router: this.props.router,
          href: '/settings-change-password',
          title: 'Change password',
          class: styles['b-link'],
        });
        // change profile password link
        this.children.logoutLink = new Link({ 
          router: this.props.router,
          href: '/logout',
          title: 'Logout',
          class: styles['b-link'],
        });
        break;
      }
      case 'edit': {
        this.props.isCanChangeProfile = true;
        //ProfileFieldEmail
        this.children.profileFieldEmail = new InputComponent({
          name: 'email',
          label: 'Email:',
          value: this.props.profile.email,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Email is invalid!', 
          styles: styles,         
        });

        //ProfileFieldFirstName
        this.children.profileFieldFirstName = new InputComponent({
          name: 'first_name',
          label: 'First name:',
          value: this.props.profile.first_name,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'First name is invalid!',
          styles: styles,
        });

        //ProfileFieldSecondName
        this.children.profileFieldSecondName = new InputComponent({
          name: 'second_name',
          label: 'Last name:',
          value: this.props.profile.second_name,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Last name is invalid!',
          styles: styles,
        });

        //ProfileFieldLogin
        this.children.profileFieldLogin = new InputComponent({
          name: 'login',
          label: 'Login:',
          value: this.props.profile.login,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Login must be 3-20 length, only letters, digits and _ or -',
          styles: styles,
        });

        //ProfileFieldDisplayName
        this.children.profileFieldDisplayName = new InputComponent({
          name: 'display_name',
          label: 'Display name:',
          value: this.props.profile.display_name,
          class: `${styles['b-profile-field']}`,
          styles: styles,
          events: {
            focus: () => {return},
            blur: () => {return},
          }
        });

        //ProfileFieldPhone
        this.children.profileFieldPhone = new InputComponent({
          name: 'phone',
          label: 'Phone:',
          value: this.props.profile.phone,
          class: `${styles['b-profile-field']}`,
          errorMessage: 'Phone is invalid',
          styles: styles,
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
          styles: styles,
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
          styles: styles,
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
          styles: styles,
        });
        break;
      }
      default: {
        break;
      }
    }
    // goback link
    this.children.goBackLink = new Link({ 
      router: this.props.router,
      href: '/messenger',
      title: 'Back',
      class: styles['b-profile-goback'],
    });

    // profile avatar
    this.children.profileAvatar = new ProfileAvatar({ 
      profile: this.props.profile,
      isCanChangeProfile: this.props.isCanChangeProfile,
      profileStyles: styles,
      events: {
        click: (e:MouseEvent) => {
          const link = (e.target! as HTMLElement).closest("a");
          if(link !== null) {
            const form:HTMLFormElement = document.querySelector('form#upload_avatar')!;
            if (form !== null) {
              form.addEventListener('submit', (e:SubmitEvent) => {
                e.preventDefault();
                const formData = new FormData(form);
                this.profileAPI.changeUserAvatar(formData).then((newProfile) => {
                  Store.setItem('profile', newProfile);
                  this.init();
                  (form.parentNode!.parentNode! as HTMLElement).click();
                }).catch((requestError) => {
                  throw new Error(`Can't change user avatar, reason: ${requestError.reason ?? requestError}`)
                })
              })
            }
          }
        }
      }
    });




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
            const oldPasswordField = form.querySelector<HTMLInputElement>('input[name="old_password"]')!;
            const passwordField = form.querySelector<HTMLInputElement>('input[name="password"]')!;
            const confirmPasswordField = form.querySelector<HTMLInputElement>('input[name="confirm_password"]')!;
            if (Validation.comparePasswordFields(passwordField, confirmPasswordField, styles)) {
              this.profileAPI.setUserPassword({
                'oldPassword': oldPasswordField.value,
                'newPassword': passwordField.value, 
              } as UpdateProfilePasswordInterface).then(() => {
                this.props.router.go('/settings')
              }).catch((requestError) => {
                if (requestError.reason) {
                  Validation.setFormError(form, styles, requestError.reason);
                } else {
                  throw new Error(`Can't update user profile ${Store.getUserId()}, reason: ${requestError.toString()}`)
                }
              })
              }
            //
          } else if (this.props.mode === 'edit') {
            const formData:ProfileInterface = Object.fromEntries(new FormData(form));
            this.profileAPI.setUserProfile(formData as UpdateProfileInterface).then(() => {
              this.authAPI.getUserInfo()
              .then((profile) => {
                  Store.setItem('profile', profile);
                  this.props.router.go("/settings");
              })
              .catch((requestError) => {
                throw new Error(`Can't get user profile ${Store.getUserId()}, reason: ${requestError.reason ?? requestError}`)
              })
            }).catch((requestError) => {
              if (requestError.reason) {
                Validation.setFormError(form, styles, requestError.reason);
              } else {
                throw new Error(`Can't update user profile ${Store.getUserId()}, reason: ${requestError.reason ?? requestError}`)
              }
            })
            
          }
        }
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
