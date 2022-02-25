import { UserApi } from '~src/api/user.api';
import { Router } from '~src/utils/router';
import { validate, ValidationNames } from '~src/utils/validator';

interface UserSettingsFormModel {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

const userApi = new UserApi();

export class UserSettingsController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async changeProfile(data: UserSettingsFormModel) {
        try {
            const validateFirstName = validate(ValidationNames.NAME, data.first_name);
            const validateSecondName = validate(ValidationNames.NAME, data.second_name);
            const validateDisplayName = validate(ValidationNames.NAME, data.display_name);
            const validateLogin = validate(ValidationNames.LOGIN, data.login);
            const validateEmail = validate(ValidationNames.EMAIL, data.email);
            const validatePhone = validate(ValidationNames.PHONE, data.phone);
            const notValidMessages = [];

            if (!validateFirstName.isValid) notValidMessages.push(validateFirstName.message);
            if (!validateSecondName.isValid) notValidMessages.push(validateSecondName.message);
            if (!validateDisplayName.isValid) notValidMessages.push(validateDisplayName.message);
            if (!validateLogin.isValid) notValidMessages.push(validateLogin.message);
            if (!validateEmail.isValid) notValidMessages.push(validateEmail.message);
            if (!validatePhone.isValid) notValidMessages.push(validatePhone.message);

            if (notValidMessages.length) {
                throw new Error(notValidMessages);
            }

            const profileResponse = await userApi.profile(data);

            if (profileResponse.status !== 200) {
                throw new Error(profileResponse.response);
            }

            this.router.go('/user');
        } catch (e) {
            console.log(e)
        }
    }
}
