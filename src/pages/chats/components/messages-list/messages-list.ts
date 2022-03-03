import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import messagesListTemplate from './messages-list.tmpl.pug';
import './messages-list.scss';

const withMessages = connect((state) => ({
    messages: state.messages || [],
}));

class MessagesList extends Block {
    constructor() {
        super('div');
    }

    public render(): DocumentFragment {
        return this.compile(messagesListTemplate, this.props);
    }
}

export default withMessages(MessagesList);
