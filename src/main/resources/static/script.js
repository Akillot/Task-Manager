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