// Select DOM Elements
const input = document.getElementById('todo-input');
const button = document.getElementById('add-Btn');
const list = document.getElementById('todo-list');

// Try to load saved todos from localStorage (if there is)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a DOM node for a todo object
function createtodonode(todo, index) {
    const li = document.createElement("li");

    // Checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener(
        "change",
        function () {
            todo.completed = checkbox.checked;
            saveTodos();
            render();
        }
    );

    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";

    if (todo.completed) {
        textSpan.classList.add("completed");
    }

    // Date
    const dateSpan = document.createElement("small");
    dateSpan.textContent = todo.createdAt;
    dateSpan.style.marginLeft = "8px";
    dateSpan.style.color = "gray";

    // Double-click to edit
    textSpan.addEventListener(
        "dblclick",
        function () {
            const newText = prompt("Edit todo", todo.text);
            if (newText !== null && newText.trim() !== "") {
                todo.text = newText.trim();
                saveTodos();
                render();
            }
        }
    );

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener(
        "click",
        function () {
            todos.splice(index, 1);
            render();
            saveTodos();
        }
    );

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(dateSpan);
    li.appendChild(delBtn);

    return li;
}

// Render the whole todo list
function render() {
    list.innerHTML = "";

    todos.forEach(function (todo, index) {
        const node = createtodonode(todo, index);
        list.appendChild(node);
    });
}

// Add a new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    input.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Enter") {
                addTodo();
            }
        }
    );

    todos.push({
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString("en-US")
    });

    input.value = "";
    render();
    saveTodos();
}

button.addEventListener("click", addTodo);
render();