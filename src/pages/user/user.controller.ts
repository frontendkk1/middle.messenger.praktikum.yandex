import { AuthApi } from '~src/api/auth.api';
import { Router } from '~src/utils/router';
import store from '~src/utils/store';

const loginApi = new AuthApi();

export class UserController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async getUser() {
        console.log('UserController: getUser:');
        try {
            const userResponse = await loginApi.user();

            if (userResponse.status === 401) {
                this.router.go('/login');
                return;
            }

            if (userResponse.status !== 200) {
                throw new Error(userResponse.response?.reason);
            }

            store.set('user', userResponse.response);
        } catch (e) {
            console.error(e);
        }
    }

    public async logout() {
        try {
            const logoutResponse = await loginApi.logout();

            if (logoutResponse.status !== 200) {
                throw new Error(logoutResponse.response.reason);
            }

            this.router.go('/login');
        } catch (e) {
            console.error(e);
        }
    }
}
