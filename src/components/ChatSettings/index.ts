import Block from '../../utils/Block';
import template from './template';
import styles from './style.module.less';

interface ChatSettingsProps {
  
}

export class ChatSettings extends Block<ChatSettingsProps> {
  constructor(props: ChatSettingsProps) {
    super({ ...props });
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
