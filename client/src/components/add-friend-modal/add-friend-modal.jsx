import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { Button, Heading, ModalOverlay } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { useGlobalContext } from "../../context";
import TextField from "../home/text-field";

const Yup = require("yup");

const validationSchema = Yup.object({
  friendName: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long"),
});

const AddFriendModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const closeModal = useCallback(() => {
    setError("");
    onClose();
    setButtonMessage("Send");
  }, [onClose]);
  const { socket } = useGlobalContext();
  const [buttonMessage, setButtonMessage] = useState("Send");

  return (
    <Modal
      bg={"rgba(25, 25, 25, 0.9) !important"}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={"rgba(35,35,35,1)"}>
        <ModalHeader fontSize={"24px"} color="rgba(240,240,240,0.9)">
          Add a friend!
        </ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values) => {
            socket.emit(
              "add_friend",
              values.friendName,
              ({ errorMsg, done }) => {
                if (done) {
                  setButtonMessage("Sent");
                  setTimeout(() => {
                    setButtonMessage("Send");
                  }, 1500);
                }
                setError(errorMsg);
              }
            );
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <ModalBody>
              <Heading fontSize="24px" color="red.500" textAlign="left" p="2px">
                {error}
              </Heading>
              <TextField
                fontSize={"24px"}
                color="rgba(240,240,240,0.9)"
                placeholder="Enter friend's username.."
                autoComplete="off"
                name="friendName"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                paddingLeft={"30px"}
                paddingRight={"30px"}
                fontSize={"24px"}
                colorScheme={buttonMessage === "Send" ? "gray" : "green"}
                type="submit"
              >
                {buttonMessage}
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
