import { describe, it } from "mocha";
import { expect } from "chai";
import { Router, RouteI } from "./Router";
import sinon from "sinon"
import Block from "./Block";
describe('Router', () => {
    interface BlockConstructable<P = any> {
        new(props: P): Block<P>;
    }
    const router = new Router()
    const sinionFake = sinon.fake.returns(document.createElement('div'));
    const BlockMock = class {
        getContent = sinionFake;
        dispatchComponentDidMount = function(){return;}
    } as unknown as BlockConstructable;

    it(`Router._parseLocation() return a string and it's not empty`, () => {
        expect(router._parseLocation()).to.be.a('string').to.be.not.null;
    })

    it(`Router.useRoute() can push new Route:RouteI[]`, () => {
        router.useRoute({ path: '/', view: BlockMock as RouteI['view'], isAuthorizationRequired: false });
        expect(router.routesArray.length).to.eq(1);
    })

    it(`Router.renderRoute() renders a View`, () => {
        router.useRoute({ path: '/', view: BlockMock as RouteI['view'], isAuthorizationRequired: false });
        router.renderRoute()
        expect(sinionFake.callCount).to.eq(1);
    })
})


