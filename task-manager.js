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
    taskList.push({
      text: inputBarText,
      isCompleted: false
    });
    
      inputBar.value = '';

      renderTaskList();
      saveTolocalStorage();
    };
  }


  function renderTaskList() {
    taskCardsContainer.innerHTML = '';

    taskList.forEach((task, index) => {
      let taskCardHTML = `
      <div class="task-container ${task.isCompleted ? 'completed-task' : ''}">
        <button class="edit-btn js-edit-button" data-task-index = "${index}">Edit</button>
        <button class="remove-btn js-remove-button" data-task-index = "${index}">Remove</button>
        <label>
            <input type="checkbox" name="task-card" class="check-box" data-task-index = "${index}"
            ${task.isCompleted ? 'checked' : ''}>
            ${task.text}
        </label>
      </div>
      `;
      taskCardsContainer.innerHTML += taskCardHTML;
      });

      const checkboxes = document.querySelectorAll('.check-box');

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
          const index = event.target.getAttribute('data-task-index');
            if (taskList[index].isCompleted === false) {
              taskList[index].isCompleted = true;
            } else {
              taskList[index].isCompleted = false;
            }
            saveTolocalStorage();
            renderTaskList();
        });
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

          inputBar.value = taskList.at(index).text;
          inputBar.focus();
          inputBtn.innerText = 'Save Edit';
          editingTaskIndex = index;
        });
      });
  };


inputBtn.addEventListener('click', () => {
  if (editingTaskIndex !== null) {
    taskList[editingTaskIndex].text = inputBar.value;
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
      taskList[editingTaskIndex].text = inputBar.value;
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