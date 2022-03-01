import { UserApi } from '~src/api/user.api';
import { ChatUsersApi } from '~src/api/chatUsers.api';
import { validate, ValidationNames } from '~src/utils/validator';
import store from '~src/utils/store';
import { getQuery } from '~src/utils/get-query';

const userApi = new UserApi();
const chatUsersApi = new ChatUsersApi();

export class ChatUsersFormController {
    public async addUser(data) {
        try {
            const validateLogin = validate(ValidationNames.MESSAGE, data.login);

            if (!validateLogin.isValid) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('addUserToChatReq', {
                isLoading: true,
                errorMessage: '',
            });

            const searchUserResponse = await userApi.search({
                login: data.login,
            });

            if (searchUserResponse.status !== 200) {
                throw new Error(
                    searchUserResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            if (!searchUserResponse.response.length) {
                throw new Error('Пользователь не найден');
            }

            const chatId = getQuery('chat_id');
            const addUserResponse = await chatUsersApi.addUsers({
                users: [searchUserResponse.response[0].id],
                chatId,
            });

            store.set('addUserToChatReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (addUserResponse.status !== 200) {
                throw new Error(
                    addUserResponse.response?.reason || 'Что-то пошло не так'
                );
            }
        } catch (e) {
            store.set('addUserToChatReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }

    public async deleteUser() {}
}
