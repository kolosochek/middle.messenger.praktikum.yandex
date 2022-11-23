import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';


interface Error500ViewProps {
}


export class Error500View extends Block<Error500ViewProps> {
  constructor(context: any) {
    super(context);
  }

  init() {

  }



  render() {
    // debug
    //console.log(this.props);
    //
    return this.compile(template, { ...this.props, styles });
  }

}
