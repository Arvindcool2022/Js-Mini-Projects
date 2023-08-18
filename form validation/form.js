const form = document.querySelector('.form-section form');
const submit = document.querySelector('.submit');
const name = document.querySelector('#name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password2');
const terms = document.querySelector('#terms');

let output;

submit.addEventListener('click', e => {
  e.preventDefault();

  checkName();
  checkPhone();
  checkEmail();
  checkPassword();
  validatePassword();
  checkTerms();
});

function validate(element, boolean) {
  let close = element.closest('.input-grp');

  if (boolean) {
    close.classList.remove('not-valid');
    close.classList.add('valid');
  } else {
    close.classList.remove('valid');
    close.classList.add('not-valid');
    finalCheck = false;
  }
}

function checkName() {
  if (name.value.trim() === '') validate(name, false);
  else validate(name, true);
}

function checkPhone() {
  console.log(phone.value);
  if (phone.value.toString().length === 10) validate(phone, true);
  else validate(phone, false);
}
function checkEmail() {
  let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  validate(email, pattern.test(email.value));
}
function checkPassword() {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  const numberRegex = /[0-9]/;

  output =
    uppercaseRegex.test(password.value) &&
    lowercaseRegex.test(password.value) &&
    symbolRegex.test(password.value) &&
    numberRegex.test(password.value) &&
    password.value.length >= 8;
  console.log(output);
  validate(password, output);
}
function validatePassword() {
  if (output && password.value === confirmPassword.value)
    validate(confirmPassword, true);
  else validate(confirmPassword, false);
}
function checkTerms() {
  validate(terms, terms.checked);
}
