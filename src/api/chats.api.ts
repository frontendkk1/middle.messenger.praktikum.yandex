import { BaseAPI } from '~src/utils/base-api';
import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';
import { IBadRequest } from './types';

const chatsAPIInstance = new HTTP(`${API_HOST}/chats`);

interface IGetChatsRequest {
    offset?: number;
    limit?: number;
    title?: string;
}
interface IGetChatsResponse {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}
export interface ICreateChatsRequest {
    title: string;
}
interface IDeleteChatsRequest {
    chatId: number;
}
interface IDeleteChatsResponse {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
    };
}

export class ChatsApi extends BaseAPI {
    public getChats(data?: IGetChatsRequest) {
        return chatsAPIInstance
            .get<IGetChatsRequest, IGetChatsResponse[]>('', {
                data,
                headers: { 'content-type': 'application/json' },
            })
            .then((req) => ({ status: req.status, response: req.response }));
    }

    public createChat(data: ICreateChatsRequest) {
        return chatsAPIInstance
            .post<ICreateChatsRequest, string | IBadRequest>('', {
                data,
                headers: { 'content-type': 'application/json' },
            })
            .then((req) => ({ status: req.status, response: req.response }));
    }

    public deleteChat(data: IDeleteChatsRequest) {
        return chatsAPIInstance
            .delete<IDeleteChatsRequest, IDeleteChatsResponse>('', {
                data,
                headers: { 'content-type': 'application/json' },
            })
            .then((req) => ({ status: req.status, response: req.response }));
    }
}