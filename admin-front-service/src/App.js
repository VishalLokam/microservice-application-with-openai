import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
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
