import userSettingsTemplate from './user-settings.tmpl.pug';
import buttonTemplate from '../../components/button/button.tmpl.pug';
import inputTemplate from '../../components/input/input.tmpl.pug';
import '../../index.scss';
import './user-settings.scss';
import '../../components/button/button.scss';
import '../../components/input/input.scss';
import '../../components/form/form.scss';

const app = document.getElementById('app');

const fields = [
    inputTemplate({ name: 'avatar', type: 'file', label: 'Аватар' }),
    inputTemplate({ name: 'email', type: 'email', label: 'Почта' }),
    inputTemplate({ name: 'login', type: 'input', label: 'Логин' }),
    inputTemplate({ name: 'first_name', type: 'input', label: 'Имя' }),
    inputTemplate({ name: 'second_name', type: 'input', label: 'Фамилия' }),
    inputTemplate({ name: 'phone', type: 'input', label: 'Телефон' }),
    inputTemplate({ name: 'oldPassword', type: 'password', label: 'Старый пароль' }),
    inputTemplate({ name: 'newPassword', type: 'password', label: 'Новый пароль' }),

    buttonTemplate({ type: 'submit', text: 'Сохранить', classNames: 'blue' }),
];

app.innerHTML = userSettingsTemplate({ fields });