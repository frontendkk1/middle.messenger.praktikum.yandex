export enum MethodTypes {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

interface IOptions {
    headers?: Record<string, string>;
    method: MethodTypes;
    data?: Document | XMLHttpRequestBodyInit;
    timeout?: number;
}

type TOptionsWithoutMethod = Omit<IOptions, 'method'>;

function queryStringify(queryObj: Record<string, unknown>) {
    const keys = Object.keys(queryObj);
    return keys.reduce(
        (result, key, index) =>
            `${result}${key}=${queryObj[key]}${
                index < keys.length - 1 ? '&' : ''
            }`,
        '?'
    );
}

export class HTTPTransport {
    host: string;

    constructor(host = '') {
        this.host = host;
    }

    public get = (
        url: string,
        options: TOptionsWithoutMethod
    ): Promise<XMLHttpRequest> => {
        return this.request(
            url,
            { ...options, method: MethodTypes.GET },
            options?.timeout
        );
    };

    public put = (
        url: string,
        options: TOptionsWithoutMethod
    ): Promise<XMLHttpRequest> => {
        return this.request(
            url,
            { ...options, method: MethodTypes.PUT },
            options?.timeout
        );
    };

    public post = (
        url: string,
        options: TOptionsWithoutMethod
    ): Promise<XMLHttpRequest> => {
        return this.request(
            url,
            { ...options, method: MethodTypes.POST },
            options?.timeout
        );
    };

    public delete = (
        url: string,
        options: TOptionsWithoutMethod
    ): Promise<XMLHttpRequest> => {
        return this.request(
            url,
            { ...options, method: MethodTypes.DELETE },
            options?.timeout
        );
    };

    request = (
        url: string,
        options: IOptions = { method: MethodTypes.GET },
        timeout = 5000
    ): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === MethodTypes.GET;
            const fullUrl = `${this.host}${url}`;

            xhr.open(
                method,
                isGet && !!data ? `${fullUrl}${queryStringify(data)}` : fullUrl
            );

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
