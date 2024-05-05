import { useState } from "react";
import AuthUser from "./AuthUser";
import LoginAlert from "./LoginAlert";

export default function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [visiblity, setVisiblity] = useState("invisible");
  const [loginAlertMessage, setLoginAlertMessage] = useState("");

  const submitLoginForm = (e) => {
    e.preventDefault();
    http
      .post(`http://${process.env.REACT_APP_INGRESS_PUBLIC_IP}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (
          res.data.message === "Password Incorrect" ||
          res.data.message === "User does not exist"
        ) {
          console.log(res.data.message);
          setLoginAlertMessage(res.data.message);
          setVisiblity("visible");
        } else {
          setToken(res.data.user, res.data.token);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
        setLoginAlertMessage(
          "There is an issue in Authentication service. Please try again later."
        );
        setVisiblity("visible");
      });
  };

  return (
    <div className="row justify-content-center p-5 m-5 ">
      <form action="/action_page.php">
        <div className="mb-3 mt-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setVisiblity("invisible");
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
            onChange={(e) => {
              setPassword(e.target.value);
              setVisiblity("invisible");
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={submitLoginForm}
        >
          Submit
        </button>
        <LoginAlert
          visiblity={visiblity}
          loginAlertMessage={loginAlertMessage}
        />
      </form>
    </div>
  );
}
