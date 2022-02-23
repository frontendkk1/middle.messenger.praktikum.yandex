import { LoginAPI } from './login.api';
import { Router } from '~src/utils/router';

interface LoginFormModel {
  email: string;
  password: string;
}

const loginApi = new LoginAPI();

export class LoginController {
  router;

  constructor() {
    this.router = new Router('');
  }

  public async login(data: LoginFormModel) {
    console.log('LoginController: data:', data)
    try {
      // Запускаем крутилку

      // const validateData = userLoginValidator(data);

      // if (!validateData.isCorrect) {
      //   throw new Error(validateData);
      // }

      const userID = loginApi.request(data);

      this.router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
}
