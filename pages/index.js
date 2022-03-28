import Head from "next/head";
import { useState, useEffect } from "react";
import { ImBin, ImCheckmark, ImPlus, ImWarning, ImUndo2 } from "react-icons/im";

export default function Home({ todoList }) {
  const [todos, setTodos] = useState(todoList);
  const [values, setValues] = useState({ name: "", details: "" });
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");
  const { name, details } = values;

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const uploadTodo = (todo) =>
    fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then((res) => res.json());

  const updateTodo = (id, todo) =>
    fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }).then((res) => res.json());

  const markDone = (id, done) => async (e) => {
    setLoading(true);
    try {
      const todo = await updateTodo(id, { done });
      if (!todo.error) setReload(true);
      else setError(todo.reason.message);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = (id) => (e) =>
    fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((_) => setReload(true))
      .catch((err) => console.error(err));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const todo = await uploadTodo({ name, details });
      if (!todo.error) {
        setValues({ name: "", details: "" });
        setReload(true);
      } else setError(todo.reason.message);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (reload) {
      fetch("http://localhost:3000/api/todos")
        .then((res) => res.json())
        .then((todos) => setTodos(todos.data));
      setReload(false);
    }
  }, [reload]);

  return (
    <div className="container">
      <Head>
        <title>Demo Todo</title>
        <meta name="description" content="A todo app generated using NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-5 row">
        <div className="col-lg-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control form-control-lg mb-2"
              type="text"
              placeholder="Write your todo"
              value={name}
              onChange={handleChange("name")}
              required
            />
            <textarea
              className="form-control mb-2"
              placeholder="Write any details about the todo (OPTIONAL)"
              value={details}
              onChange={handleChange("details")}
              rows="2"
            />
            <button
              className="btn btn-warning"
              type="submit"
              title="Create"
              disabled={loading}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
              ) : (
                <ImPlus />
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-8 mx-auto">
          <ul className="list-group">
            {todos.length ? (
              todos.map((todo) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={todo._id}
                >
                  <div title={todo.details}>
                    {todo.done ? <strike>{todo.name}</strike> : todo.name}
                  </div>
                  <div>
                    {todo.done ? (
                      <button
                        className="btn"
                        onClick={markDone(todo._id, false)}
                        title="Mark Incomplete"
                      >
                        <ImUndo2 />
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={markDone(todo._id, true)}
                        title="Mark Complete"
                      >
                        <ImCheckmark />
                      </button>
                    )}
                    <button
                      className="btn"
                      onClick={removeItem(todo._id)}
                      title="Remove"
                    >
                      <ImBin />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <h2 className="text-center">
                <ImWarning />
                There's no todos for now.
              </h2>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const todos = await fetch("http://localhost:3000/api/todos").then((res) =>
    res.json()
  );
  return {
    props: { todoList: todos.data },
  };
}
