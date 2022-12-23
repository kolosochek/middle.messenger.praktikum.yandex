import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import template from './template';
import styles from './style.module.less';


export interface ErrorViewProps {
  mode: 'error404' | 'error500';
  router: Router;

  events?: {
    click?: (e: MouseEvent) => void;
  }
}


export class ErrorView extends Block<ErrorViewProps> {
  init() {
    const mode = this.props.mode;
    //Maybe we'll want to pass custom props by given mode 
    switch (mode) {
      case 'error500': {
        break;
      }
      case 'error404': {
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
