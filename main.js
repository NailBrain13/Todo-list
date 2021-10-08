const addTaskBtn = document.getElementById('add-task-btn'),
  desTaskInput = document.getElementById('des-task'),
  toDosWrapper = document.querySelector('.todos-wrapper');

function Task(desc) {
  this.desc = desc;
  this.completed = false;
}

let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem('tasks')));

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTemplate = (task, index) => {
  return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
      <div class="description">${task.desc}</div>
        <div class="buttons">
          <input onclick="completeTask(${index})" type="checkbox" class="btn-complete"
          ${task.completed ? 'checked' : ''}
          />
          <button onclick="delTask(${index})" class="btn-delete">Del</button>
      </div>
    </div>
  `;
};

const filterTask = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed === false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed === true);

  tasks = [...activeTasks, ...completedTasks];
};

let todoItemEls = [];

const fillTask = () => {
  toDosWrapper.innerHTML = '';
  if (tasks.length > 0) {
    filterTask();
    tasks.forEach((item, index) => {
      toDosWrapper.innerHTML += createTemplate(item, index);
    });
    todoItemEls = document.querySelectorAll('.todo-item');
  }
};

fillTask();

const checkData = () => {
  updateLocalStorage();
  fillTask();
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemEls[index].classList.add('checked');
  } else {
    todoItemEls[index].classList.remove('checked');
  }
  checkData();
};

const delTask = (index) => {
  todoItemEls[index].classList.add('delition');
  setTimeout(() => {
    tasks.splice(index, 1);
    checkData();
  }, 1500);
};

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(desTaskInput.value));
  checkData();
  desTaskInput.value = '';
});
