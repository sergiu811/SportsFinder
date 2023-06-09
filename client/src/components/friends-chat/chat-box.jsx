import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "../../context";

const ChatBox = ({ userid }) => {
  const { setMessages, socket } = useGlobalContext();
  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1).max(255),
      })}
      onSubmit={(values, actions) => {
        if (values.message != "") {
          const message = { to: userid, from: null, content: values.message };
          socket.emit("dm", message);
          setMessages((prevMsgs) => [message, ...prevMsgs]);
          actions.resetForm();
        }
      }}
    >
      <HStack color={"white"} as={Form} w="100%" pb="10px" px="1.4rem">
        <Input
          sx={{
            "::placeholder": {
              color: "white",
              fontWeight: "bold",
            },
          }}
          bg={"rgba(25, 25, 25, 0.9)"}
          as={Field}
          name="message"
          placeholder="Type message here.."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" size="lg" colorScheme="gray">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default ChatBox;
