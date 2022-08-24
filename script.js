// the fetching the display and the decimal button on the calculator
const calc = document.querySelector('.calc');
const display = calc.querySelector('.display');
const deciBtn = calc.querySelector('#dec');
// Intialising the variables 
let inputNum = []; 
let firstNum = null;
let secondNum = null;
let operation = null;
let result = null;

function output(result) {
    // function to display input on the calculator
    display.textContent = result;

} 

// functions for operations
const addition = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const division = (a,b) => a / b;

function isNumber(x){
    // function to check if input is a number
    if(typeof x === 'number'){
        return true;
    }else{
        return false;
    }
}

function operate (a,b,operator) {
    // function takes in 2 numbers and a str and preforms an operation based on the str
    if (operator == 'a'){
        return addition(a,b);
    }else if (operator == 's') {
        return subtract(a,b);
    }else if (operator == 'm') {
        return multiply(a,b);
    }else if (operator == 'd'){
        return division(a,b);
    }

}

function setVariables(x) {
    // function sets variables intialised at the start
    if(isNumber(x)){
        // if input is a number it will fill the first number position before the second
        if (!isNumber(firstNum)){
            firstNum = x;
        }else if (!isNumber(secondNum)){
            secondNum = x;

        }
    }else{
        operation = x;
    }

}

function calculate() {
    // fucntion calculates users request and displays it on the display
    result = operate(firstNum,secondNum,operation);
    
    // round result to 8 s.f. to fit display
    if(result.toString().length > 8){
        output(result.toPrecision(8));
    }else{
        output(result);
    }
    // reintialise values after calculation
    firstNum = null;
    secondNum = null;
    operation = null;

}

function clear(){
    // function for when clear button is pressed and sets all variables to intial state
    inputNum = [];
    firstNum = null;
    secondNum = null;
    operation = null;
    output("CLR")
}


// retrieve all buttons on calculator
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // if btn id is a number it will display
        if(Number.isInteger(parseInt(button.value)) || button.value == "."){

            if(inputNum.includes(".")){
                // decimal button deactivated after 1 use
                deciBtn.disabled = true;
            }
            inputNum.push(button.value);
            output(inputNum.join(""));
            
        }else if (button.value == "a" || button.value == "m" || button.value == "d" || button.value == "s"){
            // if operator button is pressed and no pending calculation and no firstNum set
            if (operation === null && firstNum == null){
                output("");
                // arr is joined and firstNum is set and decimal btn is activated 
                setVariables(parseFloat(inputNum.join("")));
                deciBtn.disabled = false;
                inputNum = [];
                // set operation
                setVariables(button.value);
            // if there is already a pending calculation and user presses an operation button again i.e 2 + 2 -    
            }else if (operation != null ){
                // current displayed number is now taken as second number and decimal button reactivated
                setVariables(parseFloat(inputNum.join("")));
                inputNum = [];
                // pending calulation is preformed and new operation is then saved
                calculate();
                deciBtn.disabled = false;
                firstNum = result;
                operation = button.value;
            }else {
                // for the case user wants to use previous answer as new firstNum
                output("");
                setVariables(button.value);
                deciBtn.disabled = false;
            }
        
        }else if (button.value == "e"){
            // if user presses equals button preform calculation
            setVariables(parseFloat(inputNum.join("")));
            inputNum = [];
            calculate();
            // set answer as first number for further calculations
            firstNum = result;
        }else if (button.value == "c"){
            // if clear button is pressed 
            clear();
            deciBtn.disabled = false;

        }
        
    });
    
});




