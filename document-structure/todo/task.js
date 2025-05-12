const tasksList = document.getElementById('tasks__list');
const taskInput = document.getElementById('task__input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    tasksList.innerHTML = ''; // Очищаем список задач 

    tasks.forEach((task, index) => {
        const taskTemplate = `
            <div class="task">
                <div class="task__title">${task}</div>
                <a href="#" class="task__remove" data-index="${index}">&times;</a>
            </div>
        `;
        tasksList.insertAdjacentHTML('afterbegin', taskTemplate);
    });

    // Добавляем обработчик события только на добавленные кнопки удаления
    document.querySelectorAll('.task__remove').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            const index = this.getAttribute('data-index');
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });
    });
}

renderTasks();

document.getElementById('tasks__form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = taskInput.value.trim();
    if (title !== '') {
        tasks.unshift(title);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }
});