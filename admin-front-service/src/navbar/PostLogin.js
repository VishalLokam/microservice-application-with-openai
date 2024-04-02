import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "../components/Dashboard";
// import Login from "../components/Login";
import AuthUser from "../components/AuthUser";
import AddProduct from "../components/AddProduct";
// import ProductCard from "../components/ProductCard";
import ProductsPage from "../components/ProductsPage";

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
        className="navbar navbar-expand-lg bg-dark bg-body-tertiary"
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

      <div className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/get-all-products" element={<ProductsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default PostLogin;
