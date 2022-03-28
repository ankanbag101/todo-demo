import { ImWarning } from "react-icons/im";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const TodoDetails = ({ todo, setOpen, open }) => {
  return (
    <Modal isOpen={open} toggle={() => setOpen(false)}>
      <ModalHeader toggle={() => setOpen(false)}>{todo.name}</ModalHeader>
      <ModalBody>
        {todo.details ? (
          todo.details
        ) : (
          <div>
            <ImWarning /> There's no details for the Todo
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default TodoDetails;
