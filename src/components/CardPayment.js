import React from "react";

const CardPayment = ({ card }) => {
  return (
    <div className={"personal__details" + (card ? "" : " none")}>
      <div className="personal__body">
        <div className="mode__card">
          <label htmlFor="number">Card Number</label>
          <div className="tel">
            <input type="tel" placeholder="0000 1234 0000 1234" />
          </div>

          <div className="card__number">
            <div className="cvv">
              <label htmlFor="cvv">CVV</label>
              <input type="text" placeholder="123" />
            </div>
            <div>
              <label htmlFor="expiry">Expiry</label>
              <input type="text" placeholder="11/22" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
