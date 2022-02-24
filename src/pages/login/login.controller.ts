import { LoginAPI } from './login.api';
import { Router } from '~src/utils/router';
import { validate, ValidationNames } from '~src/utils/validator';

interface LoginFormModel {
    login: string;
    password: string;
}

const loginApi = new LoginAPI();

export class LoginController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async login(data: LoginFormModel) {
        console.log('LoginController: data:', data);
        try {
            // Запускаем крутилку

            const validateLogin = validate(ValidationNames.LOGIN, data.login);
            const validatePassword = validate(
                ValidationNames.PASSWORD,
                data.password
            );

            console.log(validateLogin);

            if (!validateLogin.isValid) {
                throw new Error(validateLogin);
            }

            if (!validatePassword.isValid) {
                throw new Error(validatePassword);
            }

            const userID = loginApi.request(data);

            this.router.go('/chats');

            // Останавливаем крутилку
        } catch (error) {
            // Логика обработки ошибок
        }
    }
}
