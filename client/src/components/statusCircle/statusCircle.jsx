import Classes from "./status-circle.module.css";

const StatusCircle = ({ status }) => {
  return <div className={Classes[status]}></div>;
};
export default StatusCircle;
