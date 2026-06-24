const inputBtn = document.querySelector('.js-input-button');
let taskList = [];
const inputBar = document.querySelector('.js-input-bar');
const taskCardsContainer = document.querySelector('.js-task-cards');

function addTask() {
    
    let inputBarText = inputBar.value.trim();
    
    if (inputBarText !== '') {
    taskList.push(inputBarText);
    
      inputBar.value = '';

      renderTaskList();
    };
  }


  function renderTaskList() {
    taskCardsContainer.innerHTML = '';

    taskList.forEach((task, index) => {
      let taskCardHTML = `
      <div class="task-container">
        <button class="edit-btn js-edit-button">Edit</button>
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
          const index = event.target.getAttribute('data-task-index')
            taskList.splice(index, 1);
            renderTaskList();
          });
        });
  }


inputBtn.addEventListener('click', () => {
  addTask();
});

inputBar.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    addTask();
  }
});