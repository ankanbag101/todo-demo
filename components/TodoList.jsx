import { useState, useEffect, useContext } from "react";
import { TodoContext } from "../pages";
import { ImBin, ImCheckmark, ImWarning, ImUndo2 } from "react-icons/im";
import { getTodos } from "../helpers/todoHelper";
import Todo from "./Todo";
import EmptyWarning from "./EmptyWarning";

const TodoList = ({ list }) => {
  const [todos, setTodos] = useState(list);
  const { state, updateState } = useContext(TodoContext);
  const { reload } = state;

  const fetchTodos = async () => {
    const todos = await getTodos();
    if (todos.error) updateState({ ...state, error: todos.reason.message });
    else setTodos(todos.data);
  };

  useEffect(() => {
    if (reload) {
      fetchTodos();
      updateState({ ...state, reload: false });
    }
  }, [reload]);

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <ul className="list-group">
          {todos.length ? (
            todos.map((todo) => <Todo todo={todo} />)
          ) : (
            <EmptyWarning />
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
