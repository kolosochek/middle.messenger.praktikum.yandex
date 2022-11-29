import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ProfileFieldProps {
  mode?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  pattern?: string;
  errorMessage?: string;

  events?: {
    focus?: (e:FocusEvent) => void;
    blur?: (e:FocusEvent) => void;
  }
}

export class ProfileField extends Block<ProfileFieldProps> {
  constructor(props: ProfileFieldProps) {
    super({ ...props });
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
