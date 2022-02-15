import { Block } from '../../utils/block';
import { validate, VALIDATION_NAMES } from '../../utils/validator';
import { Input, IInputProps } from '../input/input';
import inputValidatorTemplate from './input-validator.tmpl.pug';

interface IValidatedInputProps extends IInputProps {
    isValid: boolean;
    validationName: VALIDATION_NAMES;
    validationMessage?: string;
    withoutValidationMessage?: boolean;
}

export default class ValidatedInput extends Block<IValidatedInputProps> {
    constructor(props: IValidatedInputProps) {
        super('label', props);
    }

    protected getChildren(): Record<string, Block<IInputProps>> {
        const loginField = new Input({
            ...this.props,
            events: {
                blur: this.validate.bind(this),
            },
        });

        return {
            loginField,
        };
    }

    protected getAttributes(): Record<string, string> {
        return ({
            class: 'input-field validated-input',
        });
    }

    public get value(): string {
        return this.children.loginField.value;
    }

    public validate(referenceValue?: string) {
        const { validationName, withoutValidationMessage } = this.props;
        const {
            isValid,
            message,
        } = validate(validationName, this.children.loginField.value, referenceValue);
        this.setProps({
            validationMessage: isValid || withoutValidationMessage ? '' : message,
        });
    }

    public render(): DocumentFragment {
        return this.compile(inputValidatorTemplate, {
            loginValidationMessage: this.props.validationMessage || '',
        });
    }
}
