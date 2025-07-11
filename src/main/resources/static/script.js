async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    document.getElementById('output').innerText = JSON.stringify(tasks, null, 2);
}

async function createTask() {
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

    loadTasks();
}

async function sortTrueFirst(){
    const res = await fetch('/tasks/sort-true-first');
    const tasks = await res.json();
    document.getElementById('output').innerText = JSON.stringify(tasks, null, 2);
}

async function sortFalseFirst(){
    const res = await fetch('/tasks/sort-false-first');
    const tasks = await res.json();
    document.getElementById('output').innerText = JSON.stringify(tasks, null, 2);
}

async function deleteTask() {
    const id = prompt("Enter ID:");
    if (id === null || id.trim() === "") {
        alert("ID not found");
        return;
    }

    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });

    if (response.status === 204) {
        alert("Task has been deleted");
    } else {
        alert("Error");
    }

    loadTasks();
}
