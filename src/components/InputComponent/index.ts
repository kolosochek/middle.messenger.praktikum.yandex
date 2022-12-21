import { Validation } from '../../utils/Validation';
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
    tabindex?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    styles?: Record<string, string>
  
    events?: {
      focus?: (e:FocusEvent) => void;
      blur?: (e:FocusEvent) => void;
    };
}

export class InputComponent extends Block<InputComponentProps> {
  constructor(props: InputComponentProps) {
    super({ ...props, });
    
    this.props.events = {
      focus: (e) => Validation.validateField(e, (this.props.styles as Record<string, string>)),
      blur: (e) => Validation.validateField(e, (this.props.styles as Record<string, string>)),
    }
  }


  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
