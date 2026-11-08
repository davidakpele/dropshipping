import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useSelector } from "react-redux";

import bank from "../assets/imgs/bank-outline.svg";

const InsufficientBalance = ({ close }) => {
  const user = useSelector((state) => state.auth.userDetails.bank);

  // 👇 Using our custom hook
  const [copyToClipboard, copyResult] = useCopyToClipboard();

  const handleClickCopy = (accNum) => {
    copyToClipboard(accNum);
  };

  return (
    <div className="pop__page">
      <div className="insufficient">
        <div className="insufficient__content">
          <h3 className="opps">Oops!</h3>
          <p className="insuff">Insufficient balance</p>
          <p className="fund">
            Kindly fund your account or choose another payment mode
          </p>
        </div>

        <div className="bank__details">
          <div className="bank">
            <img src={bank} alt="bank icon" />
            <span>Providus Bank</span>
          </div>
          <div className="account__num">
                {user.account_number ? (
                   <>
                    <span>{user.account_number}</span>
                    <button className="copy" onClick={() => handleClickCopy(user.account_number)}>
                      Copy
                      <ion-icon name="copy-outline"></ion-icon>
                    </button>
                  </>
                ) : (
                 <span>Verify your account to get an account number</span>
                )}
              </div>
          <span className="wallet__info">
            This works like a regular bank account. You will be credited
            instantly
          </span>

          <div className="copied">
            {copyResult?.status === "success" && <i>Copied Successfully!</i>}
          </div>
        </div>

        <div className="popup__butn">
          <button className="popup__close" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientBalance;
