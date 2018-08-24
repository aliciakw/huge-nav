var MAIN_NAV_LIST_ID = 'main-nav';
var MAIN_NAV_ITEM_CLASSNAME = 'nav-list-item';
var SUB_NAV_LIST_CLASSNAME = 'sub-nav';
var HIDDEN_SUB_NAV_LIST_CLASSNAME = 'sub-nav hidden';
var CARET_DOWN_CLASSNAMES = 'caret caret-down';
var CARET_UP_CLASSNAMES = 'caret caret-up';

var blanket = document.getElementById('blanket');
var mainNav = document.getElementById(MAIN_NAV_LIST_ID);
var mainNavList = mainNav.getElementsByTagName('ul')[0];
var navListItems = document.getElementsByClassName(MAIN_NAV_ITEM_CLASSNAME);

// Animation Helpers
function showBlanket() {
    blanket.style.opacity = 0.4;
    blanket.style.height = '100%';
}
function hideBlanket() {
    blanket.style.opacity = 0;
    blanket.style.height = 0;
}
function showSubNav(event) {
    var element = event.currentTarget;
    var selectedSubnav = element.getElementsByClassName(SUB_NAV_LIST_CLASSNAME)[0];
    selectedSubnav.className = SUB_NAV_LIST_CLASSNAME;
}
function hideSubNav(event) {
    var element = event.currentTarget;
    var selectedSubnav = element.getElementsByClassName(SUB_NAV_LIST_CLASSNAME)[0];
    selectedSubnav.className = HIDDEN_SUB_NAV_LIST_CLASSNAME;
}

// Rendering helpers
function renderSubNavListItem({ label, url }) {;
    var li = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.href = url;
    var labelText = document.createTextNode(label);
    anchor.appendChild(labelText);
    li.appendChild(anchor);
    return li;
}
function renderNavListItem({ label, url, items = [] }) {
    var li = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.className = MAIN_NAV_ITEM_CLASSNAME;
    anchor.href = url;
    var labelText = document.createTextNode(label);
    var subNavList = document.createElement('ul');

    if (items.length) {
        var caret = document.createElement('img');
        caret.src = "images/caret.svg";
        caret.className = 'right';
        anchor.appendChild(caret);
    }
    subNavList.className = HIDDEN_SUB_NAV_LIST_CLASSNAME;
    items.forEach((subNavItem) => {
        subNavList.appendChild(renderSubNavListItem(subNavItem));
    });
    
  
    anchor.appendChild(labelText);
    li.appendChild(anchor);
    li.appendChild(subNavList);
    li.addEventListener('mouseenter', showSubNav);
    li.addEventListener('mouseleave', hideSubNav);    
    mainNavList.appendChild(li);
}

function buildNavFromJson() {
    var navData = JSON.parse(this.responseText).items;
    navData.forEach(renderNavListItem);
}

// Render Nav content from JSON file
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", buildNavFromJson);
oReq.open("GET", "/api/nav.json");
oReq.send();

mainNav.addEventListener('mouseenter', showBlanket);
mainNav.addEventListener('mouseleave', hideBlanket);
