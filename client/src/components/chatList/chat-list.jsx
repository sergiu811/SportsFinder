import { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import { FriendsContext } from "../home/home";
import Chat from "./chat";

const ChatList = () => {
  const { friendsList } = useContext(FriendsContext);
  return friendsList.length > 0 ? (
    <Tab.Content>
      {friendsList.map((friend) => {
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
