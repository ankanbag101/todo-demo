import { useContext, useState } from "react";
import { ImBin, ImCheckmark, ImUndo2 } from "react-icons/im";
import { removeTodo, updateTodo } from "../helpers/todoHelper";
import { TodoContext } from "../pages";
import TodoDetails from "./TodoDetails";

const Todo = ({ todo }) => {
  const { state, updateState } = useContext(TodoContext);
  const [open, setOpen] = useState(false);

  const markDone = (id, done) => async () => {
    const todo = await updateTodo(id, { done });
    if (!todo.error) updateState({ ...state, reload: true });
    else updateState({ ...state, error: todo.reason.message });
  };

  const removeItem = (id) => async () => {
    const todo = await removeTodo(id);
    if (!todo.error) updateState({ ...state, reload: true });
    else updateState({ ...state, error: todo.reason.message });
  };

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      key={todo._id}
    >
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        {todo.done ? <strike>{todo.name}</strike> : todo.name}
        <TodoDetails todo={todo} open={open} setOpen={setOpen} />
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
        <button className="btn" onClick={removeItem(todo._id)} title="Remove">
          <ImBin />
        </button>
      </div>
    </li>
  );
};

export default Todo;
