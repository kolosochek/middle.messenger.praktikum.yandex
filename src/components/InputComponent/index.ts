import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface InputComponentProps {
    label?: string;
    name?: string;
    type?: "text" | "password" | "email" | "tel" |"number" | "file";
    placeholder?: string;
    class?: string;
    value?: string;
    pattern?: string;
    isValid?: string;
    defaultErrorMessage?: string;
    errorMessage?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
  
    events?: {
      focus?: (e:FocusEvent) => void;
      blur?: (e:FocusEvent) => void;
    };
}

export class InputComponent extends Block<InputComponentProps> {
  constructor(props: InputComponentProps) {
    super({ ...props, });
  }


  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
