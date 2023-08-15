const input = document.getElementById('input');
const addButton = document.querySelector('.add');
const clearAllButton = document.querySelector('.clear');
const todoList = document.querySelector('.list');
const errorMessage = document.querySelector('#err');
let dragged;
loadItemsFromStorage();

addButton.addEventListener('click', addTask);
clearAllButton.addEventListener('click', deleteAllTask);
todoList.addEventListener('click', handleListClick);
todoList.addEventListener('dragstart', handleDragStart);
todoList.addEventListener('dragend', handleDragEnd);
todoList.addEventListener('dragover', handleDragOver);
todoList.addEventListener('drop', handleDrop);

function addTask() {
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    li.innerHTML = input.value.trim();
    li.setAttribute('draggable', 'true');
    todoList.appendChild(li);
    const deleteButton = document.createElement('span');
    deleteButton.innerHTML = '\u00d7'; //multiply symbol 'x'
    li.appendChild(deleteButton);
    input.value = '';
    saveItemsToStorage();
    errorMessage.style.display = 'none';
  } else {
    errorMessage.setAttribute('style', 'display: block;');
  }
}

function deleteAllTask() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  saveItemsToStorage();
}

function handleListClick(event) {
  const clickedElement = event.target;
  if (clickedElement.tagName === 'LI') {
    clickedElement.classList.toggle('checked');
    saveItemsToStorage();
  } else if (clickedElement.tagName === 'SPAN') {
    clickedElement.parentElement.remove();
    saveItemsToStorage();
  }
}

function loadItemsFromStorage() {
  const items = localStorage.getItem('todoItems');
  if (items) todoList.innerHTML = items;
}

function saveItemsToStorage() {
  localStorage.setItem('todoItems', todoList.innerHTML);
}

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.innerHTML);
  // event.target.remove();
  dragged = event.target;
  console.log(dragged);

  dragged.setAttribute('class', 'dragging');
}

function handleDragEnd() {
  dragged.classList.remove('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
  event.preventDefault();
  const draggedText = event.dataTransfer.getData('text/plain');
  const li = document.createElement('li');
  li.innerHTML = draggedText;
  li.setAttribute('draggable', 'true');

  // Determine the drop target position
  const dropTarget = event.target.closest('li');
  if (dropTarget === todoList.firstChild) {
    todoList.insertBefore(li, todoList.firstChild);
  } else if (dropTarget) {
    todoList.insertBefore(li, dropTarget.nextSibling);
  } else {
    todoList.appendChild(li);
  }
  dragged.remove();

  saveItemsToStorage();
}
