import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../libries";
import Feedback from "../components/Feedback";

// images
import logo from "../assets/imgs/shopnig.png";
import loginphoto from "../assets/imgs/loginphoto.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // state to get email for forgot password
  const [forgotPassEmail, setForgotPassEmail] = useState("");

  // state to keep response message from the backend
  const [responseMessage, setResponseMessage] = useState("");

  // state to keep response status [error or success] from the backend
  const [responseStatus, setResponseStatus] = useState("");

  // state to show response from the backend
  const [showMessage, setShowMessage] = useState(false);

  // state to show any error
  // let forgotError;

  const [forgotError, setForgotError] = useState("");


  // activate forgot password button
  const activateForgot = forgotPassEmail !== "" && forgotError === "";

  const forgetPassword = () => {
    axios({
      url: `${baseUrl}/forgot/password`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email: forgotPassEmail }),
    })
      .then((response) => {
        console.log(response);
        if (response) {
          console.log(response.data.message);
          setResponseMessage(response.data.message);
          setResponseStatus("success");
          setShowMessage(true);

          const interval = setInterval(() => {
            navigate("/reset-password");
            clearInterval(interval);
          }, 4000);
        }
      })
      .catch((error) => {
        setResponseMessage(error.response.data.message);
        setResponseStatus("error");
        setShowMessage(true);
        console.log(error);
      });
  };

  const handleSubmitForgotPassword = (e) => {
    e.preventDefault();
    forgetPassword();
  };

  useEffect(() => {
    if (forgotPassEmail && !/\S+@\S+\.\S+/.test(forgotPassEmail)) {
      setForgotError("Email address is invalid");
    }
    else{
      setForgotError("")
    }
  }, [forgotPassEmail])

  console.log(forgotError)

  return (
    <div className="auth__container">
      <div className="auth__photo">
        <img src={loginphoto} alt="login photo" />
      </div>
      <form onSubmit={handleSubmitForgotPassword} className="form__auth">
        <div className="auth">
          <div className="auth__main">
            <div className="auth__img-block">
              <img src={logo} alt="" className="auth__img" />
            </div>
            <div className="auth__card">
              <div className="auth__card-main">
                <div className="auth__header">
                  <h3 className="auth__heading">Forgot Password</h3>
                  <p className="auth__subheading">
                    An OTP would be sent to your registered email
                  </p>
                </div>
                <div className="auth__form mb-large">
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="form-input"
                      name="email"
                      value={forgotPassEmail}
                      onChange={(e) => setForgotPassEmail(e.target.value)}
                    />
                    {forgotError && (
                      <p className="error__messages">{forgotError}</p>
                    )}
                  </div>
                  {showMessage && (
                    <Feedback
                    responseMessage={responseMessage}
                    setShowMessage={setShowMessage}
                    responseStatus={responseStatus}
                    />
                  )}
                  <button
                    type="submit"
                    className={`${
                      activateForgot ? "enabled" : "disabled"
                    } button-primary`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
