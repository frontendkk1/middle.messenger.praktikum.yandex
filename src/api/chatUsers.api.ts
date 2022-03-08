import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';
import { BaseAPI } from '~src/utils/base-api';

export interface IChatUsersRequest {
    users: number[];
    chatId: number;
}
interface IChatUsersResponse {}

const chatUsersAPIInstance = new HTTP(`${API_HOST}/chats/users`);

export class ChatUsersApi extends BaseAPI {
    public addUsers(data: IChatUsersRequest) {
        return chatUsersAPIInstance
            .put<IChatUsersRequest, IChatUsersResponse>('', {
                data,
            })
            .then((req) => ({ status: req.status, response: req.response }));
    }

    public deleteUsers(data: IChatUsersRequest) {
        return chatUsersAPIInstance
            .delete<IChatUsersRequest, IChatUsersResponse>('', {
                data,
            })
            .then((req) => ({ status: req.status, response: req.response }));
    }
}
