import { Router } from '~src/utils/router';
import Login from './login/login';
import Registration from './registration/registration';
import { NotFound } from './not-found/not-found';
import { ServerError } from './server-error/server-error';
import User from './user/user';
import UserSettings from './user-settings/user-settings';
import Chats from './chats/chats';
import { Tooltip } from '~src/components/tooltip/tooltip';

const tooltip = new Tooltip();
tooltip.attachClick(document.body);

const router = new Router('#app');

router
    .use('/', Login)
    .use('/login', Login)
    .use('/registration', Registration)
    .use('/messenger', Chats)
    .use('/user', User)
    .use('/user-settings', UserSettings)
    .use('/server-error', ServerError)
    .use('*', NotFound)
    .start();
