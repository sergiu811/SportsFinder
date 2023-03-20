import Classes from "./friends-chat.module.css";
import { Fragment, useContext, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import StatusCircle from "../statusCircle/statusCircle";
import { FriendContext, SocketContext } from "../home/home";
import ChatList from "../chatList/chat-list";
import AddFriendModal from "../add-friend-modal/add-friend-modal";
import Button from "react-bootstrap/Button";

const FriendsChat = () => {
  const { friendList } = useContext(FriendContext);

  const { socket } = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <h1>FriendsChat</h1>
      <Button
        variant="primary"
        style={{ marginBottom: "10px" }}
        onClick={handleShow}
      >
        Add Friend
      </Button>
      <Tab.Container id="left-tabs" defaultActiveKey={friendList[0]?.username}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {friendList?.map((friend) => {
                return (
                  <Nav.Item key={friend.username}>
                    <Nav.Link
                      style={{ display: "flex" }}
                      eventKey={friend.username}
                    >
                      <StatusCircle
                        status={`${friend.connected}`}
                      ></StatusCircle>
                      {friend.username}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={7}>
            <ChatList></ChatList>
          </Col>
        </Row>
      </Tab.Container>
      <AddFriendModal show={show} handleClose={handleClose}></AddFriendModal>
    </Fragment>
  );
};

export default FriendsChat;
