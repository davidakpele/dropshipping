import cancelled from "../assets/imgs/icons/cancelled.svg";
import successful from "../assets/imgs/icons/successful.svg";

const Alert = ({ alertMsg, alertStatus, setShowAlert }) => {
  const show = setInterval(() => {
    setShowAlert(false);
    clearInterval(show);
  }, 7000);

  return (
    <div
      className={`${
        alertStatus === "success" ? "success__notify" : "error__notify"
      } alert`}
    >
      {alertStatus === "success" ? (
        <img src={successful} alt="successful" />
      ) : (
        <img src={cancelled} alt="error" />
      )}
      <div className="alert__message">
        <p className="alert__message__heading">
          {alertStatus === "success"
            ? "Request is Successful"
            : "Request is unsuccessful"}
        </p>
        <p className="alert__message__body">{alertMsg}</p>
      </div>
      <ion-icon
        name="close-outline"
        onClick={() => setShowAlert(false)}
      ></ion-icon>
    </div>
  );
};

export default Alert;
