button = document.querySelector('#form');
input = document.querySelector('#input-task');
tasks = document.querySelector('#tasks');

function createLine() {
    const li = document.createElement('li');
    return li;
}

function cleanInput() {
    input.value = '';
    input.focus();
}

function appendButton(li) {
    const button = document.createElement('button');
    button.innerText = 'delete';
    button.setAttribute('class', 'delete');

    li.innerHTML += ' ';
    li.appendChild(button);
}

function createTask(text) {
    const li = createLine();
    li.innerHTML = text;
    appendButton(li);
    tasks.appendChild(li);

    saveTasks();

    cleanInput();
}

button.addEventListener('click', () => {
    if (!input.value) return;
    createTask(input.value);
});

document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.classList.contains('delete')) {
        target.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    const lines = tasks.querySelectorAll('li');
    const tasksList = [];

    for (let line of lines) {
        const text = line.innerText.replace('delete', '').trim();
        tasksList.push(text);
    }

    const json = JSON.stringify(tasksList);
    localStorage.setItem('tasks', json);
}

window.onload = () => JSON.parse(localStorage.getItem('tasks')).map(x => createTask(x));

