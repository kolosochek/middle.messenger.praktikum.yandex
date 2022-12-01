import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';


interface ErrorViewProps {
  mode?: 'Error404' | 'Error500';
}


export class ErrorView extends Block<ErrorViewProps> {
  init() {
    const mode = this.props.mode;
    //Maybe we'll want to pass custom props by given mode 
    switch (mode) {
      case 'Error500': {
        break;
      }
      case 'Error404': {
        break;
      }
      default: {

        break;
      }

    }
  }



  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
