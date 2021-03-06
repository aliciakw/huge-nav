var HIDDEN_CLASSNAME = 'hidden';
var HIDDEN_MOBILE_CLASSNAME = 'hidden-mobile';
var VISIBLE_MOBILE_CLASSNAME = 'visible-mobile';
var FLIP_CLASSNAME = 'flip';
var CARET_CLASSNAME = 'caret' + ' ' + VISIBLE_MOBILE_CLASSNAME;
var MAIN_NAV_LIST_ID = 'main-nav';
var MAIN_NAV_ITEM_CLASSNAME = 'nav-list-item';
var SUB_NAV_LIST_CLASSNAME = 'sub-nav';
var HIDDEN_SUB_NAV_LIST_CLASSNAME = SUB_NAV_LIST_CLASSNAME + ' ' + HIDDEN_CLASSNAME;

var blanket = document.getElementById('blanket');
var mainNav = document.getElementById(MAIN_NAV_LIST_ID);
var mainNavList = mainNav.getElementsByTagName('ul')[0];
var openMobileNavButton = document.getElementById('nav-mobile-open');
var closeMobileNavButton = document.getElementById('nav-mobile-close');
var navLogo = document.getElementById('nav-logo-desktop');

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
    var carets = element.getElementsByClassName(CARET_CLASSNAME);
    if (carets.length) {
        carets[0].className = CARET_CLASSNAME + ' ' + FLIP_CLASSNAME;
    }
}
function hideSubNav(event) {
    var element = event.currentTarget;
    var selectedSubnav = element.getElementsByClassName(SUB_NAV_LIST_CLASSNAME)[0];
    selectedSubnav.className = HIDDEN_SUB_NAV_LIST_CLASSNAME;
}
function openMobileNav() {
    showBlanket();
    mainNav.className = '';
    openMobileNavButton.className = HIDDEN_CLASSNAME;
    closeMobileNavButton.className = VISIBLE_MOBILE_CLASSNAME;
    navLogo.parentElement.className = '';
}
function closeMobileNav() {
    hideBlanket();
    mainNav.className = HIDDEN_MOBILE_CLASSNAME;
    openMobileNavButton.className = VISIBLE_MOBILE_CLASSNAME;
    closeMobileNavButton.className = HIDDEN_CLASSNAME;
    navLogo.parentElement.className = HIDDEN_MOBILE_CLASSNAME;
}
function toggleMobileNav() {
    var mobileNavIsOpen = mainNav.getAttribute('class').includes(HIDDEN_MOBILE_CLASSNAME);
    if (mobileNavIsOpen) {
        openMobileNav()
    } else {
        closeMobileNav();
    }
}
function toggleMobileSubNav(event) {
    var navSection = event.currentTarget.parentElement;
    var currentSubNav = navSection.getElementsByClassName(SUB_NAV_LIST_CLASSNAME)[0];
    var subNavIsClosed = currentSubNav.getAttribute('class').includes(HIDDEN_CLASSNAME);
    var carets = navSection.getElementsByClassName(CARET_CLASSNAME);
    if (subNavIsClosed) {
        currentSubNav.className = SUB_NAV_LIST_CLASSNAME;
        if (carets.length) {
            carets[0].className = CARET_CLASSNAME + ' ' + FLIP_CLASSNAME;
        }
    } else {
        currentSubNav.className = HIDDEN_SUB_NAV_LIST_CLASSNAME;
        if (carets.length) {
            carets[0].className = CARET_CLASSNAME;
        }
    }
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
        caret.className = CARET_CLASSNAME;
        anchor.appendChild(caret);
        anchor.addEventListener('click', toggleMobileSubNav);
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
    var res = this.responseText;
    if (res) {
        var navData = JSON.parse(res).items;
        navData.forEach(renderNavListItem);
    }
}

// Render Nav content from JSON file
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", buildNavFromJson);
oReq.open("GET", "/api/nav.json");
oReq.send();


mainNav.addEventListener('mouseenter', showBlanket);
mainNav.addEventListener('mouseleave', hideBlanket);
openMobileNavButton.addEventListener('click', toggleMobileNav);
closeMobileNavButton.addEventListener('click', toggleMobileNav);

function getBlanket() {
    return document.getElementById('blanket');
}

if (typeof exports == "undefined") {
    exports = this;
} else {
    module.exports = {
        getBlanket,
        buildNavFromJson,
        openMobileNav,
        closeMobileNav,
        toggleMobileNav,
        renderNavListItem
    };
}

