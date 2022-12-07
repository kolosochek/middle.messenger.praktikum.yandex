import Block from '../../utils/Block';
import { Router } from '../../utils/Router';
import template from './template';
import styles from './style.module.less';


interface ErrorViewProps {
  mode?: 'error404' | 'error500';

  events?: {
    click?: (e: MouseEvent) => void;
  }
}


export class ErrorView extends Block<ErrorViewProps> {
  init() {
    this.props.events = {
      click: (e) => {
        if (e.target !== null) {
          const node = e.target.closest("a");
          if (node !== null) {
            e.preventDefault();
            Router.goBack();
          }
        }

      }
    }
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
