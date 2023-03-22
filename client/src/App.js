import UserContext from "./components/account-context";
import Views from "./components/views/views";
import socket from "./socket";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <UserContext>
        <Views></Views>
      </UserContext>
    </ChakraProvider>
  );
}

export default App;
