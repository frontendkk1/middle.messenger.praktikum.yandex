import store from '~src/utils/store';
import { ChatsApi } from '~src/api/chats.api';
import { ChatUsersApi, IChatUsersRequest } from '~src/api/chatUsers.api';

const chatsApi = new ChatsApi();
const chatUsersApi = new ChatUsersApi();

export class ChatAreaController {
    public async getChatCommon({ chatId }) {
        try {
            store.set('chatCommonReq', { isLoading: true, errorMessage: '' });

            const chatsResponse = await chatsApi.getChatCommon({ id: chatId });

            store.set('chatCommonReq', { isLoading: false, errorMessage: '' });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            store.set('chatCommon', chatsResponse.response);
        } catch (e) {
            console.error(e);
            store.set('chatCommonReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }

    public async addUsers(data: IChatUsersRequest) {
        try {
            store.set('addUsersInChatReq', {
                isLoading: true,
                errorMessage: '',
            });

            const chatsResponse = await chatUsersApi.addUsers(data);

            store.set('addUsersInChatReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }
        } catch (e) {
            console.error(e);
            store.set('addUsersInChatReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
