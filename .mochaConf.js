const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');

const { window } = new JSDOM('<div id="root"></div>', {
    url: 'http://localhost:3000'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;


require.extensions['.less'] = function (module) {
    // можно оставить пустым, или сделать module.exports = {}
}