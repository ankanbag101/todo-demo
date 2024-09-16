import { ImWarning } from "react-icons/im";

const EmptyWarning = () => {
  return (
    <div className="alert alert-dark d-flex align-items-center">
      <ImWarning className="fs-3" />
      <div className="ms-2">There's no todos for now.</div>
    </div>
  );
};

export default EmptyWarning;
