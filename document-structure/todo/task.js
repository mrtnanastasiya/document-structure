document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task__input');
    const addButton = document.getElementById('tasks__add');
    const taskList = document.getElementById('tasks__list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = ''; // Очищаем список задач перед отображением

        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            
            const taskTitle = document.createElement('div');
            taskTitle.classList.add('task__title');
            taskTitle.textContent = task;
            
            const removeButton = document.createElement('a');
            removeButton.href = '#';
            removeButton.classList.add('task__remove');
            removeButton.innerHTML = '&times;';
            
            removeButton.addEventListener('click', (event) => {
                event.preventDefault();
                const taskElement = event.target.parentNode;
                const taskIndex = Array.from(taskElement.parentNode.children).indexOf(taskElement);

                tasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            taskElement.appendChild(taskTitle);
            taskElement.appendChild(removeButton);
            taskList.appendChild(taskElement);
        });
    };

    renderTasks();

    // Добавление задачи по нажатию клавиши Enter
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const newTask = taskInput.value.trim();
            if (newTask) {
                tasks.push(newTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
                taskInput.value = '';
            }
        }
    });

    // Добавление задачи при клике на кнопку "Добавить"
    addButton.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    });
});