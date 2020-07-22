'use strict';
const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('.screen');

buttons.forEach(button => button.addEventListener('click', function(e) {
    if (button.classList.contains('number')) {
        c.inputDigit(button.id);
    } else if (button.classList.contains('separator')) {
        c.inputPoint(button.id);
    } else if (button.classList.contains('operator')) {
        c.inputOperator(button.id);
    } else (c.inputAction(button.id));
    
    screen.innerHTML = c.updateDisplay();
}));

window.addEventListener('keydown', parseKey);

function parseKey(e) {

    let button = document.getElementById(e.key);
    if (button != null) {
        button.focus();
        button.classList.add("active");
        button.onanimationend = () => {
            button.classList.remove("active");
          };
        button.click();
    }
}

if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register')
  } else {
    navigator.serviceWorker.register('sw.js', {
      scope: './'
    }).then(function(reg) {
      console.log('Service worker has been registered for scope:'+ reg.scope);
    });
  }