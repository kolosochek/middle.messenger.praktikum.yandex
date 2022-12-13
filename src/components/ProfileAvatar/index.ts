import Block from '../../utils/Block';
import { ProfileInterface } from '../../model/Store';
import template from './template';
import styles from './style.module.less';

interface ProfileAvatarProps { 
    profile: ProfileInterface,
    isCanChangeProfile: boolean;
    profileStyles?: Record<string, string>,
    events?: {
        click?: (e:MouseEvent) => void;
    }   
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  constructor(props: ProfileAvatarProps) {
    super({ ...props, });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
