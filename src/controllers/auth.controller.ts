import { Router } from '~src/utils/router';
import { PagesPath } from '~src/utils/constants';
import store from '~src/utils/store';
import { AuthApi } from '~src/api/auth.api';

const loginApi = new AuthApi();

export class AuthController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async checkAuth() {
        try {
            const state = store.getState();

            if (state?.user) {
                return;
            }

            const userResponse = await loginApi.user();

            if (userResponse.status === 401) {
                this.router.go(PagesPath.LOGIN);
                return;
            }

            if (userResponse.status !== 200) {
                throw new Error(userResponse.response?.reason);
            }

            store.set('user', userResponse.response);
        } catch (e) {}
    }
}
