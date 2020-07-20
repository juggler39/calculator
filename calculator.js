let c = {};

c.input = '0';
c.screen = '0';
c.operator = '';
c.firstNumber = '0';
c.editable = true;
c.maxLength = 8;

c.add = (a, b) => a + b;
c.substract = (a, b) => a - b;
c.multiply = (a, b) => a * b;
c.divide = (a, b) => a / b;

c.inputDigit = (digit) => {
    if (!c.editable) {
        c.editable = true;
        c.input = '0';
    }
    if (c.input.replace(/\./, '').length < c.maxLength) {
        if (c.input === '0') {
            if (digit !== '0') {
                c.input = digit;
            }
        } else {
            c.input += digit;
        }
        c.screen = c.input;
    }
}

c.inputPoint = () => {
    c.editable = true;
    if (c.input ==='0') {
        c.input = '0.';
    } else if (c.input.indexOf('.') === -1) {
        c.input += '.';
    }
    c.screen = c.input;
}

c.inputOperator = (operator) => {
    if (c.firstNumber != '0') c.equals();
    c.operator = operator;
    c.firstNumber = c.input;
    c.input = '0';
}

c.operate =  (a, b, op) => {
    switch (op) {
        case '+': return c.add (a,b);
        case '-': return c.substract (a,b);
        case '*': return c.multiply (a, b);
        case '/': return c.divide (a, b);
        default: return 0;
    }
}

c.equals = () => {
    c.screen =  c.operate (+c.firstNumber, +c.input, c.operator);
    c.firstNumber = '0'
    c.input = '' + c.screen;
    c.editable = false;
}

c.inputAction = (action) => {
    switch(action) {
        case 'Enter':
            c.equals();
            break;
        case '%':
            c.input = +c.input*c.firstNumber/100;
            c.equals();
            break;
        case '+/-': 
            c.input = '' + (0 - c.input);
            c.screen = c.input;
            break;
        case 'Backspace':
            if (c.editable) c.input = c.input.slice(0, -1);
            c.screen = c.input;
            break;
    }
}

c.updateDisplay = () => {
    if (c.editable) {

        if (c.screen.toString().indexOf('.') === -1) {
            return c.screen + '.';
        } else {
            return c.screen;
        }

    } else {
        c.screen = '' + Number(c.screen).toPrecision(c.maxLength);
        return c.screen.replace(/(\.\d*?)0+$/, "$1");

    }
}