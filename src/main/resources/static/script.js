function openDeleteModal() {
    document.getElementById("deleteModal").style.display = "block";
}

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
}

async function createTask() {
    const title = prompt("Enter task title:");
    if (!title) return;

    const description = prompt("Enter task description:");
    if (description === null) return;

    const isCompletedStr = prompt("Is completed? (true/false):");
    if (isCompletedStr === null) return;

    const isCompleted = isCompletedStr.toLowerCase() === "true";

    const body = {
        title: title,
        description: description,
        isCompleted: isCompleted
    };

    await fetch('/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    loadTasks();
}

async function submitDeleteTask() {
    const id = document.getElementById('deleteId').value;

    if (id === "" || isNaN(id)) {
        alert("Please enter a valid ID.");
        return;
    }

    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.status === 204) {
        alert("Task has been deleted");
    } else {
        alert("Error deleting task");
    }

    closeDeleteModal();
    loadTasks();
}

async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    showOutput(tasks);
}

async function sortTrueFirst(){
    const res = await fetch('/tasks/sort-true-first');
    const tasks = await res.json();
    showOutput(tasks);
}

async function sortFalseFirst(){
    const res = await fetch('/tasks/sort-false-first');
    const tasks = await res.json();
    showOutput(tasks);
}

function showOutput(tasks) {
    const output = document.getElementById('output');
    if (tasks.length > 0) {
        output.style.display = 'block';
        output.innerText = JSON.stringify(tasks, null, 2);
    } else {
        output.style.display = 'none';
    }
}