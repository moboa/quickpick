import { JSDOM } from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost'});

global.document = dom.window.document;
global.window = dom.window;

// Add window object properties to global scope.
Object.keys(global.window).forEach(key => {
    if (!(key in global)) {
        global[key] = global.window[key];
    }
});

chai.use(chaiImmutable);