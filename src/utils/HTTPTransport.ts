enum METHOD {
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
    public static getCookiesObject():object {
        return Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
    }

    get: HTTPMethod<Response> = (url, options = {}) => (
        this.request(url, {...options, method: METHOD.GET })
    )

    post: HTTPMethod<Response> = (url: string, data: {}) => {
        return this.request(url, { method: METHOD.POST, data });
    }

    put: HTTPMethod<Response> = (url: string, data: {}) => {
        return this.request(url, { method: METHOD.PUT, data });
    }

    delete: HTTPMethod<Response> = (url: string, data: {}) => {
        return this.request(url, { method: METHOD.DELETE, data });
    }

    request: HTTPMethod<Response> = (
        url: string,
        options: Options = { method: METHOD.GET },
    ) => {
        return new Promise((resolve, reject) => {
            const {method, data} = options;

            const xhr = new XMLHttpRequest();

            if (method === METHOD.GET) {
                if (data) {
                    url = `${url}?${Object.entries(data)
                        .map(([key, value]: [key: string, value: unknown]): string => {
                            return `${key}=${value}`;
                        })
                        .join('&')}`;
                }
            }

            xhr.open(method, this.baseUrl ? this.baseUrl + url : url);
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
                    // xhr.setRequestHeader("Content-Type", "multipart/form-data");
                    xhr.send(data);
                } else {
                    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    xhr.send(JSON.stringify(data));
                }

            }
        });
    }
}
