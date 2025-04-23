// Variable for the display
const display = document.getElementById("display");

// Reset all variables
let operation = null;
let currentInput = "";
let previousInput = "";
let resetScreen = false;

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
  resetScreen = true;
  previousInput = display.value;
}

// Calculate Button =
function calculate() {
  if (operation === null || resetScreen) {
    return;
  }

  let result;
  const currentValue = parseFloat(display.value);
  const previousValue = parseFloat(previousInput);

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
}
