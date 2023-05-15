import { Text, VStack, Box, Heading } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useEffect, useRef } from "react";
import ChatBox from "./chat-box";
import { useGlobalContext } from "../../context";

const Chat = ({ userid }) => {
  const { friendList, messages } = useGlobalContext();
  const bottomDiv = useRef(null);

  useEffect(() => {
    bottomDiv.current?.scrollIntoView();
  });

  return friendList.length > 0 ? (
    <>
      <VStack maxHeight="inherit" justify="end" h="75vh">
        <TabPanels overflowY="scroll">
          {friendList.map((friend) => (
            <VStack
              flexDir="column-reverse"
              as={TabPanel}
              key={`chat:${friend.username}`}
            >
              <div ref={bottomDiv} />
              {messages
                .filter(
                  (msg) =>
                    msg.to === friend.userid || msg.from === friend.userid
                )
                .map((message, idx) => (
                  <Text
                    m={
                      message.to === friend.userid
                        ? "1rem 0 0 auto !important"
                        : "1rem auto 0 0 !important"
                    }
                    maxW="50%"
                    key={`msg:${friend.username}.${idx}`}
                    fontSize="lg"
                    bg={message.to === friend.userid ? "blue.100" : "gray.100"}
                    color="gray.800"
                    borderRadius="10px"
                    p="0.5rem 1rem"
                  >
                    {message.content}
                  </Text>
                ))}
            </VStack>
          ))}
        </TabPanels>
        <ChatBox userid={userid} />
      </VStack>
    </>
  ) : (
    <VStack justify="center" w="100%" textAlign="center" fontSize="lg">
      <TabPanels>
        <TabPanel>
          <Box borderRadius="10px" boxShadow="1px 3px 7px 1px" p="20px">
            <Heading color="rgba(240,240,240,0.9)" size="sm" align="center">
              No friends :(
            </Heading>
          </Box>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
