import store from '~src/utils/store';
import { ChatsApi } from '~src/api/chats.api';
import chats from '~src/pages/chats/chats';

const chatsApi = new ChatsApi();

export class ChatsListController {
    public async getChats() {
        console.log('ChatsListController: getChats:');
        try {
            store.set('chatsReq', { isLoading: true, errorMessage: '' });

            const chatsResponse = await chatsApi.getChats();

            store.set('chatsReq', { isLoading: false, errorMessage: '' });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            store.set('chats', chatsResponse.response);
        } catch (e) {
            console.error(e);
            store.set('getChatsReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }

    public async createChat(data) {
        console.log('ChatsListController: createChats:');
        try {
            store.set('createChatsReq', { isLoading: true, errorMessage: '' });

            const chatsResponse = await chatsApi.createChat(data);

            store.set('createChatsReq', { isLoading: false, errorMessage: '' });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            // store.set('chats', chatsResponse.response);
        } catch (e) {
            console.error(e);
            store.set('createChatsReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}