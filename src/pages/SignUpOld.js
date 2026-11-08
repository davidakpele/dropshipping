import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../libries";
import { validateSignup } from "../validate";

import axios from "axios";

import { login } from "../store/slices/authSlice";

// images
import logo from "../assets/imgs/shopnig.png";
import authphoto from "../assets/new-imgs/auth-banner.svg";
import Feedback from "../components/Feedback";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpRef = useRef();

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    password: "",
    password_confirmation: "",
  });

  // state to check if the not a robot checkbox is checked
  const [robot, setRobot] = useState(false);

  // state to show password or hide password
  const [showPassword, setShowPassword] = useState(false);

  // state to show confirm-password or hide confirm-password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // state to keep response message from the backend
  const [responseMessage, setResponseMessage] = useState("");

  // state to keep response status [error or success] from the backend
  const [responseStatus, setResponseStatus] = useState("");

  // state to show response from the backend
  const [showMessage, setShowMessage] = useState(false);

  // state for frontend error message validation
  const [errorMessage, setErrorMessage] = useState({});

  // state to check if select gender is clicked
  const [selectGender, setSelectGender] = useState(false);

  // state for get fetch gender from the backend
  const [getGender, setGetGender] = useState({});

  // checking if inputs are not empty and if error messages is empty object
  const isEmptyInput = Object.values(userDetails).every((val) => val !== "");
  const isEmptyError = Object.values(errorMessage).every((val) => val === "");

  // activate signup button
  const activateSignup = isEmptyInput && isEmptyError && robot;

  const signupUser = () => {
    signUpRef.current.innerHTML = `<span class="fas fa-spinner fa-spin"></span> Loading..`;
    signUpRef.current.setAttribute("disabled", "disabled");

    axios({
      url: `${baseUrl}/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(userDetails),
    })
      .then((response) => {
        console.log(response);
        const token = response.data.data.token.accessToken;

        setResponseMessage(response.data.message);
        setResponseStatus("success");
        setShowMessage(true);

        const interval = setInterval(() => {
          navigate("/");
          clearInterval(interval);
        }, 4000);

        // making a call to fetch user account
        return axios({
          url: `${baseUrl}/accounts`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((resp) => {
          console.log(resp);
          const userProfile = resp.data.data.user;
          userProfile.verification = resp.data.data.verification;
          userProfile.wallet = resp.data.data.wallet;
          userProfile.bank = resp.data.data.bank;
          dispatch(
            login({
              accessToken: token,
              userDetails: userProfile,
            })
          );
        });
      })

      .catch((error) => {
        setResponseMessage(error.response.data.message);
        setResponseStatus("error");
        setShowMessage(true);
      })
      .finally(() => {
        signUpRef.current.removeAttribute("disabled", "disabled");
        signUpRef.current.innerHTML = "Sign Up";
      });
  };

  const handleChangeUserInputs = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSelectGender = () => {
    setSelectGender(true);
  };

  useEffect(() => {
    setErrorMessage(validateSignup(userDetails));
  }, [userDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

  useEffect(() => {
    axios({
      url: `${baseUrl}/list-genders`,
      method: "GET",
    })
      .then((resp) => {
        console.log(resp);
        setGetGender(resp.data.data.genders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const arrayOfGender = Object.keys(getGender);

  return (
    <div className="auth__container">
      <div className="auth__photo">
        <img src={authphoto} alt="login" />
      </div>
      <form onSubmit={handleSubmit} className="form__auth">
        <div className="auth__main">
          <div className="auth__img-block">
            <a href="/">
              <img
                src={logo}
                alt=""
                className={["auth__img", "cursor-pointer"].join(" ")}
              />
            </a>
          </div>
          <div className="auth__card">
            <div className="auth__card-main">
              <div className="auth__header">
                <h3 className="auth__heading">Create an account</h3>
              </div>
              <div className="auth__form">
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    value={userDetails.first_name}
                    placeholder="Enter your first name"
                    className="form-input"
                    onChange={handleChangeUserInputs}
                  />
                  {errorMessage.first_name && (
                    <p className="error__messages">{errorMessage.first_name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    value={userDetails.last_name}
                    type="text"
                    placeholder="Enter your last name"
                    className="form-input"
                    onChange={handleChangeUserInputs}
                  />
                  {errorMessage.last_name && (
                    <p className="error__messages">{errorMessage.last_name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    value={userDetails.email}
                    type="text"
                    placeholder="Enter your email"
                    className="form-input"
                    onChange={handleChangeUserInputs}
                  />
                  {errorMessage.email && (
                    <p className="error__messages">{errorMessage.email}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Phone Number
                  </label>
                  <input
                    name="phone_number"
                    value={userDetails.phone_number}
                    type="number"
                    placeholder="Enter your phone number"
                    className="form-input"
                    onChange={handleChangeUserInputs}
                  />
                  {errorMessage.phone_number && (
                    <p className="error__messages">
                      {errorMessage.phone_number}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="form-input"
                    value={userDetails.gender}
                    onChange={handleChangeUserInputs}
                    onClick={handleSelectGender}
                  >
                    <option value="">Select</option>
                    {arrayOfGender.map((gender) => (
                      <option value={getGender[gender]} key={gender}>
                        {getGender[gender]}
                      </option>
                    ))}
                  </select>
                  {errorMessage.gender && selectGender && (
                    <p className="error__messages">{errorMessage.gender}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={userDetails.password}
                      placeholder="Enter your password"
                      onChange={handleChangeUserInputs}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <ion-icon name="eye-outline"></ion-icon>
                      ) : (
                        <ion-icon name="eye-off-outline"></ion-icon>
                      )}
                    </button>
                  </div>
                  <label htmlFor="" className="form-bottom-label">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <p>Password must include 8-16 characters</p>
                  </label>
                  {errorMessage.password && (
                    <p className="error__messages">{errorMessage.password}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      name="password_confirmation"
                      value={userDetails.password_confirmation}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      onChange={handleChangeUserInputs}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? (
                        <ion-icon name="eye-outline"></ion-icon>
                      ) : (
                        <ion-icon name="eye-off-outline"></ion-icon>
                      )}
                    </button>
                  </div>
                  {errorMessage.password_confirmation && (
                    <p className="error__messages">
                      {errorMessage.password_confirmation}
                    </p>
                  )}
                </div>
                <div className="auth__footer1 mb-medium">
                  <div>
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={robot}
                      onChange={() => setRobot(!robot)}
                    />
                    I'm not a robot
                  </div>
                </div>
                {showMessage && (
                  <Feedback
                    responseMessage={responseMessage}
                    setShowMessage={setShowMessage}
                    responseStatus={responseStatus}
                  />
                )}
                <button
                  ref={signUpRef}
                  type="submit"
                  className={`${
                    activateSignup && !showMessage ? "enabled" : "disabled"
                  } button-primary`}
                >
                  Sign Up
                </button>
                <div className="auth__footer">
                  Already have an account?
                  <Link to="/login"> Sign in to your account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
