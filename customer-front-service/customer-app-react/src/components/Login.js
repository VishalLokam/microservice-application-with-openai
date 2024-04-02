import { useState } from "react";
import AuthUser from "./AuthUser";

export default function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    console.log(email + " " + password);
    http
      .post("http://127.0.0.1:7070/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setToken(res.data.user, res.data.token);
      });
  };

  return (
    <div className="row justify-content-center pt-5">
      <form action="/action_page.php">
        <div className="mb-3 mt-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
}
