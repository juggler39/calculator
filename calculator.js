let c = {};

c.input = '';
c.screen = '0';
c.operator = '';
c.firstNumber = '';
c.resultFlag = false;
c.maxLength = 8;

c.inputDigit = (digit) => {
    if (c.resultFlag) {
        c.resultFlag = false;
        c.input = '';
    }
    if (c.input.replace(/\./, '').length < c.maxLength) {
        if (!(digit ==='0' && c.input === '')) {
            c.input = c.input + digit;
            c.screen = c.input;
        } else {
            c.input = '0';
        }
    }
}

c.inputPoint = () => {
    c.resultFlag = false;
    if (c.input ==='') {
        c.input = '0.';
    } else if (c.input.indexOf('.') === -1) {
        c.input += '.';
    }
    c.screen = c.input;
}

c.inputOperator = (operator) => {
    c.operator = operator;
    if (c.firstNumber) c.equals();
    c.firstNumber = c.input;
    c.input = '';
}

c.operate =  (a, b, op) => {
    switch (op) {
        case '+': return c.add (a,b);
        case '-': return c.substract (a,b);
        case '*': return c.multiply (a, b);
        case '/': return c.divide (a, b);
    }
}

c.add = (a, b) => a + b;
c.substract = (a, b) => a - b;
c.multiply = (a, b) => a * b;
c.divide = (a, b) => a / b;

c.equals = () => {
    c.screen =  c.operate (+c.firstNumber, +c.input, c.operator);
    c.firstNumber = ''
    c.input = '' + c.screen;
    c.resultFlag = true;
}

c.inputAction = (action) => {
    switch(action) {
        case 'Enter':
            c.equals();
    }
}

c.updateDisplay = () => {
    if (c.resultFlag) {
       c.screen = '' + Number(c.screen).toPrecision(c.maxLength);
       return c.screen.replace(/(\.\d*?)0+$/, "$1");
    } else {
        if (c.screen.toString().indexOf('.') === -1) {
            return c.screen + '.';
        } else {
            return c.screen;
        }
    }
}