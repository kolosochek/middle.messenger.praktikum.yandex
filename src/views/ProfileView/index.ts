import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';
import { User } from '../../model/user';
import { ProfileField } from '../../components/ProfileField';


interface ProfileViewProps {
  mode: string;
  profile?: object;
}


export class ProfileView extends Block<ProfileViewProps> {
  constructor(context: any) {
    super(context);
  }


  init() {
    const viewMode = this.props.mode;
    // console.log('profile view mode');
    // console.log(mode);
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
        });

        //ProfileFieldFirstName
        this.children.profileFieldFirstName = new ProfileField({
          mode: viewMode,
          name: 'first_name',
          label: 'First name:',
          value: this.props.profile.first_name,
        });

        //ProfileFieldSecondName
        this.children.profileFieldSecondName = new ProfileField({
          mode: viewMode,
          name: 'second_name',
          label: 'Last name:',
          value: this.props.profile.last_name,
        });

        //ProfileFieldLogin
        this.children.profileFieldLogin = new ProfileField({
          mode: viewMode,
          name: 'login',
          label: 'Login:',
          value: this.props.profile.login,
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
        });

        break;
      }
      case 'change-password': {
        this.props.profile = User.getUserProfile();

        //ProfileFieldOldPassword
        this.children.profileFieldOldPassword = new ProfileField({
          mode: viewMode,
          name: 'oldPassword',
          label: 'Old password:',
          type: 'password',
          value: '**********',
        });

        //ProfileFieldNewPassword
        this.children.profileFieldNewPassword = new ProfileField({
          mode: viewMode,
          name: 'newPassword',
          label: 'New password:',
          type: 'password',
          value: '**********',
        });

        //ProfileFieldNewPassword
        this.children.profileFieldConfirmPassword = new ProfileField({
          mode: viewMode,
          name: 'confirmPassword',
          label: 'Confirm new password:',
          type: 'password',
          value: '**********',
        });
        break;
      }
      case 'get-by-id': {
        this.props.profile = User.getUserProfileById();

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
      default: {
        this.props.profile = User.getUserProfile();
        break;
      }
    }

  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
