import { useContext } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { TodoContext } from "../pages";

const ErrorMessage = () => {
  const { state, updateState } = useContext(TodoContext);
  const { error } = state;

  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      <Toast isOpen={error != ""}>
        <ToastHeader
          icon="danger"
          toggle={() => updateState({ ...state, error: "" })}
        >
          Error Occured
        </ToastHeader>
        <ToastBody>{error}</ToastBody>
      </Toast>
    </div>
  );
};

export default ErrorMessage;
