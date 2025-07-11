function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

async function submitTask() {
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        isCompleted: document.getElementById('isCompleted').checked
    };

    await fetch('/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    closeModal();
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

async function deleteTask() {
    const id = prompt("Enter ID:");
    if (id === null || id.trim() === "") {
        return;
    }

    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.status === 204) {
        alert("Task has been deleted");
    }
    loadTasks();
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
