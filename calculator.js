let c = {};

c.input = '0';
c.screen = '0';
c.operator = '';
c.firstNumber = '0';
c.editable = true;
c.maxLength = 8;
c.memory = 0;
c.error = false;
c.previousKey = '';
c.previousNumber = 0;

c.add = (a, b) => a + b;
c.substract = (a, b) => a - b;
c.multiply = (a, b) => a * b;
c.divide = (a, b) => a / b;

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
    c.firstNumber = '0';
    c.input = c.screen;
    c.editable = false;
}

c.updateDisplay = () => {
    if (c.editable) {
        if (c.screen.toString().indexOf('.') === -1) {
            return c.screen + '.';
        } else {
            return c.screen;
        }
    } else {
        if (Math.abs(c.screen) >= 10 ** c.maxLength) {
            c.error = true;
            c.screen = c.screen/(10 ** c.maxLength);
            if (Math.abs(c.screen) === Infinity) c.screen = 0;
            c.input = c.screen;
            return c.screen.toPrecision(c.maxLength);
        } else {
            c.screen = Number(c.screen).toPrecision(c.maxLength);
            if (Math.abs(c.screen) < 1) {
                c.screen = '' + Number(c.screen).toFixed(c.maxLength-1);
            }
            return c.screen.toString().replace(/(\.\d*?)0+$/, "$1");
        }
    }
}

c.inputDigit = (digit) => {
    if (!c.editable) {
        c.editable = true;
        c.input = '0';
    }
    if (c.input.replace(/[.-]/g, '').length < c.maxLength) {
        if (c.input.replace(/-/, '') === '0') {
            if (digit !== '0') {
                if (c.input[0] === '-') {
                    c.input = '-' + digit;
                } else {
                    c.input = digit;
                }
            }
        } else {
            c.input += digit;
        }
        c.screen = c.input;
    }
    c.previousKey = digit;
}

c.inputPoint = () => {
    if (!c.editable) {
        c.editable = true;
        c.input = '0';
    }
    if (c.input ==='0') {
        c.input = '0.';
    } else if (c.input.indexOf('.') === -1) {
        c.input += '.';
    }
}

c.inputOperator = (operator) => {
    
    if (c.previousKey === 'operator') {
        c.operator = operator;
        c.firstNumber = c.previousNumber;
        c.input = '0';
    } else {
        if (c.firstNumber != '0') c.equals();
        c.operator = operator;
        c.previousNumber = c.input;
        c.firstNumber = c.input;
        c.input = '0';
    }
    c.previousKey = 'operator';
}

c.inputAction = (action) => {
    switch(action) {
        case 'Enter':
            if (c.previousKey === 'Enter') c.firstNumber = c.previousNumber;
            c.equals();
            break;
        case '%':
            c.editable = false;
            if (c.firstNumber != '0') {
                c.input = +c.input * c.firstNumber / 100;
            } else {
                c.input = +c.input / 100;
            }
            c.screen = c.input;
            break;
        case '+/-':
            c.input = c.input[0]==='-'?c.input.slice(1):'-' + c.input;
            c.screen = c.input;
            break;
        case 'Backspace':
            if (c.editable) c.input = c.input.slice(0, -1)||'0';
            c.screen = c.input;
            break;
        case '.':
            c.inputPoint();
            c.screen = c.input;
            break;
        case 'M+':
            c.editable = false;
            if (c.firstNumber != '0') c.equals();
            c.memory = c.memory + c.input;
            break;
        case 'M-':
            c.editable = false;
            if (c.firstNumber != '0') c.equals();
            c.memory = c.memory - c.input;
            break;
        case 'MRC':
            if (c.previous === 'MRC') {
                c.memory = 0;
            } else {
                c.editable = false;
                c.input = c.memory;
                c.screen = c.input;
            }
            break;
        case 'CE':
            if (c.error) {
                c.error = false;
            } else {
                c.input = '0';
                c.screen = c.input;
            }
            break;
        case 'ON/C':
            c.error = false;
            c.memory = 0;
            c.firstNumber = '0';
            c.input = '0';
            c.screen = c.input;
            break;
    }
    c.previousKey = action;
}