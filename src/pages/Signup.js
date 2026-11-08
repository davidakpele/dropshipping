import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { baseUrl } from "../libries";

import axios from "axios";

import { login } from "../store/slices/authSlice";

// import ModeToggle from "../components/ModeToggle";

import { useSelector } from "react-redux";

// images
import logo from "../assets/imgs/shopnig.png";
import authphoto from "../assets/new-imgs/auth-banner.svg";
import whatsapp from "../assets/new-imgs/whatsapp.png";
import sms from "../assets/new-imgs/sms.png";
import useAlert from "../hooks/useAlert";
import { isNumber } from "../utils/func";
import authbg from "../assets/new-imgs/auth-dark.svg";
import logos from "../assets/new-imgs/Shopnig-logodark.svg";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpRef = useRef();
  const uiMode = useSelector((state) => state.app.uiMode);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [code, setCode] = useState("");

  // Type
  const [type, setType] = useState("email");

  // state to show password or hide password
  const [showPassword, setShowPassword] = useState(false);

  // sms type
  const [smsType, setSmsType] = useState("whatsapp");

  const [message, setMessage, clearMessage] = useAlert();

  const requestCode = (e) => {
    const target = e.target;

    target.innerHTML = `<span class="fas fa-spinner fa-spin"></span>`;
    target.setAttribute("disabled", "disabled");

    axios({
      url: `${baseUrl}/register-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        mode: type,
        name: userDetails.name,
        [type]: `${type === "phone_number" ? "+234" : ""}${userDetails[type]}`,
      }),
    })
      .then((res) => {
        if (!res.data.status) {
          setMessage("warning", res.data.message);
        } else {
          setMessage("success", res.data.data.message);
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setMessage("warning", err.response.data.message);
        } else {
          setMessage("error", err.message);
        }
      })
      .finally(() => {
        target.removeAttribute("disabled");
        target.innerHTML = `Resend Code`;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!activateBtn) return setMessage("warning", "Fill in all fields");

    signUpRef.current.innerHTML = `<span class="fas fa-spinner fa-spin"></span> Loading..`;
    signUpRef.current.setAttribute("disabled", "disabled");

    let token;

    axios({
      url: `${baseUrl}/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        mode: type,
        name: userDetails.name,
        [type]: `${type === "phone_number" ? "+234" : ""}${userDetails[type]}`,
        verification_code: code,
        password: userDetails.password,
        password_confirmation: userDetails.password,
      }),
    })
      .then((response) => {
        token = response.data.data.token.accessToken;

        // making a call to fetch user account
        return axios({
          url: `${baseUrl}/accounts`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((resp) => {
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

        navigate("/");
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setMessage("warning", err.response.data.message);
        } else {
          setMessage("error", err.message);
        }
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

  useEffect(() => {
    clearMessage();
  }, [
    type,
    userDetails.name,
    userDetails.email,
    userDetails.phone_number,
    userDetails.password,
    code,
    clearMessage,
  ]);

  const activateBtn =
    userDetails.name &&
    userDetails[type] &&
    userDetails.password &&
    userDetails.password.length >= 8 &&
    code;

  console.log(message);

  return (
    <>
      {/* <ModeToggle /> */}
      <div className="auth__container">
        <div className="auth__photo">
          <img src={uiMode === "light" ? authphoto : authbg} alt="login" />
        </div>
        <form onSubmit={handleSubmit} className="form__auth">
          <div className="auth__main">
            <div className="auth__img-block">
              <a href="/">
                <img
                  src={uiMode === "light" ? logo : logos}
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
                <div className="auth__btns">
                  <button
                    type="button"
                    className={type === "email" ? "active" : ""}
                    onClick={() => setType("email")}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    className={type === "phone_number" ? "active" : ""}
                    onClick={() => setType("phone_number")}
                  >
                    Phone
                  </button>
                </div>
                <div className="auth__form">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      name="name"
                      type="text"
                      value={userDetails.name}
                      placeholder="Enter your name"
                      className="form-input form-input--1"
                      autoComplete="off"
                      onChange={handleChangeUserInputs}
                    />
                  </div>
                  {type === "email" ? (
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        value={userDetails.email}
                        type="text"
                        placeholder="Enter your email"
                        className="form-input form-input--1"
                        autoComplete="off"
                        onChange={handleChangeUserInputs}
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <div className="form-input-group form-input-group--1">
                        <button type="button">+234</button>
                        <input
                          name="phone_number"
                          value={userDetails.phone_number}
                          type="text"
                          placeholder="Enter your phone number"
                          autoComplete="new-password"
                          onChange={(e) =>
                            e.target.value
                              ? isNumber(e.target.value)
                                ? setUserDetails((uD) => ({
                                    ...uD,
                                    phone_number: +e.target.value,
                                  }))
                                : null
                              : setUserDetails((uD) => ({
                                  ...uD,
                                  phone_number: "",
                                }))
                          }
                          maxLength={10}
                        />
                      </div>
                    </div>
                  )}
                  <div className="form-group mb-medium">
                    <label className="form-label">Password</label>
                    <div className="input-group input-group--1">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={userDetails.password}
                        placeholder="Enter your password"
                        autoComplete="new-password"
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
                    <label className="form-bottom-label">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      <p>Password must include 8-16 characters</p>
                    </label>
                  </div>
                  {type === "phone_number" ? (
                    <div className="otp-medium mb-medium">
                      <h3 className="otp-medium__heading">Receive OTP Via</h3>
                      <div className="otp-medium__blocks">
                        <div className="otp-medium__block">
                          <img
                            src={whatsapp}
                            alt=""
                            className="otp-medium__block-img"
                          />
                          <p className="otp-medium__block-name">
                            Whatsapp (Instant)
                          </p>
                          <input
                            type="checkbox"
                            className="checkbox-switch"
                            checked={smsType === "whatsapp"}
                            onChange={(e) =>
                              setSmsType(e.target.checked ? "whatsapp" : "sms")
                            }
                          />
                        </div>
                        <div className="otp-medium__block">
                          <img
                            src={sms}
                            alt=""
                            className="otp-medium__block-img"
                          />
                          <p className="otp-medium__block-name">
                            SMS (0 - 5 MIN)
                          </p>
                          <input
                            type="checkbox"
                            className="checkbox-switch"
                            checked={smsType === "sms"}
                            onChange={(e) =>
                              setSmsType(e.target.checked ? "sms" : "whatsapp")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="form-group">
                    <label>
                      {type === "email"
                        ? "Verification code"
                        : "Resend verification code via"}{" "}
                    </label>
                    <div className="form-input-group">
                      <input
                        type="text"
                        placeholder="Verification code"
                        autoComplete="new-password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <button
                        onClick={requestCode}
                        disabled={!userDetails.name || !userDetails[type]}
                        type="button"
                      >
                        Request Code
                      </button>
                    </div>
                  </div>
                  {message}
                  <button
                    ref={signUpRef}
                    type="submit"
                    className={`${
                      activateBtn ? "enabled" : "disabled"
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
    </>
  );
};

export default SignUp;
