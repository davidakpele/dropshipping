import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { login } from "../store/slices/authSlice";
import { addCartItem } from "../store/slices/cartSlice";

import { baseUrl } from "../libries";

// import ModeToggle from "../components/ModeToggle";

import { useSelector } from "react-redux";

// images
import logo from "../assets/imgs/shopnig.png";
import authphoto from "../assets/new-imgs/auth-banner.svg";
import { isNumber } from "../utils/func";
import useAlert from "../hooks/useAlert";
import authbg from "../assets/new-imgs/auth-dark.svg";
import logos from "../assets/new-imgs/Shopnig-logodark.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitBtnRef = useRef();
  const uiMode = useSelector((state) => state.app.uiMode);

  // state to get login inputs
  const [userLoginDetails, setUserLoginDetails] = useState({
    phone_number: "",
    email: "",
    password: "",
  });

  // Type
  const [type, setType] = useState("email");

  // state to check if the remember me checkbox is checked
  const [checkRemember, setCheckRemember] = useState(false);

  // state to show password or hide password
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage, clearMessage] = useAlert();

  const handleLoginInputs = (e) => {
    const { name, value } = e.target;
    setUserLoginDetails({
      ...userLoginDetails,
      [name]: value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();

    if (!activateLogin) return setMessage("warning", "Fill in all fields");

    submitBtnRef.current.innerHTML = `<span class="fas fa-spinner fa-spin"></span> Logging in`;
    submitBtnRef.current.setAttribute("disabled", "disabled");

    let token;

    axios({
      url: `${baseUrl}/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        mode: type,
        [type]: `${type === "phone_number" ? "+234" : ""}${
          userLoginDetails[type]
        }`,
        password: userLoginDetails.password,
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
        userProfile.order_count = resp.data.data.order_count;
        userProfile.bank = resp.data.data.bank;

        dispatch(
          login({
            accessToken: token,
            userDetails: userProfile,
          })
        );

        // fetch all carts from  server and save on local storage
        // return axios({
        //   url: `${baseUrl}/carts`,
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // }).then((resp) => {
        //   const cartItems = resp.data.data.cart;
        //   dispatch(addCartItem(cartItems));

        //   navigate("/");
        // });
        
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
        submitBtnRef.current.removeAttribute("disabled", "disabled");
        submitBtnRef.current.innerHTML = "Sign In";
      });
  };

  useEffect(() => {
    clearMessage();
  }, [
    type,
    userLoginDetails.email,
    userLoginDetails.phone_number,
    userLoginDetails.password,
    clearMessage,
  ]);

  const activateLogin = userLoginDetails[type] && userLoginDetails.password;

  return (
    <>
      {/* <ModeToggle /> */}
      <div className="auth__container">
        <div className="auth__photo">
          <img src={uiMode === "light" ? authphoto : authbg} alt="login" />
        </div>
        <form onSubmit={loginUser} className="form__auth">
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
                  <h3 className="auth__heading">Log in to your account</h3>
                </div>
                <div className="auth__btns">
                  <button
                    type="button"
                    autocomplete="off"
                    className={type === "email" ? "active" : ""}
                    onClick={() => setType("email")}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    aria-autocomplete="off"
                    className={type === "phone_number" ? "active" : ""}
                    onClick={() => setType("phone_number")}
                  >
                    Phone
                  </button>
                </div>
                <div className="auth__form">
                  {type === "email" ? (
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        value={userLoginDetails.email}
                        type="text"
                        placeholder="Enter email address"
                        autoComplete="off"
                        className="form-input form-input--1"
                        onChange={handleLoginInputs}
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <div className="form-input-group form-input-group--1">
                        <button type="button">+234</button>
                        <input
                          name="phone_number"
                          value={userLoginDetails.phone_number}
                          type="text"
                          placeholder="Enter your phone number"
                          autoComplete="off"
                          onChange={(e) =>
                            e.target.value
                              ? isNumber(e.target.value)
                                ? setUserLoginDetails((uD) => ({
                                    ...uD,
                                    phone_number: +e.target.value,
                                  }))
                                : null
                              : setUserLoginDetails((uD) => ({
                                  ...uD,
                                  phone_number: "",
                                }))
                          }
                          maxLength={10}
                        />
                      </div>
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-group input-group--1 flex items-center p-2 cursor-pointer">
                      <input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        autoComplete="off"
                        value={userLoginDetails.password}
                        onChange={handleLoginInputs}
                      />
                      <button
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        type="button"
                      >
                        {showPassword ? (
                          <ion-icon name="eye-outline"></ion-icon>
                        ) : (
                          <ion-icon name="eye-off-outline"></ion-icon>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="auth__footer1 mb-medium">
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => setCheckRemember(!checkRemember)}
                      />
                      Remember me
                    </div>
                    <Link to="/forgot-password">Forgot your password?</Link>
                  </div>
                  {message}
                  <button
                    ref={submitBtnRef}
                    className={`${
                      activateLogin ? "enabled" : "disabled"
                    } button-primary`}
                    type="submit"
                  >
                    Sign In
                  </button>
                  <div className="auth__footer">
                    Don't have an account?{" "}
                    <Link to="/sign-up">Create an account</Link>
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

export default Login;
