const inputBtn = document.querySelector('.js-input-button');
let taskList = [];
const inputBar = document.querySelector('.js-input-bar');
const taskCardsContainer = document.querySelector('.js-task-cards');
let editingTaskIndex = null;

loadTask();
renderTaskList();

function addTask() {
    
    let inputBarText = inputBar.value.trim();
    
    if (inputBarText !== '') {
    taskList.push(inputBarText);
    
      inputBar.value = '';

      renderTaskList();
      saveTolocalStorage();
    };
  }


  function renderTaskList() {
    taskCardsContainer.innerHTML = '';

    taskList.forEach((task, index) => {
      let taskCardHTML = `
      <div class="task-container">
        <button class="edit-btn js-edit-button" data-task-index = "${index}">Edit</button>
        <button class="remove-btn js-remove-button" data-task-index = "${index}">Remove</button>
        <label>
            <input type="checkbox" name="task-card">
            ${task}
        </label>
      </div>
      `;
      taskCardsContainer.innerHTML += taskCardHTML;
      });
      const removeButtons = document.querySelectorAll('.js-remove-button');

      removeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-task-index');
            taskList.splice(index, 1);
            renderTaskList();
            saveTolocalStorage();
          });
        });

      const editButtons = document.querySelectorAll('.js-edit-button');

      editButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-task-index');
          inputBar.value = taskList.at(index);
          inputBar.focus();
          inputBtn.innerText = 'Save Edit';
          editingTaskIndex = index;
        });
      });
  };


inputBtn.addEventListener('click', () => {
  if (editingTaskIndex !== null) {
    taskList[editingTaskIndex] = inputBar.value;
    editingTaskIndex = null;
    saveTolocalStorage();
    inputBtn.innerText = 'Add Task';
    renderTaskList();
    inputBar.value = '';
  } else {
  addTask();
  }
});

inputBar.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    if (editingTaskIndex !== null) {
      taskList[editingTaskIndex] = inputBar.value;
      editingTaskIndex = null;
      saveTolocalStorage();
      inputBtn.innerText = 'Add Task';
      renderTaskList();
      inputBar.value = '';
  } else {
      addTask();
    }
  }
});


function saveTolocalStorage() {
  localStorage.setItem('myTask', JSON.stringify(taskList));
}

function loadTask() {
  taskList = JSON.parse(localStorage.getItem('myTask')) || [];
}