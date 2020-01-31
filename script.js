let runningTotal = 0;
//Buffer is what is displayed on the calc screen.
let buffer = "0";
//null means the absense of anthing, not just zero, it means absolutely empty.
let previousOperator;
const screen = document.querySelector(".screen");


//The first step is event listner and bbutton click function at the BOTTOM. This is step 2. 
//Button click can be on a NUMBER or a SYMBOL.
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
      handleSymbol(value);
    }else{
      handleNumber(value);
    }
  rerender();
}

//For NUMBERS, we have a function that adds numbers onto the string.
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

//This function deals with math
function handleMath(value) {

  if (buffer === "0") {
    //do nothing
    return;
  }

const intBuffer = parseInt(buffer);
if (runningTotal === 0) {
  runningTotal = intBuffer;
} else {
  flushOperation(intBuffer);
}

previousOperator = value;
// NEED TO FIX THE BUFFER TO MAKE buffer be the previous number
buffer = "0";
}
//flustOperation means do the math
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

//This function deals with the symbols, we use a switch statement instead of "if thens" for each button.
function handleSymbol(value){
    switch(value) {
        case `C`:
        buffer = "0";
        runningTotal= 0;
        break;

        case `=`:
        if (previousOperator === null) {
          return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = +runningTotal;
        runningTotal = 0;
        break;

        case `←`:
        if (buffer.length === 1) {
          buffer = "0";
        } else {
          buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
        case "÷":
        case "×":
        case "-":
        case "+":
        handleMath(value);
        break;
        }
    }






function rerender() {
  screen.innerText = buffer;
}

//This is the first step, we have a function that sets up an event listener for the buttons.

function init() {
document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
    
});
}
init();




