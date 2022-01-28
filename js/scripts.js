// const array = [
//     {
//         name: 'alex',
//         id: 1,
//         age: 15
//     },
//     {
//         name: 'bob',
//         id: 2,
//         age: 22
//     },
//     {
//         name: 'don',
//         id: 3,
//         age: 10
//     },
//     {
//         name: 'mira',
//         id: 4,
//         age: 45,
//     },
//     {
//         name: 'frans',
//         id: 5,
//         age: 18,
//     }
// ];

// const addedField = oldArray => {
//     return oldArray.map(element => {
//         return({
//             ...element,
//             job: 'programmer',
//         })
//     })
// }

// const checkingAge = oldArray => {
//     return oldArray.filter(element => {
//         return element.age >= 18
//     })
// }

// const someMan = oldArray => {
//     return oldArray.some(element => {
//         return element.name === 'bob';
//     })
// }

// console.log(someMan(array))

// {
//     id: 1,
//     text: '',
//     isDone: false
// }

// const AllTasks = function () {
//    this.tasks = [];
//    this.filterTasks = [];
//    this.ids = 0;

//    // this.addedTask = function (task) {
//    //    this.tasks.push({
//    //       ...task,
//    //       isDone: false,
//    //       id: this.ids
//    //    });
//    //    this.ids = this.ids + 1;
//    // }

//    this.addTask = function (task) {
//       this.tasks.push({
//          target: task,
//          isDone: false,
//          id: this.ids
//       });
//       this.ids = this.ids + 1;
//    }
//    this.doneTask = function (task) {
//       this.tasks = this.tasks.map(element => {
//          if (task.id === element.id) {
//             return ({
//                ...element,
//                isDone: !element.isDone
//             })
//          }
//          return element;
//       })
//    }
//    this.getAllTasks = function () {
//       if (this.filterTasks.length === 0) {
//          return this.tasks;
//       } else {
//          return this.filterTasks;
//       }
//    }
//    this.searchTasks = function (text) {
//       if (text === '') {
//          this.filterTasks = [];
//          return;
//       }
//       this.filterTasks = this.task.filter(element => {
//          return element.text.includes(text);
//       })
//    };
//    this.delete = function (task) {
//       let id = null;
//       this.tasks.forEach(element => {
//          if (element.id === task.id) {
//             id = element.id
//          }
//       })
//       const copyTasks = [...this.tasks];
//       copyTasks.splice(id, 1);
//       this.tasks = copyTasks;
//    }
// }

// const allTask = new AllTasks();


// let tasks = document.querySelector('.tasks');
// let item = document.querySelector('.item');
// let task = document.querySelector('h5');
// let label = document.querySelector('.item__checkbox');

// input.addEventListener('keyup', function (event) {
//    if (input.value == '') {
//       return;
//    } else if (event.keyCode === 13) {
//       allTask.addTask(input.value);
//       task.innerHTML = input.value;
//       input.value = '';
//    }
//    allTask.getAllTasks();
// });



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














