import { Block } from '../../utils/block';
import '../index.scss';
import './login.scss';
import '../../components/form/form.scss';
import '../../components/input/input.scss';
import '../../components/input-validator/input-validator.scss';
import '../../components/button/button.scss';
import { Input } from '../../components/input/Input';
import loginTemplate from './login.tmpl.pug';
import ValidatedInput from '../../components/input-validator/input-validator';
import { Button } from '../../components/button/button';
import { VALIDATION_NAMES } from '../../utils/validator';

interface ILoginProps {
    loginField: Input;
    passwordField: Input;
}

export class Login extends Block<ILoginProps> {
    constructor() {
        super('main');
    }

    protected getChildren(): Record<string, Block> {
        const loginField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.LOGIN,
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
            classNames: 'input-field__input',
        });

        const passwordField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.PASSWORD,
            placeholder: 'Пароль',
            name: 'password',
            type: 'password',
            classNames: 'input-field__input',
        });

        const submitButton = new Button({
            text: 'Войти',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();
                    loginField.validate();
                    passwordField.validate();

                    // eslint-disable-next-line no-console
                    console.log('LOGIN_FORM DATA', {
                        login: loginField.value,
                        password: passwordField.value,
                    });
                },
            },
        });

        const registrationButton = new Button({
            text: 'Зарегистрироваться',
            className: 'white',
            href: '/registration',
        });

        return {
            loginField,
            passwordField,
            submitButton,
            registrationButton,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main',
        };
    }

    public render(): DocumentFragment {
        return this.compile(loginTemplate);
    }
}