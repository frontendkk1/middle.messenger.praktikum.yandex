import registrationTemplate from './server-error.tmpl.pug';
import errorBlockTemplate from '../../components/error-block/error-block.tmpl.pug';
import '../../index.scss';
import './server-error.scss';
import '../../components/error-block/error-block.scss';

const app = document.getElementById('app');

const errorContent = errorBlockTemplate({
    title: '500',
    subtitle: 'Мы уже фиксим',
    linkHref: '/pages/chats',
    linkText: 'Назад к чатам',
});

app.innerHTML = registrationTemplate({ errorContent });