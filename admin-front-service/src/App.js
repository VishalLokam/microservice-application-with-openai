import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import { Routes, Route, Link } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
import AuthUser from "./components/AuthUser";
import PreLogin from "./navbar/PreLogin";
import PostLogin from "./navbar/PostLogin";

function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <PreLogin />;
  }
  return <PostLogin />;
}

export default App;
