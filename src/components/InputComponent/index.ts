import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface InputComponentProps {
    title?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    pattern?: string;
    required?: string;
    isValid?: string;
    nowrap?: string;
    defaultErrorMessage?: string;
    errorMessage?: string;
  
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
