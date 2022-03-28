import { useState, useContext } from "react";
import { ImPlus } from "react-icons/im";
import { Spinner } from "reactstrap";
import { uploadTodo } from "../helpers/todoHelper";
import { TodoContext } from "../pages";

const TodoForm = () => {
  const { state, updateState } = useContext(TodoContext);
  const [values, setValues] = useState({ name: "", details: "" });
  const [loading, setLoading] = useState(false);
  const { name, details } = values;

  const handleChange = (name) => (e) =>
    setValues({ ...values, [name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const todo = await uploadTodo({ name, details });
      if (!todo.error) {
        setValues({ name: "", details: "" });
        updateState({ ...state, reload: true });
      } else updateState({ ...state, error: todo.reason.message });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="row">
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
            {loading ? <Spinner size="sm" /> : <ImPlus />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
