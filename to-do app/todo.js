const input = document.getElementById('input');
const addButton = document.querySelector('button');
const todoList = document.querySelector('.list');
const errorMessage = document.querySelector('#err');

loadItemsFromStorage();

addButton.addEventListener('click', addTask);
todoList.addEventListener('click', handleListClick);

function addTask() {
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    li.innerHTML = input.value.trim();
    todoList.appendChild(li);
    const deleteButton = document.createElement('span');
    deleteButton.innerHTML = '\u00d7'; //multiply symbol 'x'
    li.appendChild(deleteButton);
    input.value = '';
    saveItemsFromStorage();
    errorMessage.style.display = 'none';
  } else {
    errorMessage.setAttribute('style', 'display: block;');
  }
}

function handleListClick(event) {
  const clickedElement = event.target;
  if (clickedElement.tagName === 'LI') {
    clickedElement.classList.toggle('checked');
    saveItemsFromStorage();
  } else if (clickedElement.tagName === 'SPAN') {
    clickedElement.parentElement.remove();
    saveItemsFromStorage();
  }
}

function loadItemsFromStorage() {
  const items = localStorage.getItem('todoItems');
  if (items) todoList.innerHTML = items;
}

function saveItemsFromStorage() {
  localStorage.setItem('todoItems', todoList.innerHTML);
}
