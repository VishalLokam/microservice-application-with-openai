import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  function navClick() {
    navigate("/dashboard");
  }
  return (
    <div className="ms-5">
      <button type="button" className="btn btn-light" onClick={navClick}>
        ← dashboard
      </button>
    </div>
  );
}
