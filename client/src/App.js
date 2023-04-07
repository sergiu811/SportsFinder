import UserContext from "./components/account-context";
import Toolbar from "./components/toolbar/toolbar";
import Views from "./components/views/views";

function App() {
  return (
    <UserContext>
      <Views></Views>
    </UserContext>
  );
}

export default App;
