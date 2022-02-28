import { Block } from '~src/utils/block';
import { Button } from '~src/components/button/button';
import { Modal } from '~src/components/modal/modal';
import { connect } from '~src/utils/connect';
import chatsListTemplate from './chats-list.tmpl.pug';
import { ChatsListController } from './chats-list.controller';
import CreateChatForm from '../create-chat-form/create-chat-form';
import './chats-list.scss';

const withChats = connect((state) => ({ chats: state.chats }));

export class ChatsList extends Block {
    chatsController;

    constructor() {
        super('div');

        this.chatsController = new ChatsListController();
    }

    protected getChildren(): Record<string, Block> {
        const createChatModal = new Modal({
            contentBlock: new CreateChatForm(),
        });

        const createChatButton = new Button({
            text: 'Создать чат',
            className: 'blue create-chat-button',
            events: {
                click: (event) => {
                    event.preventDefault();

                    createChatModal.show();
                },
            },
        });

        return {
            createChatButton,
            createChatModal,
        };
    }

    componentDidMount() {
        this.chatsController.getChats();
        this.children.createChatModal.hide();
    }

    public render(): DocumentFragment {
        const { chats } = this.props;

        return this.compile(chatsListTemplate, { chats });
    }
}

export default withChats(ChatsList);
