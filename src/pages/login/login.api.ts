import { BaseAPI } from '~src/utils/base-api';
import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';

const authAPIInstance = new HTTP(`${API_HOST}/auth`);

interface LoginRequest {
    login: string;
    password: string;
}

interface LoginResponse {}

export class LoginAPI extends BaseAPI {
    public request(user: LoginRequest) {
        return authAPIInstance
            .post<LoginRequest, LoginResponse>('/signin', {
                data: user,
                headers: { 'content-type': 'application/json' },
            })
            .then(({ user_id }) => user_id); // Обрабатываем получение данных из сервиса далее
    }
}
