// Seleccionar un elemento por su id
document.getElementById ('formTask').addEventListener('submit', saveTask);

function saveTask(e) {

  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;

  const task = {
    title, // title: title
    description // description: description
  };

  // Almacenar datos
  if (localStorage.getItem('tasks') === null) {
    let tasks = []; // crea variable que sea un arreglo.
    tasks.push(task)// llenarlo con metodo push con la tarea nueva
    localStorage.setItem('tasks', JSON.stringify(tasks))// almacenarlo en el localStorage
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks')) // obtener las tareas almacenadas y almacenarlo en una variable
    tasks.push(task); // actualizarlas
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

                                                       // JSON.parse() "es para convertir un string en objeto"
   //localStorage.setItem('task', JSON.stringify(task)); // JSON.stringify() "es para convertir un valor a string"

   getTasks();
   document.getElementById('formTask').reset();
   e.preventDefault();
}

function getTasks(){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');

  tasksView.innerHTML = '';  // Incertarle contenid

  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-3">
      <div class="card-body">
        <p>${title} - ${description}</p>
        <a class="btn btn-danger" onclick="deleteTask('${title}')">
          Delete
        </a>
      </div>
    </div>`
  }
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i= 0; i <tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1); // A diferencia de push, splice quita los datos
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

getTasks();
