import Tab from "react-bootstrap/Tab";

const Chat = ({ event }) => {
  return <Tab.Pane eventKey={event}>{event}</Tab.Pane>;
};

export default Chat;
