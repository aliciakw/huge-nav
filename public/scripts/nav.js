var blanket = document.getElementById('blanket');
function showBlanket() {
    blanket.style.opacity = 0.4;
    blanket.style.height = '100%';
}
function hideBlanket() {
    blanket.style.opacity = 0;
    blanket.style.height = 0;
}

var navListItems = document.getElementsByClassName('nav-list-item');
for (var i = 0; i < navListItems.length; i++) {
    var navItem = navListItems[i];
    navItem.addEventListener('mouseenter', () => {
        showBlanket();
    });
    navItem.addEventListener('mouseleave', () => {
        hideBlanket();
    });
}