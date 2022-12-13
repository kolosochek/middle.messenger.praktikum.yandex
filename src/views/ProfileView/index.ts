import Block from '../../utils/Block';
import { ShowModal } from '../../utils/ShowModal';
import { Router } from '../../utils/Router';
import { Store } from '../../model/Store';
import { AuthAPI } from '../../utils/AuthAPI';
import { ProfileAPI } from '../../utils/ProfileAPI';
import { UpdateProfileInterface, ProfileInterface, UpdateProfilePasswordInterface } from '../../model/Store';
import { InputComponent } from '../../components/InputComponent';
import { Validation } from '../../utils/Validation';
import { GoBack } from '../../components/GoBack';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import template from './template';
import styles from './style.module.less';


interface ProfileViewProps {
  mode: "view" | "edit" | "change-password";
  router: Router;
  profile?: ProfileInterface;
  userId?: number|string;
  isCanChangeProfile: boolean;

  events?: {
    submit: (e: SubmitEvent) => void;
  };
}


export class ProfileView extends Block<ProfileViewProps> {
  public profileAPI:ProfileAPI;
  public authAPI:AuthAPI;


  public createProfileFields(profile:ProfileInterface):void {
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
      value: profile.display_name,
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


  init() {
    this.props.profile = Store.getItem('profile') as ProfileInterface;
    this.profileAPI = new ProfileAPI();
    this.authAPI = new AuthAPI();
    // modal
    ShowModal.bindToWindow();    

    
    // get View mode and switch it
    const viewMode = this.props.mode as ProfileViewProps['mode'];
    switch (viewMode) {
      case 'view': {
        if (this.props.userId) {
          this.profileAPI.getUserProfileById(this.props.userId).then((data)=> {
            this.createProfileFields(data as ProfileInterface)
            this.setProps({
              profile: data as ProfileInterface
            })
            this.children.profileAvatar.setProps({
              profile: data as ProfileInterface
            })
          }).catch((requestError) => {
            throw new Error(`Can't get user by id ${this.props.userId}, reason: ${requestError.reason ?? requestError}`)
          })
        } else {
          this.props.isCanChangeProfile = true;
          this.createProfileFields(this.props.profile)
        }
        break;
      }
      case 'edit': {
        this.props.isCanChangeProfile = true;
        //ProfileFieldEmail
        this.children.profileFieldEmail = new InputComponent({
          name: 'email',
          label: 'Email:',
          placeholder: this.props.profile.email,
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
          placeholder: this.props.profile.second_name,
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
          placeholder: this.props.profile.display_name,
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
    // goback button
    this.children.goBack = new GoBack({ 
      router: this.props.router,
      class: styles['b-profile-goback'],
      title: 'Back'
    });

    // profile avatar
    this.children.profileAvatar = new ProfileAvatar({ 
      profile: this.props.profile,
      isCanChangeProfile: this.props.isCanChangeProfile,
      profileStyles: styles,
      events: {
        click: (e:MouseEvent) => {
          const link:HTMLLIElement = e.target!.closest("a");
          if(link !== null) {
            const form:HTMLFormElement = document.querySelector('form#upload_avatar')!;
            if (form !== null) {
              form.addEventListener('submit', (e:SubmitEvent) => {
                e.preventDefault();
                const formData = new FormData(form);
                this.profileAPI.changeUserAvatar(formData).then((newProfile) => {
                  Store.setItem('profile', newProfile);
                  this.init();
                  form.parentNode!.parentNode!.click();
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
