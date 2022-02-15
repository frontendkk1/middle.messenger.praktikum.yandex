import { Block } from '../../utils/block';
import '../index.scss';
import './user-settings.scss';
import '../../components/form/form.scss';
import '../../components/input/input.scss';
import '../../components/input-validator/input-validator.scss';
import '../../components/button/button.scss';
import { Input } from '../../components/input/Input';
import registrationTemplate from './user-settings.tmpl.pug';
import ValidatedInput from '../../components/input-validator/input-validator';
import { Button } from '../../components/button/button';
import { VALIDATION_NAMES } from '../../utils/validator';

export class UserSettings extends Block {
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

        const oldPasswordField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.PASSWORD,
            placeholder: 'Пароль',
            name: 'oldPassword',
            type: 'password',
            classNames: 'input-field__input',
        });

        const newPasswordField = new ValidatedInput({
            isValid: false,
            validationName: VALIDATION_NAMES.PASSWORD,
            placeholder: 'Пароль',
            name: 'newPassword',
            type: 'password',
            classNames: 'input-field__input',
        });

        const validatedInputList: ValidatedInput[] = [
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            phoneField,
            oldPasswordField,
            newPasswordField,
        ];

        const submitButton = new Button({
            text: 'Сохранить',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();
                    validatedInputList.forEach((input) => {
                        input.validate();
                    });

                    // eslint-disable-next-line no-console
                    console.log('PROFILE_FORM DATA', {
                        email: emailField.value,
                        login: loginField.value,
                        firstName: firstNameField.value,
                        secondName: secondNameField.value,
                        phone: phoneField.value,
                    });
                },
            },
        });

        return {
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            phoneField,
            submitButton,
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

// import userSettingsTemplate from './user-settings.tmpl.pug';
// import buttonTemplate from '../../components/button/button.tmpl.pug';
// import inputTemplate from '../../components/input/input.tmpl.pug';
// import '../index.scss';
// import './user-settings.scss';
// import '../../components/button/button.scss';
// import '../../components/input/input.scss';
// import '../../components/form/form.scss';
//
// const app = document.getElementById('app');
//
// const fields = [
//     inputTemplate({ name: 'avatar', type: 'file', label: 'Аватар' }),
//     inputTemplate({ name: 'email', type: 'email', label: 'Почта' }),
//     inputTemplate({ name: 'login', type: 'input', label: 'Логин' }),
//     inputTemplate({ name: 'first_name', type: 'input', label: 'Имя' }),
//     inputTemplate({ name: 'second_name', type: 'input', label: 'Фамилия' }),
//     inputTemplate({ name: 'phone', type: 'input', label: 'Телефон' }),
//     inputTemplate({ name: 'oldPassword', type: 'password', label: 'Старый пароль' }),
//     inputTemplate({ name: 'newPassword', type: 'password', label: 'Новый пароль' }),
//
//     buttonTemplate({ type: 'submit', text: 'Сохранить', classNames: 'blue' }),
// ];
//
// app.innerHTML = userSettingsTemplate({ fields });