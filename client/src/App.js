import UserContext, { AccountContext } from "./components/account-context";
import Views from "./components/views/views";
import { Box } from "@chakra-ui/react";
import background from "../src/assets/background2.jpeg";

function App() {
  return (
    <UserContext>
      <Views></Views>
    </UserContext>
  );
}

export default App;
