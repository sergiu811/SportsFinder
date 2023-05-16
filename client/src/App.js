import UserContext, { AccountContext } from "./components/account-context";
import Views from "./components/views/views";

function App() {
  return (
    <UserContext>
      <Views></Views>
    </UserContext>
  );
}

export default App;
