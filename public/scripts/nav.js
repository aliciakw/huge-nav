const MAIN_NAV_LIST_ID = 'main-nav';
const MAIN_NAV_ITEM_CLASSNAME = 'nav-list-item';
const SUB_NAV_LIST_CLASSNAME = 'sub-nav';

var blanket = document.getElementById('blanket');
var mainNav = document.getElementById(MAIN_NAV_LIST_ID);
var mainNavList = mainNav.getElementsByTagName('ul')[0];
var navListItems = document.getElementsByClassName(MAIN_NAV_ITEM_CLASSNAME);

// Render Nav content from JSON file
function renderSubNavListItem({ label, url }) {;
    var li = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.href = url;
    var labelText = document.createTextNode(label);
    anchor.appendChild(labelText);
    li.appendChild(anchor);
    return li;
}
function renderNavListItem({ label, url, items }) {
    var li = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.className = MAIN_NAV_ITEM_CLASSNAME;
    anchor.href = url;
    var labelText = document.createTextNode(label);

    var subNavList = document.createElement('ul');
    subNavList.className = SUB_NAV_LIST_CLASSNAME;
    items.forEach((subNavItem) => {
        var rendered = renderSubNavListItem(subNavItem);
        subNavList.appendChild(rendered);
    });
  
    anchor.appendChild(labelText);
    li.appendChild(anchor);
    li.appendChild(subNavList);    
    mainNavList.appendChild(li);
}

function buildNavFromJson() {
    var navData = JSON.parse(this.responseText).items;
    console.log('>>>', navData[0]);
    navData.forEach(renderNavListItem);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", buildNavFromJson);
oReq.open("GET", "/api/nav.json");
oReq.send();



// Interacitivity
function showBlanket() {
    blanket.style.opacity = 0.4;
    blanket.style.height = '100%';
}
function hideBlanket() {
    blanket.style.opacity = 0;
    blanket.style.height = 0;
}
mainNav.addEventListener('mouseenter', () => showBlanket());
mainNav.addEventListener('mouseleave', () => hideBlanket());
for (var i = 0; i < navListItems.length; i++) {
    var navItem = navListItems[i];
    navItem.addEventListener('mouseenter', () => {
        //showBlanket();
    });
    navItem.addEventListener('mouseleave', () => {
        //hideBlanket();
    });
}
