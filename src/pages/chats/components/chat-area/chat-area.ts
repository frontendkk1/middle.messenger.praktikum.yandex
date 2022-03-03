import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import { getQuery } from '~src/utils/get-query';
import singleModal from '~src/components/single-modal/single-modal';
import ChatUsersForm from '../chat-users-form/chat-users-form';
import MessagesList from '../messages-list/messages-list';
import MessagesForm from '../messages-form/messages-form';
import { ChatAreaController } from './chat-area.controller';
import chatAreaTemplate from './chat-area.tmpl.pug';
import hamburgerImage from '../../../../../static/images/hamburger.svg';
import './chat-area.scss';

const withStore = connect((state) => ({
    chats: state.chats,
    chatCommonReq: state.chatCommonReq,
}));

export class ChatArea extends Block {
    chatsAreaController;

    constructor() {
        super('div');

        this.chatsAreaController = new ChatAreaController();
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return {
            click: (event) => {
                if (
                    event.target.matches('.chat-menu__hamburger') ||
                    event.target.closest('.chat-menu__hamburger')
                ) {
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

    protected getChildren(): Record<string, Block> {
        const messagesList = new MessagesList();
        const messagesForm = new MessagesForm({
            events: {
                submit: (event) => {
                    event.preventDefault();
                    const input =
                        event.target.querySelector('[name="message"]');

                    const message = input.value;
                    input.value = '';

                    this.chatsAreaController.sendMessage({ message });
                },
            },
        });

        return {
            messagesList,
            messagesForm,
        };
    }

    public async componentDidMount() {
        const chatId = getQuery('chat_id')
            ? parseInt(getQuery('chat_id'), 10)
            : null;

        this.setState({ chatId });

        await this.chatsAreaController.getToken({ chatId });
        await this.chatsAreaController.initChat({ chatId });
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
