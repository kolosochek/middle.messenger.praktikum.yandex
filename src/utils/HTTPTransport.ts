enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: string;
    headers?: Record<string, string>;
    data?: Record<string, string>;
    timeout?: number;
};

class HTTPTransport {
    public queryStringify(data: Record<string, string>) {
        if (typeof data !== 'object') {
            throw new Error('Props data is not object');
        }

        let result = '?';

        Object.keys(data).forEach((key, i, arr) => {
            result += `${key}=${data[key]}`;
            if (arr.length > 1 && i !== arr.length - 1) {
                result += `&`;
            }
        });

        return result;
    }
    public get = (url: string, options: Options) => {
        let urlAddon = '';

        if (options.data) {
            urlAddon = this.queryStringify(options.data);
        }

        return this.request(`${url}${urlAddon}`, {
            ...options,
            method: Methods.GET,
        });
    };

    public post = (url: string, options: Options) => {
        return this.request(url, { ...options, method: Methods.POST });
    };

    public put = (url: string, options: Options) => {
        return this.request(url, { ...options, method: Methods.PUT });
    };

    public delete = (url: string, options: Options) => {
        return this.request(url, { ...options, method: Methods.DELETE });
    };

    private request = (url: string, options: Options) => {
        const { headers = {}, method } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (!method) {
                reject('Нет метода');
            }

            xhr.open(method, url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            if (options.timeout) {
                xhr.timeout = options.timeout;
            }

            xhr.onload = () => resolve(xhr);

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.send();
        });
    };
}

export default HTTPTransport;
