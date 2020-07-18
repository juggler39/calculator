'use strict';
const buttons = document.querySelectorAll('.button');
const screen = document.querySelector('.screen');


let c = {};
c.output = '';
c.screen = '0';
c.operator = '';
c.firstNumber = '';

c.add = (a, b) => a + b;
c.substract = (a, b) => a - b;
c.multiply = (a, b) => a * b;
c.divide = (a, b) => a / b;
c.operate = (operator, a, b) => operator(a, b);




c.inputDigit = (digit) => {
    c.output = c.output + digit;
    c.screen = c.output;
},

c.inputOperator = (operator) => {
    c.firstNumber = c.output;
    c.operator = operator;
    c.screen = c.output;
    c.output = '';
    
};


c.inputAction = (action) => {
    switch(action) {
        case 'Enter':
            c.screen = c.operate(c.operator, +c.firstNumber, +c.output);
            c.firstNumber = '';
            c.output = '';
    }
};
c.getScreen = () => c.screen;






buttons.forEach(button => button.addEventListener('click', function(e) {
    if (button.classList.contains('number')) {
        c.inputDigit(button.id);
    } else if (button.classList.contains('operator')) {
        c.inputOperator(button.id);
    } else (c.inputAction(button.id));
    
    screen.innerHTML = c.getScreen();
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