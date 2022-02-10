import notFoundTemplate from './not-found.tmpl.pug';
import errorBlockTemplate from '../../components/error-block/error-block.tmpl.pug';
import '../../index.scss';
import './not-found.scss';
import '../../components/error-block/error-block.scss';

const app = document.getElementById('app');

const errorContent = errorBlockTemplate({
    title: '404',
    subtitle: 'Не туда попали',
    linkHref: '/pages/chats',
    linkText: 'Назад к чатам',
});

app.innerHTML = notFoundTemplate({ errorContent });