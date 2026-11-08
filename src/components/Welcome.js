import { useDispatch, useSelector } from "react-redux";
import { updateWelcomePopup } from "../store/slices/authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {

  const user = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  return (
    <div className="welcome">
      <div className="welcome__page">
        <p className="welcome__page__name">
          Welcome, <span className="name">{user.first_name}</span>
        </p>
        <p className="message">
          We're excited to have you, and we’re here to make your shopping
          experience unforgettable!
        </p>
        <i className="verify__account">
          Kindly verify your account to activate your wallet for seamless
          shopping.
        </i>
        <div className="welcome__btns">
          <button onClick={() => dispatch(updateWelcomePopup())} className="close__welcome">Close</button>
          <Link to="/dashboard" className="verify__account__btn"><button>Verify Account</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
