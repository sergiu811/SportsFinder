import UserContext from "./components/account-context";
import Views from "./components/views/views";
import socket from "./socket";

function App() {
  return (
    <UserContext>
      <Views></Views>
    </UserContext>
  );
}

export default App;
