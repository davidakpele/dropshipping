import { useSelector } from "react-redux";
import AccountCard from "../components/AccountCard";
import DashboardHeader from "../components/DashboardHeader";
import { Link } from "react-router-dom";
import { currency_formatter } from "../libries";
import UserVerify from "../components/UserVerify";

// icons and images import
import icon1 from "../assets/imgs/icons/icon1.svg";
import icon2 from "../assets/imgs/icons/icon2.svg";
import icon3 from "../assets/imgs/icons/icon3.svg";
import icon4 from "../assets/imgs/icons/icon4.svg";
import icon7 from "../assets/imgs/icons/icon7.svg";
import edit from "../assets/imgs/icons/edit.svg";
import address from "../assets/imgs/icons/address.svg";
import contact from "../assets/imgs/icons/contact.svg";
import wallet from "../assets/imgs/icons/wallet.svg";
const MyAccount = () => {
  const userProfile = useSelector((state) => state.auth.userDetails);

  console.log(userProfile);
  return (
    <div className="verify__showing__mobile">
      <div className="show__on__mobile">
        <UserVerify />
      </div>
      <div className="myAccount">
        <DashboardHeader title="My Account" isIcon="false" />
        {userProfile.verification.status !== "verified" && (
          <div className="verify">
            <p className="verify__icon">
              <ion-icon name="alert-circle"></ion-icon>
            </p>
            <p className="verify__text">
              Account not verified! Kindly complete your KYC to verify your
              account
            </p>
          </div>
        )}

        <div className="myAccount__wrap">
          <div>
            <AccountCard
              details={`${userProfile.first_name} ${userProfile.last_name}`}
              icon={contact}
            />
            <AccountCard
              details={
                userProfile.date_of_birth
                  ? userProfile.date_of_birth
                  : "Enter your date of birth"
              }
              icon={icon4}
            />
            <AccountCard
              title={"Email"}
              details={userProfile.email}
              icon={icon1}
            />
            <AccountCard
              title={"Gender"}
              details={userProfile.gender}
              icon={icon7}
            />
            <AccountCard
              title={"Phone"}
              details={userProfile.phone_number}
              icon={icon2}
            />
            <AccountCard
              title={"Address"}
              details={
                userProfile.address ? userProfile.address : "No address added"
              }
              icon={address}
            />
            <AccountCard
              title={"Wallet Balance"}
              details={currency_formatter(
                Math.round(userProfile.wallet.available_balance)
              )}
              icon={wallet}
            />

            <AccountCard
              title={"Total Order"}
              details={
                userProfile.order_count
                  ? userProfile.order_count + " " + "Orders"
                  : "No orders yet"
              }
              icon={icon3}
            />
          </div>
          {userProfile.verification.status !== "verified" && (
            <div className="editt">
              <Link to="/dashboard/edit-account">
                <button className="edit__btnn">
                  <img src={edit} alt="" className="iconn" />
                  <p>Edit</p>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
