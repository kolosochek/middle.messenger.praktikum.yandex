import { describe, it } from "mocha";
import { expect, use } from "chai";
import chaiDom from "chai-dom"
import Block from "./Block";

describe('Block', () => {
    const block = new Block({});
    const wrapperClassName = `b-test-node`
    const handlebarsTrueClassName = `b-test-node-true-handlebars`
    const handlebarsFalseClassName = `b-test-node-false-handlebars`
    const template = `
        <div id="${wrapperClassName}">
            {{#if true}}<div id="${handlebarsTrueClassName}"></div>
            {{else}}<div id="${handlebarsFalseClassName}"></div>{{/if}}
        </div>`
    const blockDomNode = block.compile(template, {});
    use(chaiDom);


    it(`Block.render() returns DocumentFragment`, () => {
        expect(block.render()).to.be.instanceOf(DocumentFragment)
    })

    it(`Block.compile(template) can compile Handlebars templates`, () => {
        expect(blockDomNode.getElementById(`${wrapperClassName}`)).to.have.id(`${wrapperClassName}`)
        expect(blockDomNode.getElementById(`${handlebarsTrueClassName}`)).to.have.id(`${handlebarsTrueClassName}`)
        expect(blockDomNode.getElementById(`${handlebarsFalseClassName}`)).to.be.null
    })

})
