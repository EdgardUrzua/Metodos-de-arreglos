let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Funciones para actualizar el HTML
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.description;
        taskItem.classList.toggle("completed", task.completed);
        
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Desmarcar" : "Completar";
        completeButton.onclick = () => toggleTaskCompletion(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteTask(task.id);

        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });

    updateTaskCounts();
}

function updateTaskCounts() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}

// Funciones para manejar tareas
function addTask() {
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
        const newTask = {
            id: Date.now(),
            description: taskDescription,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = "";
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Event listeners
addTaskButton.addEventListener("click", addTask);

// Inicialización
renderTasks();
