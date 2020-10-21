"use strict";

//left in some console.logs if you want an insight into what's happening

const paraEquation = document.querySelector("#expression");
const buttons = Array.from(document.querySelectorAll('button'));
const OPERATORS = ["+", "/", "-", "x"];
const isOperator = item => (OPERATORS.indexOf(item)===-1) ? false: true;


function multiply(a,b) {
    return a*b;
} 
function subtract(a,b) {
    return a-b;
}
function add(a,b) {
    return a+b;
}
function divide(a,b) {
    return (a*10)/(b*10);
}

function operate(operator,a,b) {
    const functionObj = {"x":multiply,
    "/":divide,
    "+":add,
    "-":subtract                        
};
console.log(`b.... s${b}s`);
if (b=="") return "error";
a = +a;
b = +b;
return functionObj[operator](a,b);
}

function processExpression() {
    let expression = paraEquation.textContent.split(" ");
    console.log(expression);
    const convertArray = array => {
        let tempArr = [];
        let tempStr = "";
        loop:
        for (let i=0;i<array.length;i++) {
            if (OPERATORS.indexOf(array[i])===-1) {
                console.log(`value... ${array[i]}`)
                tempStr += array[i];
            }
            else {
                tempArr.push(tempStr);
                console.log(`tempstr... ${tempStr}`)
                tempStr = "";
                tempArr.push(array[i]);
                console.log(`temparr... ${tempArr}`)
            } 
        }
        tempArr.push(tempStr);
        return tempArr;
    }
    expression = convertArray(expression);
    console.log(expression);
    const shiftOperator = array => { //moves the operator to positon 0 like in a tree
            if (OPERATORS.indexOf(array[1]!=-1)) {
               let operator= array.splice(1,1);
               array.unshift(operator);
               console.log("has been shifted.....");
               return array;
            }
            else {
                return "error";
            }
    }
    const isValid = term => (isNaN(term)||term==="error") ? false : true;
    let shifted = shiftOperator(expression);
    let result;
    calculate:
    while (shifted) {
        console.log(`shifted start: ${shifted}`);
        let process = shifted.slice(0,3);
        shifted.splice(0,3);
        result = operate(...process);
        shifted.unshift(result);
        console.log(`shifted end: ${shifted}`);
        if (shifted.length ===1) break calculate;
        shifted = shiftOperator(shifted);
    }
    console.log(`result... ${result}`);
    console.log(`broken..... ${result}`);
    console.log(`is valid..... ${isValid(result)}`);
    if (!isValid(result)) {
        paraEquation.textContent="Invalid Expression";
        console.log("invalid........")
        return;
        
    }
    console.log("display........")
    paraEquation.textContent=result;    
}

function backspace() {
    let array = paraEquation.textContent.split(" ").join("").split("");
    array.pop();
    paraEquation.textContent = array.join(" ");
}

function processClick(event) {
    const buttonClicked = event.target.textContent;

    if (isOperator(buttonClicked)) {
        paraEquation.textContent+= ` ${buttonClicked} `;
        return;
    }
    switch (buttonClicked) {
        case "AC":
            paraEquation.textContent = "";
            break
        case "C":
            backspace();
            break;
        case ".":
            paraEquation.textContent += ".";
            break;
        case "=":
            processExpression();
            break;
        default:
            paraEquation.textContent += buttonClicked;
    }
}

function processKey(event) {
    console.log(`key... ${event.key}`);
    const keyPressed = event.key;


    if (isOperator(keyPressed)) {
        paraEquation.textContent+= ` ${keyPressed} `;
        return;
    }
    if (keyPressed=="Shift") return;
    switch (keyPressed) {
        case "a":
            paraEquation.textContent = "";
            break
        case "Backspace":
            backspace();
            break;
        case ".":
            paraEquation.textContent += ".";
            break;
        case "=":
            console.log(paraEquation.textContent);
            processExpression();
            console.log("processed....")
            break;
        case "*":
            paraEquation.textContent+= " x ";
            break;
        default:
            paraEquation.textContent += keyPressed;
    }
    console.log(`content... ${paraEquation.textContent}`);

}


buttons.forEach(button => button.addEventListener('click', processClick));
buttons.forEach(button => button.addEventListener('keyup', processKey));



