import Block from '../../utils/Block';
import template from './template';
import {RouteI, Router} from '../../utils/Router';
import styles from './style.module.less';

interface LinkProps {
    router: Router;
    title?: string;
    href?: string;
    class?: string;
    events?: {
      click?: (e:MouseEvent) => void
    };
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({ ...props, });

    this.props.events = {
      click: (e) => {
        e.preventDefault();
        if (this.props.href){
          this.props.router.go(this.props.href as RouteI['path'])
        } else {
          this.props.router.goBack()
        }
      }
    }
  }
  
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
