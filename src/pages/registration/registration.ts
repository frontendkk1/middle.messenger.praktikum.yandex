import { Block } from '../../utils/block';
import '../index.scss';
import './registration.scss';
import '../../components/form/form.scss';
import '../../components/input/input.scss';
import '../../components/input-validator/input-validator.scss';
import '../../components/button/button.scss';
import { Input } from '../../components/input/Input';
import registrationTemplate from './registration.tmpl.pug';
import ValidatedInput from '../../components/input-validator/input-validator';
import { Button } from '../../components/button/button';
import { VALIDATION_NAMES } from '../../utils/validator';

interface ILoginProps {
    loginField: Input;
    passwordField: Input;
}

export class Registration extends Block<ILoginProps> {
    constructor() {
        super('main');
    }

    protected getChildren(): Record<string, Block> {
        const emailField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.EMAIL,
            placeholder: 'Почта',
            name: 'email',
            type: 'email',
            classNames: 'input-field__input',
        });

        const loginField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.LOGIN,
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
            classNames: 'input-field__input',
        });


        const firstNameField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.NAME,
            placeholder: 'Имя',
            name: 'first_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const secondNameField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.NAME,
            placeholder: 'Фамилия',
            name: 'second_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const phoneField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.PHONE,
            placeholder: 'Телефон',
            name: 'phone',
            type: 'tel',
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

        const validatedInputList: ValidatedInput[] = [
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            phoneField,
            passwordField,
        ];

        const submitButton = new Button({
            text: 'Зарегистрироваться',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();
                    validatedInputList.forEach((child) => {
                        child.validate();
                    });

                    // eslint-disable-next-line no-console
                    console.log('REGISTRATION_FORM DATA', {
                        email: emailField.value,
                        login: loginField.value,
                        firstName: firstNameField.value,
                        secondName: secondNameField.value,
                        phone: phoneField.value,
                        password: passwordField.value,
                    });
                },
            },
        });

        const loginButton = new Button({
            text: 'Войти',
            className: 'white',
            href: '/login',
        });

        return {
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            phoneField,
            passwordField,
            submitButton,
            loginButton,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main',
        };
    }

    public render(): DocumentFragment {
        return this.compile(registrationTemplate);
    }
}
