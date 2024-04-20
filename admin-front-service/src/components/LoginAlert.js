export default function LoginAlert({ visiblity, loginAlertMessage }) {
  if (visiblity === "visible") {
    return (
      <div>
        <div className="alert alert-danger" role="alert">
          ⚠️ {loginAlertMessage}
        </div>
      </div>
    );
  }
}
