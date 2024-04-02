import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Routes, Route, Link } from "react-router-dom";
// import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
// import AuthUser from "../components/AuthUser";

function PreLogin() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-dark bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" href="#">
            Pet Store Co.
          </Link>
        </div>
        <div className="container-fluid">
          <span className="navbar-text">Admin login</span>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default PreLogin;
