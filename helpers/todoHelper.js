export const getTodos = () =>
  fetch("http://localhost:3000/api/todos").then((res) => res.json());

export const getTodo = (id) =>
  fetch(`http://localhost:3000/api/todo/${id}`).then((res) => res.json());

export const uploadTodo = (todo) =>
  fetch("http://localhost:3000/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

export const updateTodo = (id, todo) =>
  fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

export const removeTodo = (id) =>
  fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
