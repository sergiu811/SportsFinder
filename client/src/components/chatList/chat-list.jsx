import { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import { FriendContext } from "../home/home";
import Chat from "./chat";

const ChatList = () => {
  const { friendList } = useContext(FriendContext);
  return friendList.length > 0 ? (
    <Tab.Content>
      {friendList.map((friend) => {
        return <Chat event={friend.username} key={friend.username}></Chat>;
      })}
    </Tab.Content>
  ) : (
    <Tab.Content>
      <h1 style={{ textAlign: "center" }}>No Friends :(</h1>
    </Tab.Content>
  );
};
export default ChatList;
