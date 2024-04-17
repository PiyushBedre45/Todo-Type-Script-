import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myform = document.getElementById("myform") as HTMLFormElement;

myform.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.floor(Math.random() * 10000)),
  };

  todos.push(todo);
  todoInput.value = "";
  console.log(todos);
  renderTodo(todos);
};

const generateTodoItems = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  //  creating p for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;

  //  creating delete button

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    console.log("delete");
    deleteTodo(id);
  };

  // appending alll to TodoItem
  todo.append(checkBox, paragraph, btn);
  todoContainer.append(todo);
};

const deleteTodo = (id: String) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItems(item.title, item.isCompleted, item.id);
  });
};
