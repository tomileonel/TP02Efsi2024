let todos = [];

function agregarTarea() {
  let input = document.getElementById("todoInput");
  const todoText = validarTarea(input.value);
  const tareaExistente = todos.find(tarea => tarea.text === todoText);
  if (tareaExistente) {
    alert("Ya existe una tarea con ese nombre.");
  }else{
  if (todoText !== "") {
    const timestamp = new Date().getTime();
    todos.push({ text: todoText, created: timestamp, completed: null });
    cargarLista();
    input.value = "";
  }
}
}

function cargarLista() {
  const list = document.getElementById("todoList");
  let listHTML = "";
  todos.forEach(todo => {
      listHTML += `<li onclick="Completar(this)" data-created="${todo.created}" data-completed="${todo.completed || ''}">`;
      listHTML += `<span style="${todo.completed ? 'text-decoration: line-through;' : ''}">${todo.text}</span>`;
      listHTML += ` - Creado: ${new Date(todo.created).toLocaleString()}`;
      if (todo.completed) {
          listHTML += ` - Completado: ${new Date(todo.completed).toLocaleString()}`;
      }
      listHTML += `</li>`;
  });
  list.innerHTML = listHTML;
}


function Completar(elementoLista) {
  const todoText = elementoLista.textContent.split(" - ")[0];
  const todo = todos.find(item => item.text === todoText);
  if (!todo.completed) {
      todo.completed = new Date().getTime();
  } else {
      todo.completed = null;
  }
  cargarLista();
}


function mostrarTareaMasVeloz() {
  const tareaMasVeloz = todos.reduce((min, todo) => {
      if (todo.completed && (min === null || (todo.completed - todo.created) < (min.completed - min.created))) {
          return todo;
      } else {
          return min;
      }
  }, null);

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

function validarTarea(tarea) {
  while (tarea.toString().includes(" - ")) {
      tarea = tarea.toString().replace(" - ", "").trim();
  }
  return tarea;
}

Enter=(e) =>{
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        agregarTarea();
    }
}