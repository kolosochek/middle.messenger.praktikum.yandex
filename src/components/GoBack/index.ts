import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';
import { Router } from '../../utils/Router';

interface GoBackProps {
    router: Router;
    title: string;
    class?: string;
    events?: {
      click?: (e:MouseEvent) => void
    };
}

export class GoBack extends Block<GoBackProps> {
  constructor(props: GoBackProps) {
    super({ ...props, });

    this.props.events = {
      click: (e) => {
        e.preventDefault();
        this.props.router.goBack();
      }
    }
  }
  
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
