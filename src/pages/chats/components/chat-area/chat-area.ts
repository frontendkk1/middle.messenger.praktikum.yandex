import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import { getQuery } from '~src/utils/get-query';
import { SingleModal } from '~src/components/single-modal/single-modal';
import { ChatUsersForm } from '../chat-users-form/chat-users-form';
import { ChatAreaController } from './chat-area.controller';
import chatAreaTemplate from './chat-area.tmpl.pug';
import hamburgerImage from '../../../../../static/images/hamburger.svg';
import './chat-area.scss';

const singleModal = new SingleModal();

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

    protected getEvents(): Record<string, (e: Event) => void> {
        return {
            click: (event) => {
                event.preventDefault();
                if (event.target.matches('.chat-menu__hamburger')) {
                    singleModal.show(new ChatUsersForm());
                }
            },
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'chat-wrapper',
        };
    }

    public componentDidMount() {
        const chatId = getQuery('chat_id')
            ? parseInt(getQuery('chat_id'), 10)
            : null;

        this.setState({ chatId });
    }

    public render(): DocumentFragment {
        const chat =
            this.props?.chats && this.state?.chatId
                ? this.props.chats.find(({ id }) => id === this.state.chatId)
                : null;

        return this.compile(chatAreaTemplate, { chat, hamburgerImage });
    }
}

export default withStore(ChatArea);
