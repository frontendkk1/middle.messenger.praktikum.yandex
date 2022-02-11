import registrationTemplate from './registration.tmpl.pug';
import buttonTemplate from '../../components/button/button.tmpl.pug';
import inputTemplate from '../../components/input/input.tmpl.pug';
import '../../index.scss';
import './registration.scss';
import '../../components/button/button.scss';
import '../../components/input/input.scss';
import '../../components/form/form.scss';

const app = document.getElementById('app');

const fields = [
    inputTemplate({ name: 'email', type: 'email', label: 'Почта' }),
    inputTemplate({ name: 'login', type: 'input', label: 'Логин' }),
    inputTemplate({ name: 'first_name', type: 'input', label: 'Имя' }),
    inputTemplate({ name: 'second_name', type: 'input', label: 'Фамилия' }),
    inputTemplate({ name: 'phone', type: 'input', label: 'Телефон' }),
    inputTemplate({ name: 'password', type: 'password', label: 'Пароль' }),
    buttonTemplate({ type: 'submit', text: 'Зарегистрироваться', classNames: 'blue' }),
    buttonTemplate({ type: 'button', text: 'Войти', href: '/pages/login', classNames: 'white' }),
];

app.innerHTML = registrationTemplate({ fields });