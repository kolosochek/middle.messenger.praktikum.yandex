import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';


interface Error404ViewProps {
}


export class Error404View extends Block<Error404ViewProps> {
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
