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
    response: { reason?: string };
}

interface ISearchRequest {
    login: string;
}

interface ISearchResponse {
    status: number;
    response:
        | {
              id: number;
              first_name: string;
              second_name: string;
              display_name: string;
              login: string;
              email: string;
              phone: string;
              avatar: string;
          }[]
        | { reason: string };
}

export interface IPasswordRequest {
    oldPassword: string;
    newPassword: string;
}

interface IPasswordResponse {
    status: number;
    response: string | { reason: string };
}

export class UserApi extends BaseAPI {
    public profile(user: IProfileRequest) {
        return userAPIInstance
            .put('/profile', {
                data: user,
                headers: { 'content-type': 'application/json' },
            })
            .then(
                (req): IProfileResponse => ({
                    status: req.status,
                    response: req.response,
                })
            );
    }

    public search(data: ISearchRequest) {
        return userAPIInstance
            .post('/search', {
                data,
                headers: { 'content-type': 'application/json' },
            })
            .then(
                (req): ISearchResponse => ({
                    status: req.status,
                    response: req.response,
                })
            );
    }

    public password(data: IPasswordRequest) {
        return userAPIInstance
            .put('/password', {
                data,
                headers: { 'content-type': 'application/json' },
            })
            .then(
                (req): IPasswordResponse => ({
                    status: req.status,
                    response: req.response,
                })
            );
    }
}
