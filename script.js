let todos = [];

function agregarTarea() {
  const input = document.getElementById("todoInput");
  const todoText = input.value;
  if (todoText !== "") {
    const timestamp = new Date().getTime();
    todos.push({ text: todoText, created: timestamp, completed: null });
    cargarLista();
    input.value = "";
  }
}

function cargarLista() {
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    todos.forEach(todo => {
      const li = document.createElement("li");
      const todoText = document.createElement("span"); 
      todoText.textContent = todo.text;
      if (todo.completed) {
        todoText.style.textDecoration = "line-through"; 
      }
      li.appendChild(todoText);
      li.appendChild(document.createTextNode(" - Creado: " + new Date(todo.created).toLocaleString() + (todo.completed ? " - Completado: " + new Date(todo.completed).toLocaleString() : "")));
      li.onclick = () => Completar(todo);
      list.appendChild(li);
    });
  
  }


function Completar(todo) {
  if (!todo.completed) {
    todo.completed = new Date().getTime();
  } else {
    todo.completed = null;
  }
  cargarLista();
}

function mostrarTareaMasVeloz() {
  const tareaMasVeloz = todos.reduce((min, todo) => todo.completed && (min === null || todo.completed < min.completed) ? todo : min, null);
  if (tareaMasVeloz) {
    alert("La tarea mas veloz es: " + tareaMasVeloz.text);
  } else {
    alert("No hiciste nada aun amigazo");
  }
}

function BorrarTodo() {
    todos = []; 
    cargarLista();
}

Enter=(e) =>{
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        agregarTarea();
    }
}