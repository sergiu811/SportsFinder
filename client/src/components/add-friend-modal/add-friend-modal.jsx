import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long"),
});

const AddFriendModal = ({ handleClose, show }) => {
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
          <Formik
            initialValues={{ username: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleClose();
              console.log(values);
              actions.resetForm();
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
