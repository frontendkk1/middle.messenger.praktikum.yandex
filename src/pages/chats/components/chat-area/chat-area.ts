import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import { ChatAreaController } from './chat-area.controller';
import chatAreaTemplate from './chat-area.tmpl.pug';
import hamburgerImage from '../../../../../static/images/hamburger.svg';
import './chat-area.scss';

const withStore = connect((state) => ({
    chats: state.chats,
    chatCommonReq: state.chatCommonReq,
}));

export class ChatArea extends Block {
    chatsAreaControler;

    constructor() {
        super('div');

        this.chatsAreaControler = new ChatAreaController();
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'chat-wrapper',
        };
    }

    componentDidMount() {
        //
        // this.chatsAreaControler.getChatCommon({ chatId });
    }

    public render(): DocumentFragment {
        const query = new URLSearchParams(document.location.search);
        const chatId = parseInt(query.get('chat_id'), 10);
        const chat = this.props?.chats.find(({ id }) => id === chatId) || {};

        return this.compile(chatAreaTemplate, { chat, hamburgerImage });
    }
}

export default withStore(ChatArea);
