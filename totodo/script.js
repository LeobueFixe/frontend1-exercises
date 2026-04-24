let tasks = [];

function notify(text, color = "#C2A878") {
    Toastify({
        text: text,
        duration: 2500,
        gravity: "top",
        position: "right",
        close: true,
        style: {
            background: color,
            color: "white",
            borderRadius: "8px",
            padding: "10px 15px",
            fontSize: "1rem"
        }
    }).showToast();
}


function Task(title, description) {
    const d = new Date();
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.date = `${yy}/${mm}/${dd}`;
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    getTask();
    document.getElementById("task-view").innerHTML = "";
    notify("Task deleted!", "#b33939"); 

}

function getTask() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        taskList.innerHTML += `
            <div class="task" onclick="openTask('${task.id}')">
                <h3>${task.title}</h3>
                <small>${task.date}</small>
            </div>
        `;
    });
}

function openTask(id) {
    const task = tasks.find(task => task.id === id);
    const view = document.getElementById("task-view");

    view.innerHTML = `
        <div class="task-view-content">
            <h2 class="task-title">${task.title}</h2>
            <small class="task-date">${task.date}</small>

            <p class="task-desc">${task.description}</p>

            <div class="task-actions">
                <button class="crud" onclick="deleteTask('${task.id}')">Delete</button>
                <button class="crud" onclick="editTask('${task.id}')">Edit</button>
            </div>
        </div>
    `;
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const view = document.getElementById("task-view");

    view.innerHTML = `
        <form id="edit-form" onsubmit="saveTask('${id}'); return false;">
            <div class="form-header">
                <input id="edit-title" type="text" value="${task.title}" required>
                <button type="submit">💾</button>
            </div>

            <textarea id="edit-desc" required>${task.description}</textarea>
        </form>
    `;
}

function saveTask(id) {
    const task = tasks.find(t => t.id === id);

    task.title = document.getElementById("edit-title").value;
    task.description = document.getElementById("edit-desc").value;
    getTask();

    openCreateForm();
    notify("Task updated!");
}

function openCreateForm() {
    const view = document.getElementById("task-view");

    view.innerHTML = `
        <form id="create-form">
            <div class="form-header">
                <input id="title" type="text" placeholder="Title..." required>
                <button type="submit">➕</button>
            </div>

            <textarea id="description" placeholder="Description..." required></textarea>
        </form>
    `;

    const createForm = document.getElementById("create-form");

    createForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        const newTask = new Task(title, description);
        tasks.push(newTask);
        notify("Task created successfully!");

        getTask();
        createForm.reset();});
}

document.getElementById("showForms").addEventListener("click", openCreateForm());