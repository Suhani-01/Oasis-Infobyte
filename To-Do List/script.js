const inp = document.querySelector(".inp");
const add = document.querySelector(".add");
const tods = document.querySelector(".tods");
const empty = document.querySelector(".empty");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const del = document.querySelector(".del");
const filr = document.querySelectorAll(".filr");
let filter = '';

function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return '';
  }
  let checked = todo.status == "completed" ? "checked" : "";
  return /* html */ `
    <li class="tod">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `; 
}

function showTodos() {
  if (todosJson.length == 0) {
    tods.innerHTML = '';
    empty.style.display = 'block';
  } else {
    tods.innerHTML = todosJson.map(getTodoHtml).join('');
    empty.style.display = 'none';
  }
}

function addTodo(todo)  {
  inp.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

inp.addEventListener("keyup", e => {
  let todo = inp.value.trim();
  if (!todo || e.key != "Enter") {
    return;
  }
  addTodo(todo);
});

add.addEventListener("click", () => {
  let todo = inp.value.trim();
  if (!todo) {
    return;
  }
  addTodo(todo);
});

function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

filr.forEach(function (el) {
  el.addEventListener("click", (e) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      filter = '';
    } else {
      filr.forEach(tag => tag.classList.remove('active'));
      el.classList.add('active');
      filter = e.target.dataset.filter;
    }
    showTodos();
  });
});

del.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});
