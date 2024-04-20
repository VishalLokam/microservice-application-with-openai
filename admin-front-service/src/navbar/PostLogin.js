import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";
import AuthUser from "../components/AuthUser";

function PostLogin() {
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-dark bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard" href="#">
            Pet Store Co.
          </Link>
        </div>
        <div className="container-fluid justify-content-center">
          <span className="navbar-text">Admin Console</span>
        </div>
        <div className="container-fluid justify-content-end">
          <span
            role="button"
            className="btn btn-outline-danger"
            onClick={logoutUser}
          >
            Logout
          </span>
        </div>
      </nav>
    </div>
  );
}

export default PostLogin;
