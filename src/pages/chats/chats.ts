import { Block } from '~src/utils/block';
import ChatsList from './components/chats-list/chats-list';
import { MessagesList } from './components/messages-list/messages-list';
import ChatArea from './components/chat-area/chat-area';
import chatsTemplate from './chats.tmpl.pug';
import '../index.scss';
import './chats.scss';
import './components/messages-list/messages-list.scss';
import fileImage from '../../../static/images/file.svg';
import sendImage from '../../../static/images/send.svg';
import arrowImage from '../../../static/images/arrow.svg';

export class Chats extends Block {
    constructor() {
        super('div');

        this.setState({ activeChatId: null });
    }

    protected getChildren(): Record<string, Block> {
        const chatsList = new ChatsList();
        const messagesList = new MessagesList();
        const chatArea = new ChatArea();

        return {
            chatsList,
            chatArea,
            messagesList,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'chats-wrapper',
        };
    }

    public render(): DocumentFragment {
        return this.compile(chatsTemplate, {
            sendImage,
            fileImage,
            arrowImage,
        });
    }
}

export default Chats;
