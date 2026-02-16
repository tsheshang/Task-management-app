// Select Dom Elements
const input = document.getElementById('todo-input')
const button = document.getElementById('addBtn')
const list = document.getElementById('todo-list')

// Try to load saved todos from localstorage(if there is)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // save current todo array to localstorage 
    localStorage.setItem("todos", JSON.stringify(todos));
}

// create a dom node for a todo oject and append it to the list
function createtodonode(todo, index) {
    const li = document.createElement("li");

    // checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        // visual : strike through
        textSpan.style.textDecoration = todo.completed ? "line-through" : "none";
        saveTodos();
    })

    // text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    const dateSpan = document.createElement("small");
    dateSpan.textContent = todo.createdAt;
    dateSpan.style.marginLeft = "8px";
    dateSpan.style.color = "gray";

    textSpan.style.margin = "0 8px";

    if (todo.completed) {
        textSpan.style.textDecoration = "line-through"
    }

    // add double-click event listner to edit todo
    document.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (todo !== null)
            todo.text = newText.trim()
        textSpan.textContent = todo.text;
        saveTodos();
    })

    // delete todo button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(dateSpan);
    li.appendChild(delBtn);
    return li;
}

// render the whole todos list from todos array
function render() {
    list.innerHTML = '';

    // recreate each item
    todos.forEach((todos, index) => {
        const node = createtodonode(todos, index)
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return;
    }
    //  push a new todo object
    todos.push({
        text,
        completed: false,
        createdAt: new Date().toLocaleString()
    });

    input.value = "";
    render();
    saveTodos();
}

button.addEventListener("click", addTodo);
render();