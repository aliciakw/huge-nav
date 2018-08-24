// Mock some essential html
var body = document.createElement('body');
var div = document.createElement('div');
div.id = 'blanket';
var nav = document.createElement('nav');
nav.id = 'main-nav';
nav.className = '';
var ul = document.createElement('ul');
var openButton = document.createElement('button');
openButton.id = 'nav-mobile-open';
var closeButton = document.createElement('button');
closeButton.id = 'nav-mobile-close';
var navLogo = document.createElement('img');
navLogo.id = 'nav-logo-desktop';
var navLogoAnchor = document.createElement('a');
navLogoAnchor.appendChild(navLogo);
nav.appendChild(ul);
body.appendChild(div);
body.appendChild(nav);
body.appendChild(openButton);
body.appendChild(closeButton);
body.appendChild(navLogoAnchor);
global.document.body = body

// Mock request
var navData = [
  {
    label: 'item 1',
    url: '/item1',
    items: []
  },
  {
    label: 'item 2',
    url: '/item2',
    items: [
      {
         label: 'item 2 subnav 1',
         url: '/item2/subnav1'
      },
      {
        label: 'item 2 subnav 2',
        url: '/item2/subnav2'
      }
    ]
  }
];
var mockNavJson = JSON.stringify({ items: navData });
var open = jest.fn();
var load = jest.fn();
var send = jest.fn(function() {
  this.load();
  return this;
});
var setRequestHeader = jest.fn();
window.XMLHttpRequest = jest.fn(() => ({
  open,
  send,
  load,
  setRequestHeader,
  addEventListener: jest.fn(),
  responseText: mockNavJson
}));
window.responseText = mockNavJson;


var {
  getBlanket,
  buildNavFromJson,
  renderNavListItem
} = require('../scripts/nav.js');

test('getting an element', () => {
  var blanket = getBlanket();
  expect(typeof blanket).toEqual('object');
});

test('renders nav from json', function() {
  buildNavFromJson();
  var navListItems = document.getElementsByClassName('nav-list-item');
  expect(navListItems).toHaveLength(navData.length);
  expect(
    navListItems[0].parentElement.getElementsByClassName('sub-nav')
  ).toHaveLength(1);
  expect(
    navListItems[0].parentElement.getElementsByClassName('sub-nav')[0].getElementsByTagName('li')
  ).toHaveLength(navData[0].items.length);
  expect(
    navListItems[1].parentElement.getElementsByClassName('sub-nav')
  ).toHaveLength(1);
  expect(
    navListItems[1].parentElement.getElementsByClassName('sub-nav')[0].getElementsByTagName('li')
  ).toHaveLength(navData[1].items.length);
});

test('opens mobile nav when hambuger button is clicked', () => {
  var mainNav = document.getElementById('main-nav');
  mainNav.className = 'hidden-mobile';
  expect(mainNav.className).toBe('hidden-mobile');
  openButton.click();
  expect(mainNav.className).toBe('');
});

test('closes mobile nav when close button is clicked', () => {
  var mainNav = document.getElementById('main-nav');
  mainNav.className = '';
  expect(mainNav.className).toBe('');
  closeButton.click();
  expect(mainNav.className).toBe('hidden-mobile');
});

test('opens mobile sub-nav when category is clicked', () => {
  var navCategoryLabel = document.getElementsByClassName('nav-list-item')[1];
  var subNav = navCategoryLabel.parentElement.getElementsByClassName('sub-nav')[0];
  expect(subNav.className).toContain('hidden');
  navCategoryLabel.click();
  expect(subNav.className).not.toContain('hidden');
});
