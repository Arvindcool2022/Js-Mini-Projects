const primaryDisplay = document.querySelector('.top');
const secondaryDisplay = document.querySelector('.bottom');
const clearData = document.querySelector('[data-keys="clear"]');
const deleteBtn = document.querySelector('[data-keys="delete"]');
const equalTo = document.querySelector('[data-keys="equalTo"]');
const operators = document.querySelectorAll('[data-keys="operator"]');
const numbers = document.querySelectorAll('[data-keys="numbers"]');
const period = document.querySelector('[data-keys="period"]');
// const percentageOf = document.querySelector('[data-keys="percent"]');

const operatorPattern = /[+\-\/*]/;
const numberPattern = /[0-9]/;
const operatorAndNumberPattern = /([0-9.]+)\s*([+\-\/*])\s*([0-9.]+)%/;
const periodPattern = /[.]/;

let currentPrimaryDisplay = '';
let currentSecondaryDisplay;

addEventListenerToElement(numbers, appendNumber);
addEventListenerToElement(operators, appendOperator);
// percentageOf.addEventListener('click', percent);
function addEventListenerToElement(elements, callback) {
  elements.forEach(element => {
    element.addEventListener('click', e => {
      callback(e.target.textContent);
    });
  });
}
// function calculatePercentage(base, percentage) {
//   return (percentage / 100) * base;
// }

// function extractBaseAndPercentage(expression) {
//   const match = expression.match(operatorAndNumberPattern);
//   if (match) {
//     const base = parseFloat(match[1]);
//     const operator = match[2];
//     const percentage = parseFloat(match[3]);
//     return [base, operator, percentage];
//   }
//   return null;
// }

// function percent() {
//   const input = currentPrimaryDisplay;

//   if (!input) {
//     return;
//   }

//   const [base, operator, percentage] = extractBaseAndPercentage(input);

//   if (base !== null && operator && percentage !== null) {
//     const result = calculatePercentage(base, percentage);
//     console.log('percent', result);
//     currentPrimaryDisplay = result.toString();
//     updatePrimaryDisplay();
//   }
// }

clearData.addEventListener('click', () => {
  currentPrimaryDisplay = '';
  currentSecondaryDisplay = undefined;
  updatePrimaryDisplay();
  updateSecondaryDisplay('');
});

deleteBtn.addEventListener('click', () => {
  currentPrimaryDisplay = currentPrimaryDisplay.slice(0, -1);
  updatePrimaryDisplay();
  updateSecondaryDisplay(currentPrimaryDisplay);
});

period.addEventListener('click', () => {
  let currentNumber = '';
  if (
    !operatorPattern.test(
      currentPrimaryDisplay.charAt(currentPrimaryDisplay.length - 1)
    )
  )
    currentNumber = currentPrimaryDisplay;

  if (periodPattern.test(currentNumber) && currentNumber !== '') return;

  if (currentNumber === '') currentPrimaryDisplay += '0.';
  else currentPrimaryDisplay += '.';

  updatePrimaryDisplay();
});

equalTo.addEventListener('click', () => {
  currentPrimaryDisplay = eval(currentPrimaryDisplay);
  currentPrimaryDisplay = currentPrimaryDisplay.toString();
  updatePrimaryDisplay();
  updateSecondaryDisplay('');
});

function appendOperator(data) {
  if (
    operatorPattern.test(
      currentPrimaryDisplay.charAt(currentPrimaryDisplay.length - 1)
    ) ||
    currentPrimaryDisplay === ''
  ) {
    return;
  } else {
    currentPrimaryDisplay += data;
  }
  updatePrimaryDisplay();
}
function appendNumber(data) {
  currentPrimaryDisplay += data;
  updatePrimaryDisplay();
}

function updatePrimaryDisplay() {
  primaryDisplay.textContent = currentPrimaryDisplay;
  updateSecondaryDisplay(currentPrimaryDisplay);
}

function updateSecondaryDisplay(input) {
  if (
    operatorPattern.test(input) &&
    !operatorPattern.test(input.charAt(input.length - 1))
  ) {
    currentSecondaryDisplay = eval(input);
    secondaryDisplay.textContent = currentSecondaryDisplay;
  } else if (
    operatorPattern.test(
      currentPrimaryDisplay.charAt(currentPrimaryDisplay.length - 1)
    )
  ) {
    input = input.slice(0, -1);
    currentSecondaryDisplay = eval(input);
    secondaryDisplay.textContent = currentSecondaryDisplay;
  } else secondaryDisplay.textContent = '';
}
