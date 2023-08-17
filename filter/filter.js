const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('#search');
const menu = document.querySelector('.filters');
const priceRange = document.querySelector('#max-price');
const priceValue = document.querySelector('.price-value');
const template = document.querySelector('[data-product-card]');
const categoryContainer = document.querySelector('.categories');
let data;
fetch('./filter.json')
  .then(response => response.json())
  .then(productObj => {
    data = productObj;
    addAllProducts(productObj);
    search(productObj);
    setCategories(productObj);
    setPrice(productObj);
  });

function addAllProducts(productList) {
  productsContainer.innerHTML = '';
  productList.forEach(product => {
    const cardClone = document.importNode(template.content, true);

    const cardImg = cardClone.querySelector('.card__img');
    const cardName = cardClone.querySelector('.card__name');
    const cardPrice = cardClone.querySelector('.price');

    cardImg.src = product.img;
    cardName.textContent = product.name;
    cardPrice.textContent = `Price: ${product.price}`;

    productsContainer.appendChild(cardClone);
  });
}

function search(productList) {
  searchInput.addEventListener('keyup', event => {
    const value = event.target.value.toLowerCase();

    if (value) {
      addAllProducts(
        productList.filter(
          element => element.name.toLowerCase().indexOf(value) !== -1
        )
      );
    } else addAllProducts(productList);
  });
}

function setCategories(productList) {
  console.log(1);
  const unfilteredCat = productList.map(x => x.category);
  const finalCategory = ['all', ...new Set(unfilteredCat)];

  categoryContainer.innerHTML = '';
  categoryContainer.innerHTML = finalCategory
    .map(item => `<li class="category">${item}</li>`)
    .join('');

  categoryContainer.addEventListener('click', e => {
    const selectedCategory = e.target.textContent.toLowerCase();

    if (selectedCategory === 'all') addAllProducts(data);
    else {
      let filteredData = data.filter(
        x => x.category.toLowerCase() === selectedCategory
      );
      console.log(filteredData);
      addAllProducts(filteredData);
    }
  });
}

function setPrice(productList) {
  const priceList = productList.map(x => x.price.replace('$', ''));
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);
  //   console.log(priceList, minPrice, maxPrice);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = '$' + maxPrice;

  priceRange.addEventListener('input', e => {
    const selectedPrice = parseFloat(e.target.value);
    priceValue.textContent = '$' + selectedPrice;
    let filteredList = productList.filter(
      element => parseFloat(element.price.replace('$', '')) <= selectedPrice
    );
    addAllProducts(filteredList);
  });
}

//# template literal method.
// function addAllProducts(products) {
//   products.forEach(product => {
//     const element = `
// <div class="card">
//     <div class="card__img-container">
//         <img class="card__img" src="${product.img}" alt="watch">
//     </div>
//     <div class="card__body">
//         <h2 class="card__name">${product.name}</h2>
//         <p class="price">Price: ${product.price}</p>
//     </div>
// </div>`;
//     productsContainer.insertAdjacentHTML('beforeend', element);
//   });
// }
