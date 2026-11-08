import successful from "../assets/imgs/icons/successful.svg";

const Feedback = ({ setShowMessage, responseMessage, responseStatus }) => {
  return (
    <div className="feedback">
      <div className="feedback__images">
      {responseStatus === "error" ? (
        <ion-icon name="alert-circle-outline" className="warning"></ion-icon>
      ) : (
        <img src={successful} alt="successful" />
      )}
      </div>
      <p className="message">{responseMessage}</p>
      <ion-icon
        name="close-outline"
        onClick={() => setShowMessage(false)}
      ></ion-icon>

    </div>
  );
};

export default Feedback;
