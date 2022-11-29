const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data:object) {
if (typeof data !== 'object') {
        throw new Error('Data must be object');
}

// Здесь достаточно и [object Object] для объекта
const keys = Object.keys(data);
return keys.reduce((result, key, index) => {
return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
}, '?');
}

class HTTPTransport {
    get = (url:string, options = {}) => {
             
            return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url:string, options = {}) => {
            return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url:string, options = {}) => {
            return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url:string, options = {}) => { 
            return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url:string, options = {}, timeout = 5000) => {
            const {headers = {}, method:string, data:object}:Promise = options;

            return new Promise(function(resolve, reject) {
                    if (!method) {
                            reject('No method');
                            return;
                    }

                const xhr = new XMLHttpRequest();
                    const isGet = method === METHODS.GET;

                xhr.open(
                            method, 
                            isGet && !!data
                                    ? `${url}${queryStringify(data)}`
                                    : url,
                    );

                    Object.keys(headers).forEach(key => {
                            xhr.setRequestHeader(key, headers[key]);
                    });
            
                xhr.onload = function() {
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
