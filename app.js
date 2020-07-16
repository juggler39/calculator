const buttons = document.querySelectorAll('.button');
const screen = document.querySelector(".screen");

buttons.forEach(button => button.addEventListener('click', function(e) {
    screen.innerHTML = button.innerHTML;
}));

window.addEventListener('keydown', parseKey);

function parseKey(e) {

    let button = document.getElementById(e.key);
    if (button != null) {
        button.click();
        button.focus();
    }
}