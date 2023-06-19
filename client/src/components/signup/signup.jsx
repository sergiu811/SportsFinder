import Classes from "./signup.module.css";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { AccountContext } from "../account-context";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import logo from "../../assets/logo-light.png";
import { Box, Heading, Text } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character"
    ),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className={Classes.background}>
      <Box className={Classes.stack}>
        <img className={Classes.logo} src={logo}></img>
        <Heading className={Classes.title}>Sign Up</Heading>
        <Text className={Classes.backendError}>{error}</Text>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            const vals = { ...values };
            fetch("http://localhost:5001/auth/signup", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(vals),
            })
              .catch((err) => {
                return;
              })
              .then((res) => {
                if (!res || !res.ok || res.status >= 400) {
                  return;
                }
                return res.json();
              })
              .then((data) => {
                if (!data) return;
                setUser({ ...data });
                if (data.status) {
                  setError(data.status);
                } else if (data.loggedIn) {
                  localStorage.setItem("token", data.token);
                  navigate("/home");
                }
              });
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
            <Form
              style={{
                width: "300px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
              noValidate
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3">
                <FloatingLabel
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  label="Username"
                >
                  <Form.Control
                    className="position-relative"
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
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      marginLeft: "5px",
                    }}
                    type="invalid"
                  >
                    {errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <div style={{ display: "flex", position: "relative" }}>
                <Form.Group style={{ width: "80%" }} className="mb-3">
                  <FloatingLabel
                    className="position-relative"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    label="Password"
                  >
                    <Form.Control
                      className="position-relative"
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: ".375rem 0px 0px .375rem",
                      }}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                      onBlur={handleBlur}
                      name="password"
                      value={values.password}
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                    ></Form.Control>

                    <Form.Control.Feedback
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        marginLeft: "5px",
                      }}
                      type="invalid"
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  onClick={togglePasswordVisibility}
                  style={{
                    display: "flex",
                    position: "absolute",
                    right: "1px",
                    height: "28px",
                    padding: "28px",
                    borderRight: "1px solid white",
                    borderBottom: "1px solid white",
                    borderTop: "1px solid white",
                    borderLeft: "none",
                    borderRadius: "0px .375rem .375rem 0px ",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "none",
                    cursor: "pointer",
                    paddingRight: "20px",
                    color: showPassword ? "white" : "white",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              <Button
                className="mb-3"
                style={{ fontWeight: "bold", marginTop: "30px" }}
                variant="outline-light"
                type="submit"
              >
                Create Account
              </Button>{" "}
              <Button
                variant="outline-light"
                style={{ fontWeight: "bold" }}
                onClick={() => navigate("/")}
              >
                Back
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default SignUp;
