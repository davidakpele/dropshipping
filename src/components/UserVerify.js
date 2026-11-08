import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// images import
import verifiedTick from "../assets/imgs/icons/verifiedTick.svg";
import bronze from "../assets/imgs/icons/info-bronze.svg";



const UserVerify = () => {
      // getting user from store to populate the user profile of the sidebar
  const user = useSelector((state) => state.auth.userDetails);
  const isVerified = useSelector(
    (state) => state.auth.userDetails.verification
  );

    const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = "";
    const charLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }

    return result;
  }
  const randomCharacters = generateString(50);

  return (
    <div className="user__profile">
        <div className="users">
          <ion-icon name="person-sharp"></ion-icon>
        </div>
        <p className="center__verify">
          {user.first_name} {user.last_name}
          {isVerified.is_verified === 1 && (
            <img
              src={verifiedTick}
              alt="verified tick"
              className="verified__img"
            />
          )}
        </p>
        <Link to="/dashboard/ranking-badge">
          <div className="bronze">
            <img src={bronze} alt=" bronze icon" />
            <span className="user__mail">Bronze</span>
          </div>
        </Link>
        {isVerified.is_verified === 0 && isVerified.status === "pending" ? (
          <div className="verification__box">
            <p>
              {isVerified.status}
              {isVerified.reason !== null && (
                <span className="reason__verify">: {isVerified.reason}</span>
              )}
            </p>
          </div>
        ) : (
          isVerified.is_verified === -1 && (
            <div className="verificatn__box">
              <p>
                {isVerified.status}:{" "}
                <span className="reason__verify">{isVerified.reason}</span>
              </p>
            </div>
          )
        )}
        {isVerified.status === null && (
          <mati-button
            clientid="642a8eae9c002d001a503ede"
            flowId="64e72ce350ec62001bd20f99"
            metadata={`{"email": "${user.email}", "id": "${user.slug}", "hash": "${randomCharacters}"}`}
            color="#314706"
          />
        )}
      </div>
  )
}

export default UserVerify