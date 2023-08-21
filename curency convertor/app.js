const FIXER_API_KEY = 'f968d1dc5140784bbc67311275c3559c';
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;
const REST_COUNTRIES_API = `https://restcountries.com/v3.1/all?fields=name,currencies`;
let submitButton = document.getElementById('submit');
let currencyValue;
let countries;

submitButton.addEventListener('click', getRates);

(async () => {
  [currencyValue] = await getData(FIXER_API);
  currencyValue = currencyValue.rates;
  [countries] = await getData(REST_COUNTRIES_API);

  //   for (const key in currencyValue) {
  //     showData(key + ' => ' + currencyValue[key]);
  //   }

  for (const obj of countries) {
    showData(obj);
  }

  showDropdown(Object.keys(currencyValue));
})();

async function getData(...urls) {
  const output = await Promise.all(urls.map(async url => await fetchData(url)));
  return output;
}
// async function getData(...urls) {
//   const results = [];
//   for (const url of urls) {
//     const response = await fetchData(url);
//     results.push(response);
//   }
//   return results;
// }

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    let err = document.getElementById('err');
    err.setAttribute('style', 'display:block;');
    err.innerHTML = `Network error: ${error}`;
    return null;
  }
}
//! no proper error handling.
// async function fetchData(url) {
//   const response = await fetch(url)
//     .then(response => response.json())
//     .catch(err => console.error(`Network response was not ok: ${err}`));
//   return await response;
// }

function showData(data) {
  console.log(data);
}

function showDropdown(data) {
  const display = Array.from(document.querySelectorAll('.currency'));
  data.forEach(item => {
    let element = `<option value="${item}">${item}</option>`;

    display.forEach(node => {
      node.insertAdjacentHTML('beforeend', element);
    });
  });
}

function getRates(e) {
  e.preventDefault();
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const amount = document.getElementById('amount');

  const exchageRate =
    currencyValue[toCurrency.value] / currencyValue[fromCurrency.value];

  const exchageRateForInput = amount.value * exchageRate;
  document.querySelector(
    '.currency-output'
  ).innerHTML = `One ${fromCurrency.value} = ${exchageRate} ${toCurrency.value} <br>  ${amount.value} ${fromCurrency.value} = ${exchageRateForInput} ${toCurrency.value}`;
}
