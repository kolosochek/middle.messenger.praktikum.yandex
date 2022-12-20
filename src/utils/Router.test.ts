import { describe, it } from "mocha";
import { expect } from "chai";
import {Router} from "./Router";
describe('Router', () => {
    const router = new Router()

    it(`gets current path from window.location.pathname, returns path `, function(){
        expect(router._parseLocation()).not.to.be.empty;
    })
})


