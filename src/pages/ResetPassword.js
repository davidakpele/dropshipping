import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../libries";
import Feedback from "../components/Feedback";
import { validateReset } from "../validate";

// images
import logo from "../assets/imgs/shopnig.png";
import loginphoto from "../assets/imgs/loginphoto.svg";


const ResetPassword = () => {
  const navigate = useNavigate();

  // state holding reset inputs
  const [resetPassword, setResetPassword] = useState({
    password: "",
    password_confirmation: "",
    password_reset_token: "",
  });

  // state to keep response from the backend
  const [responseMessage, setResponseMessage] = useState("");

  // state to keep response status [error or success] from the backend
  const [responseStatus, setResponseStatus] = useState("");

  // state to show response from the backend
  const [showMessage, setShowMessage] = useState(false);

  // state for frontend error message validation
  const [errorMessage, setErrorMessage] = useState({});

  // STATE to show password or hide password
  const [showPassword, setShowPassword] = useState(false);

  // STATE to show confirm-password or hide confirm-password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   // checking if inputs are not empty and if error messages is empty object
   const isEmptyInput = Object.values(resetPassword).every((val) => val !== "");
   const isEmptyError = Object.values(errorMessage).every((val) => val === "");

   // activate reset button
 const activateReset =  isEmptyInput && isEmptyError;


  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetPassword({
      ...resetPassword,
      [name]: value,
    });
  };

  const reset = () => {
    axios({
      url: `${baseUrl}/reset/password`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(resetPassword),
    })
      .then((response) => {
        console.log(response);
        setResponseMessage(response.data.message);
        setResponseStatus("success");
        setShowMessage(true);

        const interval = setInterval(() => {
          navigate("/login");
          clearInterval(interval);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setResponseMessage(error.response.data.message);
        setResponseStatus("error");
        setShowMessage(true);
      });
  };

  useEffect(() => {
    setErrorMessage(validateReset(resetPassword));
  }, [resetPassword]);

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  return (
    <div className="auth__container">
      <div className="auth__photo">
        <img src={loginphoto} alt="login photo" />
      </div>
      <form onSubmit={handleReset} className="form__auth">
        <div className="auth">
          <div className="auth__main">
            <div className="auth__img-block">
              <img src={logo} alt="" className="auth__img" />
            </div>
            <div className="auth__card">
              <div className="auth__card-main">
                <div className="auth__header">
                  <h3 className="auth__heading">Reset Password</h3>
                  <p className="auth__subheading">
                    Kindly provide your new password and the otp
                  </p>
                </div>
                <div className="auth__form">
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      New password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        value={resetPassword.password}
                        onChange={handleResetChange}
                      />
                      <div
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? (
                          <ion-icon name="eye-outline"></ion-icon>
                        ) : (
                          <ion-icon name="eye-off-outline"></ion-icon>
                        )}
                      </div>
                    </div>
                    <label htmlFor="" className="form-bottom-label">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      <p>
                        Password must include 8-16 characters, lowercases &
                        atleast character
                      </p>
                    </label>
                    {errorMessage.password && (
                      <p className="error__messages">
                        {errorMessage.password}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Confirm password
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={resetPassword.password_confirmation}
                        onChange={handleResetChange}
                      />
                      <div
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        {showConfirmPassword ? (
                          <ion-icon name="eye-outline"></ion-icon>
                        ) : (
                          <ion-icon name="eye-off-outline"></ion-icon>
                        )}
                      </div>
                    </div>
                    {errorMessage.password_confirmation && (
                      <p className="error__messages">
                        {errorMessage.password_confirmation}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      {" "}
                      OTP{" "}
                    </label>
                    <input
                      type="number"
                      name="password_reset_token"
                      placeholder="Enter OTP"
                      className="form-input"
                      value={resetPassword.password_reset_token}
                      onChange={handleResetChange}
                    />
                    {errorMessage.password_reset_token && (
                      <p className="error__messages">
                        {errorMessage.password_reset_token}
                      </p>
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
                    className={`${
                      activateReset ? "enabled" : "disabled"
                    } button-primary`}
                    type="submit"
                  >
                    Reset Password
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

export default ResetPassword;
