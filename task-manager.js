const inputBtn = document.querySelector('.js-input-button');
let taskList = [];
const inputBar = document.querySelector('.js-input-bar');

function addTask() {
    
    let inputBarText = inputBar.value.trim();
    
    if (inputBarText !== '') {
    taskList.push(inputBarText);

    const taskCardsContainer = document.querySelector('.js-task-cards');
    taskCardsContainer.innerHTML = '';

    taskList.forEach((task) => {
      let taskCardHTML = `
      <div class="task-container">
        <button class="edit-btn">Edit</button>
        <button class="remove-btn">Remove</button>
        <label>
            <input type="checkbox" name="task-card">
            ${task}
        </label>
      </div>
      `;
      taskCardsContainer.innerHTML += taskCardHTML;
      });
      inputBar.value = ''; 
    };
  }


inputBtn.addEventListener('click', () => {
  addTask();
});

inputBar.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    addTask();
  }
});
  