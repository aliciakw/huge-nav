// Mock some essential html
var body = document.createElement('body');
var div = document.createElement('div');
div.id = 'blanket';
var nav = document.createElement('nav');
nav.id = 'main-nav';
var ul = document.createElement('ul');
var openButton = document.createElement('button');
openButton.id = 'nav-mobile-open';
var closeButton = document.createElement('button');
closeButton.id = 'nav-mobile-close';
nav.appendChild(ul);
body.appendChild(div);
body.appendChild(nav);
body.appendChild(openButton);
body.appendChild(closeButton);
global.document.body = body

// Mock request
var open = jest.fn();
var send = jest.fn();
var setRequestHeader = jest.fn();
window.XMLHttpRequest = jest.fn(() => ({
  open,
  send,
  setRequestHeader,
  addEventListener: jest.fn()
}));


var { sum, getBlanket, buildNavFromJson } = require('../scripts/nav.js');

test('a regular js function', () => {
  expect(sum(1, 2)).toBe(3);
});
test('getting an element', () => {
  var blanket = getBlanket();
  expect(typeof blanket).toEqual('object');
});
test('makes request to for nav json', () => {
  expect(open).toBeCalledWith('GET', '/api/nav.json');
  expect(send).toBeCalled();
});
