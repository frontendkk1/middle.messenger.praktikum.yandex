import { Block } from '~src/utils/block';
import { Router } from '~src/utils/router';
import leftNavigationButtonTemplate from './left-navigation-button.tmpl.pug';
import leftArrowImage from '~static/images/left-arrow.svg';

export class LeftNavigationButton extends Block {
    router: Router;

    constructor() {
        super('button');

        this.router = new Router('');
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'left-navigation-button',
        };
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return {
            click: (event) => {
                event.preventDefault();
                this.router.forward();
            },
        };
    }

    public render(): DocumentFragment {
        return this.compile(leftNavigationButtonTemplate, {leftArrowImage});
    }
}

export default LeftNavigationButton;
