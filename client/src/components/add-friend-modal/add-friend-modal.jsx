import React, { useCallback, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Formik } from "formik";
import * as Yup from "yup";
import { FriendContext, SocketContext } from "../home/home";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long"),
});

const AddFriendModal = ({ handleClose, show }) => {
  const { setFriendList } = useContext(FriendContext);
  const { socket } = useContext({ ...SocketContext });
  const closeModal = useCallback(() => {
    setError("");
    handleClose();
  }, [handleClose]);
  const [error, setError] = useState("");
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            border: 0,
            background: "black",
            backgroundAttachment: "white",
          }}
          closeButton
        >
          <Modal.Title style={{ color: "white" }}>Add friend</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "black" }}>
          <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
          <Formik
            initialValues={{ username: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              socket.emit(
                "add_friend",
                values.username,
                ({ errorMsg, done, newFriend }) => {
                  console.log(done);
                  if (done) {
                    setFriendList((c) => [newFriend, ...c]);
                    closeModal();
                    return;
                  }
                  setError(errorMsg);
                }
              );
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    style={{
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    label="Username"
                  >
                    <Form.Control
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      isValid={touched.username && !errors.username}
                      isInvalid={touched.username && errors.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="username"
                      placeholder="username"
                      value={values.username}
                    ></Form.Control>
                    <Form.Control.Feedback
                      style={{ fontWeight: "bold" }}
                      type="invalid"
                    >
                      {errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Modal.Footer style={{ background: "black", border: 0 }}>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer style={{ border: 0, background: "black" }}></Modal.Footer>
      </Modal>
    </>
  );
};
export default AddFriendModal;
