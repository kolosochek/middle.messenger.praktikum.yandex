import { describe, it } from "mocha";
import { expect } from "chai";
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { HTTPTransport, METHOD } from "./HTTPTransport";


describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];


    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        global.XMLHttpRequest = xhr;
        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });
        instance = new HTTPTransport();
    });

    afterEach(() => {
        requests.length = 0;
    })

    // get
    it(`HTTPTransport.get() returns get request`, () => {
        instance.get('/');
        const [request] = requests;
        expect(request.method).to.eq(METHOD.GET);
    });

    // post
    it(`HTTPTransport.post() returns post request`, () => {
        instance.post('/', {});
        const [request] = requests;
        expect(request.method).to.eq(METHOD.POST);
    });

    // put
    it(`HTTPTransport.put() returns put request`, () => {
        instance.put('/', {});
        const [request] = requests;
        expect(request.method).to.eq(METHOD.PUT);
    });

    // delete
    it(`HTTPTransport.delete() returns delete request`, () => {
        instance.delete('/', {});
        const [request] = requests;
        expect(request.method).to.eq(METHOD.DELETE);
    });

})
