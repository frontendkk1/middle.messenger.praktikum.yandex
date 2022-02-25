import { BaseAPI } from '~src/utils/base-api';
import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';

const userAPIInstance = new HTTP(`${API_HOST}/user`);

interface IProfileRequest {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

interface IProfileResponse {
    status: number;
    response: {reason?: string;}
}

export class UserApi extends BaseAPI {
    public profile(user: IProfileRequest) {
        return userAPIInstance
            .put('/profile', {
                data: user,
                headers: { 'content-type': 'application/json' },
            })
            .then((req): IProfileResponse => ({ status: req.status, response: req.response }));
    }
}
