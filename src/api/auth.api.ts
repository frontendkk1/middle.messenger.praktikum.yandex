import { BaseAPI } from '~src/utils/base-api';
import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';

const authAPIInstance = new HTTP(`${API_HOST}/auth`);

interface LoginRequest {
    login: string;
    password: string;
}

interface LoginResponse {}

interface UserRequest {}

interface UserResponse {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

interface ISignupRequest {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}
interface ISignupResponse {}

export class AuthApi extends BaseAPI {
    public signin(user: LoginRequest) {
        return authAPIInstance
            .post<LoginRequest, LoginResponse>('/signin', {
                data: JSON.stringify(user),
                headers: { 'content-type': 'application/json' },
            })
            .then((req) => ({ status: req.status, response: req.response }));
    }

    public signup(user: ISignupRequest) {
        return authAPIInstance
            .post<ISignupRequest, ISignupResponse>('/signup', {
                data: JSON.stringify(user),
                headers: { 'content-type': 'application/json' },
            })
            .then((req) => ({ status: req.status, response: req.response }));
    }

    public user() {
        return authAPIInstance
            .get<UserRequest, UserResponse>('/user')
            .then((req) => {
                return { status: req.status, response: req.response };
            });
    }

    public logout() {
        return authAPIInstance.post('/logout').then((req) => {
            return { status: req.status, response: req.response };
        });
    }
}
