import Classes from "./login.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { AccountContext } from "../account-context";
import { useContext, useState } from "react";
import logo from "../../assets/logo-light.png";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  return (
    <div className={Classes.background}>
      <div className={Classes.stack}>
        <img className={Classes.logo} src={logo}></img>
        <h1 className={Classes.title}>Login</h1>
        <p className={Classes.backendError}>{error}</p>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            const vals = { ...values };
            fetch("http://localhost:5001/auth/login", {
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
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    isInvalid={touched.username && errors.username}
                    isValid={touched.username && !errors.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    placeholder="Username"
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
              <Form.Group className="mb-3">
                <FloatingLabel
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  label="Password"
                >
                  <Form.Control
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onChange={handleChange}
                    isInvalid={touched.password && errors.password}
                    isValid={touched.password && !errors.password}
                    onBlur={handleBlur}
                    name="password"
                    value={values.password}
                    placeholder="password"
                    type="password"
                  ></Form.Control>
                  <Form.Control.Feedback
                    style={{ fontWeight: "bold" }}
                    type="invalid"
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Button
                className="mb-3"
                style={{ fontWeight: "bold", marginTop: "30px" }}
                type="submit"
                variant="outline-light"
              >
                Login
              </Button>{" "}
              <Button
                style={{ fontWeight: "bold" }}
                variant="outline-light"
                onClick={() => navigate("/register")}
              >
                Create Account
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
