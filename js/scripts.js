let addMessage = document.querySelector('.message'),
   addButton = document.querySelector('.add'),
   todo = document.querySelector('.todo'),
   clearButton = document.querySelector('.clear__button'),
   newId = 0,
   todoList = [],
   items,
   trash,
   checkboxes;

if (localStorage.getItem('todo')) {
   todoList = JSON.parse(localStorage.getItem('todo'));
   displayMessages();
}
if (localStorage.getItem('id')) {
   newId = JSON.parse(localStorage.getItem('id'));
}


function addClickToItem() {
   items.forEach(function (element) {
      element.addEventListener('click', function () {
         element.querySelector('input').checked = !element.querySelector('input').checked;
         itemId = element.querySelector('input').id;
         todoList.checked = element.querySelector('input').checked;
         changeCheckBox();
      });

      element.addEventListener('contextmenu', function (event) {
         event.preventDefault();
         itemId = element.querySelector('input').id;
         edit();
      })
   });

   checkboxes.forEach(function (element) {
      element.addEventListener('click', function () {
         saveCheckBox();
      });
   });

   trash.forEach(function (element) {
      element.addEventListener('click', function () {
         todoList.forEach(function (item, i) {
            if (item.id === element.id) {
               todoList.splice(i, 1);
               localStorage.setItem('todo', JSON.stringify(todoList));
               displayMessages();
            }
         })
      })
   });
}

addButton.addEventListener('click', function (event) {
   event.preventDefault();
   let newTodo = {
      todo: addMessage.value,
      checked: false,
      id: 'item_' + newId
   }
   if (addMessage.value == '') {
      return;
   } else {
      newId++;
      todoList.push(newTodo);
      addMessage.value = '';
      displayMessages();
      localStorage.setItem('id', JSON.stringify(newId));
      localStorage.setItem('todo', JSON.stringify(todoList));
   }
});

function displayMessages() {
   let displayMessage = '';
   if (todoList.length === 0) {
      todo.innerHTML = '';
      clearButton.style.cssText = 'display: none';
   } else {
      clearButton.style.cssText = 'display: block';
      todoList.forEach(function (item) {
         displayMessage += `
      <li class="item">
      <div id="${item.id}" class="trash"><i class="fas fa-trash"></i></div>
      <input id="${item.id}" class="item__checkbox" type="checkbox" ${item.checked ? 'checked' : ''}>
      <label for="${item.id}"><i class="fas fa-check"></i></label>
      <div id="${item.id}" class="some__task">
      <h5>${item.todo}</h5>
      </div>
      </li>
      `;
         todo.innerHTML = displayMessage;
      })
      items = document.querySelectorAll('.item');
      checkboxes = document.querySelectorAll('.item__checkbox');
      trash = document.querySelectorAll('.trash');
      addClickToItem();
   }
}

clearButton.addEventListener('click', function () {
   todoList = [];
   localStorage.setItem('todo', JSON.stringify(todoList));
   displayMessages();
})


function edit() {
   todoList.forEach(function (item) {
      if (item.id === itemId) {
         let editedTusk = prompt('Edit Task', item.todo);
         if (editedTusk === null) {
            return;
         } else {
            item.todo = editedTusk;
            localStorage.setItem('todo', JSON.stringify(todoList));
            displayMessages();
         }
      }
   })
}

function saveCheckBox() {
   todoList.forEach(function (item) {
      if (item.id === element.id) {
         item.checked = !item.checked;
         localStorage.setItem('todo', JSON.stringify(todoList));
      }
   })
}

function changeCheckBox() {
   todoList.forEach(function (item) {
      if (item.id === itemId) {
         item.checked = !item.checked;
         localStorage.setItem('todo', JSON.stringify(todoList));
      }
   })
}
