import store from '~src/utils/store';
import { API_WS_HOST } from '~src/utils/constants';
import { ChatsApi } from '~src/api/chats.api';
import { ChatUsersApi, IChatUsersRequest } from '~src/api/chatUsers.api';

const chatsApi = new ChatsApi();
const chatUsersApi = new ChatUsersApi();

export class ChatAreaController {
    socket;

    public async initChat({ chatId }) {
        try {
            const state = store.getState();
            console.log(
                `${API_WS_HOST}/chats/${state.user.id}/${chatId}/${state.chatsToken[chatId].token}`
            );
            if (!chatId || !state?.user || !state.chatsToken[chatId]?.token) {
                return;
            }

            this.socket = new WebSocket(
                `${API_WS_HOST}/chats/${state.user.id}/${chatId}/${state.chatsToken[chatId].token}`
            );

            this.socket.addEventListener('open', () => {
                this.socket.send(
                    JSON.stringify({
                        content: '0',
                        type: 'get old',
                    })
                );
            });

            this.socket.addEventListener('message', (event) => {
                const messages = JSON.parse(event.data);

                store.set(
                    'messages',
                    Array.isArray(messages)
                        ? messages
                        : [messages].concat(store.getState().messages)
                );
            });
        } catch (e) {}
    }

    public sendMessage({ message }) {
        this.socket.send(
            JSON.stringify({
                content: message,
                type: 'message',
            })
        );
    }

    public async getToken({ chatId }) {
        try {
            const state = store.getState();

            if (state?.chatsToken && state.chatsToken[chatId]?.token) {
                return;
            }

            const tokenResponse = await chatsApi.getToken({ id: chatId });

            store.set('chatsToken', { [chatId]: tokenResponse.response });
        } catch (e) {}
    }

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
