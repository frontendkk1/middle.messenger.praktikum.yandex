import { EventBus } from './event-bus';
import { set } from './set';

export enum StoreEvents {
    Updated = 'updated',
}

type Indexed<T = any> = {
    [key in string]: T;
};

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        console.log('Store: getState:', this.state);
        return this.state;
    }

    public set(path: string, value: unknown) {
        console.log('Store: set:', value);
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    }
}

export default new Store();
