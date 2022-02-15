import { Block } from '../../utils/block';
import { ChatsList } from './components/chats-list/chats-list';
import { MessagesList } from './components/messages-list/messages-list';
import chatsTemplate from './chats.tmpl.pug';
import '../index.scss';
import './chats.scss';
import './components/chats-list/chats-list.scss';
import './components/messages-list/messages-list.scss';
import fileImage from '../../../static/images/file.svg';
import sendImage from '../../../static/images/send.svg';
import hamburgerImage from '../../../static/images/hamburger.svg';
import arrowImage from '../../../static/images/arrow.svg';

export class Chats extends Block {
    constructor() {
        super('div');

        this.setState({ activeChatId: null });
    }

    protected getChildren(): Record<string, Block> {
        const chatsList = new ChatsList();
        const messagesList = new MessagesList();

        return {
            chatsList,
            messagesList,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'chats-wrapper',
        };
    }

    public render(): DocumentFragment {
        return this.compile(chatsTemplate, { hamburgerImage, sendImage, fileImage, arrowImage });
    }
}



//
// import chatsTemplate from './chats.tmpl.pug';
// import imageTemplate from '../../components/image/image.tmpl.pug'
// import messagesListTemplate from './components/messages-list/messages-list.tmpl.pug'
// import chatsListTemplate from './components/chats-list/chats-list.tmpl.pug'
// import '../index.scss';
// import './chats.scss';
// import './components/messages-list/messages-list.scss';
// import './components/chats-list/chats-list.scss';
// import fileImage from '../../../static/images/file.svg';
// import sendImage from '../../../static/images/send.svg';
// import hamburgerImage from '../../../static/images/hamburger.svg';
// import arrowImage from '../../../static/images/arrow.svg';
// import cameraImage from '../../../static/images/camera.png';
//
// const app = document.getElementById('app');
//
// const messages = [
//     {
//         type: 'date',
//         content: '19 июня',
//     },
//     {
//         type: 'text',
//         time: '11:56',
//         content: '<p> Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p> <p> Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>',
//     },
//     {
//         type: 'img',
//         time: '11:58',
//         content: imageTemplate({ width: '316', height: '211', src: cameraImage }),
//     },
//     {
//         type: 'me',
//         time: '12:00',
//         content: 'Круто!',
//     },
// ];
//
// const chats = [
//     {
//         name: 'Андрей',
//         time: '10:49',
//         message: 'Изображение',
//         count: '2',
//         isMe: false,
//     },
//     {
//         name: 'Киноклуб',
//         time: '10:49',
//         message: 'стикер',
//         count: '',
//         isMe: true,
//     },
// ];
//
// const chatStore = {
//     messagesList: messagesListTemplate({ messages }),
//     chatsList: chatsListTemplate({ chats }),
//     fileImage,
//     sendImage,
//     hamburgerImage,
//     arrowImage,
// };
//
// app.innerHTML = chatsTemplate(chatStore);
