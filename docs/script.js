let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    getTask();
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

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

function Task(title, description, completed) {
    const d = new Date();
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");

    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.date = `${yy}/${mm}/${dd} ${hh}:${min}:${ss}`;
    this.completed = completed || false;

}

function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    
    if (!confirmDelete) return;
    tasks = tasks.filter(task => task.id !== id);

    getTask();
    document.getElementById("task-view").innerHTML = "";
    notify("Task deleted!", "#b33939");
    save();
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

                <button class="crud complete-btn ${task.completed ? "checked" : ""}" onclick="toggleComplete('${task.id}', event)">
                    <svg viewBox="0 0 24 24" class="icon check-icon">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </button>

                <button class="crud delete-btn" onclick="deleteTask('${task.id}')">
                    <svg viewBox="0 0 24 24" class="icon">
                        <path d="M3 6h18M9 6v12m6-12v12M5 6l1 14h12l1-14" />
                    </svg>
                </button>

                <button class="crud edit-btn" onclick="editTask('${task.id}')">
                    <svg viewBox="0 0 24 24" class="icon">
                        <path d="M4 20h4l10-10-4-4L4 16v4zM14 6l4 4" />
                    </svg>
                </button>

            </div>
        </div>
    `;
}

function toggleComplete(id, event) {
    event.stopPropagation(); 

    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;

    save();
    notify(task.completed ? "Task marked as done" : "Task unchecked");

    openTask(id);
    getTask();
}



function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const view = document.getElementById("task-view");

    view.innerHTML = `
        <form id="edit-form" onsubmit="saveTask('${id}'); return false;">
            <div class="form-header">
                <input id="edit-title" type="text" value="${task.title}" required>
                <button type="submit" class="save-btn"><svg class="icon" viewBox="0 0 24 24"><path d="M5 3h14v18H5zM9 3v6h6V3hee" /></svg></button>
            </div>

            <textarea id="edit-desc" required>${task.description}</textarea>
        </form>
    `;
}

function saveTask(id) {
    const task = tasks.find(task => task.id === id);
    task.title = document.getElementById("edit-title").value;
    task.description = document.getElementById("edit-desc").value;

    getTask();
    openCreateForm();
    notify("Task updated!");
    save();
}

function openCreateForm() {
    const view = document.getElementById("task-view");

    view.innerHTML = `
        <form id="create-form">
            <div class="form-header">
                <input id="title" type="text" placeholder="Title..." required>
                <button type="submit" class="save-btn"><svg class="icon" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></button>
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
        save();
        getTask();
        createForm.reset();
    });
}

document.getElementById("showForms").addEventListener("click", openCreateForm);