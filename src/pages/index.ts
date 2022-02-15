import { Login } from './login/login';
import { Registration } from './registration/registration';
import { NotFound } from './not-found/not-found';
import { ServerError } from './server-error/server-error';
import { UserSettings } from './user-settings/user-settings';
import { Chats } from './chats/chats';
import { render } from '../utils/render';

const loginPage = new Login();
const registrationPage = new Registration();
const notFoundPage = new NotFound();
const serverErrorPage = new ServerError();
const userSettingsPage = new UserSettings();
const chatsPage = new Chats();
const QUERY = '#app';

switch (document.location.pathname) {
    case '/':
    case '/login':
        render(QUERY, loginPage);
        break;
    case '/registration':
        render(QUERY, registrationPage);
        break;
    case '/chats':
        render(QUERY, chatsPage);
        break;
    case '/user-settings':
        render(QUERY, userSettingsPage);
        break;
    case '/server-error':
        render(QUERY, serverErrorPage);
        break;
    default:
        render(QUERY, notFoundPage);
}
