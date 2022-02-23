import { Router } from '~src/utils/router';
import { Login } from './login/login';
import { Registration } from './registration/registration';
import { NotFound } from './not-found/not-found';
import { ServerError } from './server-error/server-error';
import { UserSettings } from './user-settings/user-settings';
import { Chats } from './chats/chats';

const router = new Router('#app');

router
  .use('/', Login)
  .use('/login', Login)
  .use('/registration', Registration)
  .use('/chats', Chats)
  .use('/user-settings', UserSettings)
  .use('/server-error', ServerError)
  .use('*', NotFound)
  .start();
