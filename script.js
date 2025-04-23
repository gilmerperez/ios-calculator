// Variable for the display
const display = document.getElementById("display");

// Reset all variables
let operation = null;
let currentInput = "";
let previousInput = "";
let resetScreen = false;
let operationDisplay = "";

function appendToDisplay(input) {
  if (resetScreen) {
    display.value = "";
    resetScreen = false;
    // Don't let multiple '.' in the display
  } else if (input === "." && display.value.includes(".")) {
    return;
  }
  display.value = display.value + input;
}

function clearDisplay() {
  operation = null;
  currentInput = "";
  display.value = "";
  previousInput = "";
  operationDisplay = "";
}

// Toggle Positive and Negative + / -
function toggleSign() {
  if (display.value === "") {
    return;
  } else if (display.value.charAt(0) === "-") {
    display.value = display.value.substring(1);
  } else {
    display.value = "-" + display.value;
  }
}

// Percentage Button %
function percentage() {
  if (display.value === "") {
    return;
  }
  const value = parseFloat(display.value);
  display.value = (value / 100).toString();
}

// Operator Buttons + - * /
function setOperation(op) {
  if (display.value === "") {
    return;
  }

  if (operation !== null) {
    calculate();
  }

  operation = op;
  previousInput = display.value;
  operationDisplay = `${display.value} ${op === "*" ? "×" : op} `;
  display.value = "";
}

// Calculate Button =
function calculate() {
  if (operation === null || display.value === "") {
    return;
  }

  let result;
  const currentValue = parseFloat(display.value);
  const previousValue = parseFloat(previousInput);

  operationDisplay += display.value;

  if (operation === "+") {
    result = previousValue + currentValue;
  } else if (operation === "-") {
    result = previousValue - currentValue;
  } else if (operation === "*") {
    result = previousValue * currentValue;
  } else if (operation === "/") {
    result = previousValue / currentValue;
  } else if (operation === "%") {
    result = previousValue % currentValue;
  } else {
    return;
  }

  display.value = result.toString();
  operation = null;
  operationDisplay = "";
}

// This shows the current operation
function updateDisplay() {
  const displayContainer = document.getElementById("display-container");
  const operationDisplayElement =
    document.getElementById("operation-display") ||
    (() => {
      const el = document.createElement("div");
      el.id = "operation-display";
      el.style.color = "hsl(0, 0%, 60%)";
      el.style.fontSize = "1.5rem";
      el.style.textAlign = "right";
      el.style.padding = "0 15px";
      el.style.height = "25px";
      displayContainer.insertBefore(el, display);
      return el;
    })();

  operationDisplayElement.textContent = operationDisplay;
}

// Modify setOperation and calculate to update the display
const originalSetOperation = setOperation;
setOperation = function (op) {
  originalSetOperation(op);
  updateDisplay();
};

const originalCalculate = calculate;
calculate = function () {
  originalCalculate();
  updateDisplay();
};

// Also update display when appending numbers
const originalAppend = appendToDisplay;
appendToDisplay = function (input) {
  originalAppend(input);
  if (!resetScreen && operation !== null) {
    operationDisplay = `${previousInput} ${
      operation === "*" ? "×" : operation
    } `;
    updateDisplay();
  }
};
