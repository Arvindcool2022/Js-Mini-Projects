const primaryDisplay = document.querySelector('.top');
const secondaryDisplay = document.querySelector('.bottom');
const clearData = document.querySelector('[data-keys="clear"]');
const deleteBtn = document.querySelector('[data-keys="delete"]');
const equalTo = document.querySelector('[data-keys="equalTo"]');
const operators = document.querySelectorAll('[data-keys="operator"]');
const numbers = document.querySelectorAll('[data-keys="numbers"]');
const period = document.querySelector('[data-keys="period"]');

const operatorPattern = /[+\-\/*]/;
// const operatorPattern = /[+*\/-]/;
const numberPattern = /[0-9]/;
const periodPattern = /[.]/;

let currentPrimaryDisplay = '';
let currentSecondaryDisplay;

addEventListenerToElement(numbers, appendNumber);
addEventListenerToElement(operators, appendOperator);
function addEventListenerToElement(elements, callback) {
  elements.forEach(element => {
    element.addEventListener('click', e => {
      callback(e.target.textContent);
    });
  });
}

clearData.addEventListener('click', () => {
  currentPrimaryDisplay = '';
  currentSecondaryDisplay = undefined;
  updatePrimaryDisplay();
  updateSecondaryDisplay('');
});

deleteBtn.addEventListener('click', () => {
  currentPrimaryDisplay = currentPrimaryDisplay.slice(0, -1);
  updatePrimaryDisplay();
});

period.addEventListener('click', () => {
  if (periodPattern.test(currentPrimaryDisplay) && currentPrimaryDisplay !== '')
    return;

  if (currentPrimaryDisplay === '') currentPrimaryDisplay = '0.';
  else currentPrimaryDisplay += '.';

  updatePrimaryDisplay();
});

equalTo.addEventListener('click', () => {
  primaryDisplay.textContent = eval(currentPrimaryDisplay);
  currentPrimaryDisplay = '';
  updateSecondaryDisplay('');
});

function appendOperator(data) {
  if (
    operatorPattern.test(data) &&
    (operatorPattern.test(
      currentPrimaryDisplay.charAt(currentPrimaryDisplay.length - 1)
    ) ||
      currentPrimaryDisplay === '')
  ) {
    console.log(currentPrimaryDisplay, data);
    return;
  } else {
    console.log(currentPrimaryDisplay, data);
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

  if (operatorPattern.test(currentPrimaryDisplay)) {
    updateSecondaryDisplay(currentPrimaryDisplay);
  }
}

function updateSecondaryDisplay(input) {
  currentSecondaryDisplay = eval(input);
  secondaryDisplay.textContent = currentSecondaryDisplay;
}
