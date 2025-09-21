const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("priority");
const modeToggle = document.getElementById("modeToggle");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on load
tasks.forEach(task => addTaskToDOM(task));

// Add task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (text === "") return;

    const task = { text, completed: false, priority };
    tasks.push(task);
    saveTasks();
    addTaskToDOM(task);
    taskInput.value = "";
});

// Add task to DOM
function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.setAttribute("data-priority", task.priority);
    if (task.completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        saveTasks();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
        tasks = tasks.filter(t => t !== task);
        saveTasks();
    });

    li.appendChild(deleteBtn);
    li.setAttribute("draggable", "true");
    addDragAndDrop(li, task);
    taskList.appendChild(li);
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dark/Light Mode
modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Filter Tasks
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        Array.from(taskList.children).forEach(li => {
            li.style.display = (filter === "all" || 
                               (filter === "completed" && li.classList.contains("completed")) || 
                               (filter === "pending" && !li.classList.contains("completed")))
                               ? "flex" : "none";
        });
    });
});

// Drag-and-Drop
function addDragAndDrop(li, task) {
    li.addEventListener("dragstart", e => {
        li.classList.add("dragging");
    });
    li.addEventListener("dragend", e => {
        li.classList.remove("dragging");
        // Update tasks order in localStorage
        const newOrder = Array.from(taskList.children).map(li => {
            const t = tasks.find(t => t.text === li.firstChild.textContent);
            return t;
        });
        tasks = newOrder;
        saveTasks();
    });
}

taskList.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
        taskList.appendChild(dragging);
    } else {
        taskList.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
