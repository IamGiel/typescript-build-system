// setupTests.js
import { JSDOM } from 'jsdom';
import { TextEncoder, TextDecoder } from 'text-encoding';

const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
