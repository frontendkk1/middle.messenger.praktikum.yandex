import { Block } from '~src/utils/block';
import '../index.scss';
import './user-settings.scss';
import '../../components/form/form.scss';
import '../../components/input/input.scss';
import '../../components/input-validator/input-validator.scss';
import '../../components/button/button.scss';
import registrationTemplate from './user-settings.tmpl.pug';
import ValidatedInput from '../../components/input-validator/input-validator';
import { Button } from '~src/components/button/button';
import { ValidationNames } from '~src/utils/validator';
import { UserSettingsController } from './user-settings.controller';
import { UserController } from '../user/user.controller';
import { connect } from '~src/utils/connect';

const withUser = connect(state => ({ user: state.user }));

export class UserSettings extends Block {
    userSettingsController;
    userController;

    constructor() {
        super('main');

        this.userSettingsController = new UserSettingsController();
        this.userController = new UserController();
    }

    protected getChildren(): Record<string, Block> {
        const emailField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.EMAIL,
            placeholder: 'Почта',
            name: 'email',
            type: 'email',
            classNames: 'input-field__input',
        });

        const loginField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.LOGIN,
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
            classNames: 'input-field__input',
        });

        const firstNameField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.NAME,
            placeholder: 'Имя',
            name: 'first_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const secondNameField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.NAME,
            placeholder: 'Фамилия',
            name: 'second_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const displayNameField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.NAME,
            placeholder: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const phoneField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.PHONE,
            placeholder: 'Телефон',
            name: 'phone',
            type: 'tel',
            classNames: 'input-field__input',
        });

        // const oldPasswordField = new ValidatedInput({
        //     isValid: false,
        //     validationName: ValidationNames.PASSWORD,
        //     placeholder: 'Пароль',
        //     name: 'oldPassword',
        //     type: 'password',
        //     classNames: 'input-field__input',
        // });
        //
        // const newPasswordField = new ValidatedInput({
        //     isValid: false,
        //     validationName: ValidationNames.PASSWORD,
        //     placeholder: 'Пароль',
        //     name: 'newPassword',
        //     type: 'password',
        //     classNames: 'input-field__input',
        // });

        const validatedInputList: ValidatedInput[] = [
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            displayNameField,
            phoneField,
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

                    this.userSettingsController.changeProfile({
                        first_name: firstNameField.value,
                        second_name: secondNameField.value,
                        display_name: displayNameField.value,
                        login: loginField.value,
                        email: emailField.value,
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
            displayNameField,
            phoneField,
            submitButton,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main',
        };
    }

    componentDidMount() {
        this.userController.getUser();
    }

    public render(): DocumentFragment {
        return this.compile(registrationTemplate);
    }
}

export default withUser(UserSettings);
