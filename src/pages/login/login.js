import loginTemplate from './login.tmpl.pug';
import buttonTemplate from '../../components/button/button.tmpl.pug';
import inputTemplate from '../../components/input/input.tmpl.pug';
import '../../index.scss';
import './login.scss';
import '../../components/button/button.scss';
import '../../components/input/input.scss';
import '../../components/form/form.scss';

const app = document.getElementById('app');

const fields = [
    inputTemplate({ name: 'login', type: 'input', label: 'Логин', classNames: '' }),
    inputTemplate({ name: 'password', type: 'password', label: 'Пароль' }),
    buttonTemplate({ type: 'submit', text: 'Войти', href: '/pages/chats', classNames: 'blue' }),
    buttonTemplate({ type: 'button', text: 'Зарегистрироваться', href: '/pages/registration', classNames: 'white' }),
];

app.innerHTML = loginTemplate({ fields });