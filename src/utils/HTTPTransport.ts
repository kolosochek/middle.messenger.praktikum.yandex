export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method?: METHOD;
    data?: unknown;
};

type HTTPMethod<TResponse> = (url: string, options?: Options) => Promise<TResponse>

export class HTTPTransport {
    public baseUrl = 'https://ya-praktikum.tech/api/v2';


    public queryStringify(data: Record<string, string>) {
        return "?" + Object
         .entries(data)
         .map(([key, value]) => `${key}=${value}`)
         .join("&")
        }

    public static getCookiesObject():object {
        return Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
    }

    public get: HTTPMethod<Response> = (url, options = {}) => {
        return this.request(url, {...options, method: METHOD.GET, data: options.data ? this.queryStringify(options.data as Record<string, string>) : {} })
    }

    public post: HTTPMethod<Response> = (url, options = {}) => {
        return this.request(url, {...options, method: METHOD.POST, data: options.data });
    }

    public put: HTTPMethod<Response> = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHOD.PUT, data: options.data });
    }

    public delete: HTTPMethod<Response> = (url: string, options = {}) => {
        return this.request(url, {...options, method: METHOD.DELETE, data: options.data });
    }

    public request: HTTPMethod<Response> = (
        url: string,
        options: Options = { method: METHOD.GET },
    ) => {
        return new Promise((resolve, reject) => {
            const {method, data} = options;
            const xhr = new XMLHttpRequest();

            xhr.open(method!, this.baseUrl ? this.baseUrl + url : url);
            xhr.withCredentials = true;

            xhr.onload = function () {
                let resp;
                if (~xhr?.getResponseHeader('Content-Type')?.indexOf('application/json')!) {
                    resp = JSON.parse(xhr.response)
                } else {
                    resp = xhr.response;
                }
                if (xhr.status === 200) {
                    resolve(resp);

                } else {
                    reject(resp);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                if (data instanceof FormData) {
                    xhr.send(data);
                } else {
                    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    xhr.send(JSON.stringify(data));
                }

            }
        });
    }
}
