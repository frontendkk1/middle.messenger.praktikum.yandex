import { Block } from '~src/utils/block';
import { Button } from '~src/components/button/button';
import ValidatedInput from '~src/components/input-validator/input-validator';
import { connect } from '~src/utils/connect';
import { ValidationNames } from '~src/utils/validator';
import { ChatUsersFormController } from './chat-users-form.controller';
import chatUsersFormTemplate from './chat-users-form.tmpl.pug';
import './chat-users-form.scss';

export enum Views {
    MENU = 'menu',
    ADD = 'add',
    DELETE = 'delete',
}

const withStore = connect((state) => ({
    addUserToChatReq: { ...state.addUserToChatReq },
}));

export class ChatUsersForm extends Block<{ chatId: number; view: string }> {
    chatUsersFormController;

    constructor() {
        super('div');

        this.setState({ view: Views.MENU });

        this.chatUsersFormController = new ChatUsersFormController();
    }

    protected getChildren(): Record<string, Block> {
        const addUserButton = new Button({
            className: 'white',
            text: 'Добавить пользователя',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.setState({ view: Views.ADD });
                },
            },
        });

        const removeUserButton = new Button({
            className: 'white',
            text: 'Удалить пользователя',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.setState({ view: Views.DELETE });
                },
            },
        });

        const backButton = new Button({
            className: 'white',
            text: 'Назад',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.setState({ view: Views.MENU });
                },
            },
        });

        const loginField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.MESSAGE,
            placeholder: 'Логин',
            name: 'title',
            type: 'text',
            classNames: 'input-field__input',
        });

        const submitAddButton = new Button({
            text: 'Добавить',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();

                    this.chatUsersFormController.addUser({
                        login: loginField.value,
                        chatId: this.props.chatId,
                    });
                },
            },
        });

        const submitDeleteButton = new Button({
            text: 'Удалить',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();
                },
            },
        });

        return {
            backButton,
            loginField,
            submitAddButton,
            submitDeleteButton,
            addUserButton,
            removeUserButton,
        };
    }

    public render() {
        return this.compile(chatUsersFormTemplate, { view: this.state?.view });
    }
}

export default withStore(ChatUsersForm);
