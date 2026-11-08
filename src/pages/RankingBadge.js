import React from "react";

import DashboardHeader from "../components/DashboardHeader";

//icons
import bronze from "../assets/imgs/icons/bronze-icon.svg";
import silver from "../assets/imgs/icons/silver-icon.svg";
import gold from "../assets/imgs/icons/gold-icon.svg";
import platinum from "../assets/imgs/icons/platinum-icon.svg";
import diamond from "../assets/imgs/icons/diamond-icon.svg";
import elite from "../assets/imgs/icons/elite-icon.svg";
import master from "../assets/imgs/icons/master-icon.svg";
import grand from "../assets/imgs/icons/grand-icon.svg";
import immortal from "../assets/imgs/icons/immortal-icon.svg";

import bronze_1 from "../assets/imgs/icons/bronze.svg";
import silver_1 from "../assets/imgs/icons/silver.svg";
import gold_1 from "../assets/imgs/icons/gold.svg";
import platinum_1 from "../assets/imgs/icons/platinum.svg";
import diamond_1 from "../assets/imgs/icons/diamond.svg";
import elite_1 from "../assets/imgs/icons/elite.svg";
import master_1 from "../assets/imgs/icons/master.svg";
import grand_1 from "../assets/imgs/icons/grand.svg";
import immortal_1 from "../assets/imgs/icons/immortal.svg";

const RankingBadge = () => {
  return (
    <div className="">
      <DashboardHeader title="Ranking Badge Explanation" isIcon="false" />
      <div className="ranking">
        <div className="ranking__body">
          <div className="ranking__grades">
            <img src={bronze} alt="bronze icon" className="icon" />
            <p className="text">Bronze:</p>
            <span className="ranks">{"<100 orders"}</span>
          </div>

          <div className="ranking__grades">
            <div className="rank__iconss">
              <img src={silver} alt="silver icon" className="icon" />
            </div>
            <p className="text">Silver:</p>
            <span className="ranks">{">100 ->200orders"}</span>
          </div>

          <div className="ranking__grades">
            <img src={gold} alt="bronze icon" className="icon" />
            <p className="text">Gold:</p>
            <span className="ranks">{">200 - <500orders"} </span>
          </div>

          <div className="ranking__grades">
            <img src={platinum} alt="bronze icon" className="icon" />
            <p className="text">Platinum:</p>
            <span className="ranks">{">500 - <1000 orders"}</span>
          </div>

          <div className="ranking__grades">
            <img src={diamond} alt="bronze icon" className="icon" />
            <p className="text">Diamond:</p>
            <span className="ranks">{">1000 - <2000 orders"}</span>
          </div>

          <div className="ranking__grades">
            <img src={elite} alt="bronze icon" className="icon" />
            <p className="text">Elite:</p>
            <span className="ranks">{">2000 <5000 orders"}</span>
          </div>

          <div className="ranking__grades">
            <img src={master} alt="bronze icon" className="icon" />
            <p className="text">Master:</p>
            <span className="ranks">{">5000 <10000 orders"}</span>
          </div>

          <div className="ranking__grades">
            <img src={grand} alt="bronze icon" className="icon" />
            <p className="text">Grand Master:</p>
            <span className="ranks">{">10000 <20000 orders"}</span>
          </div>

          <div className="ranking__grades">
            <img src={immortal} alt="bronze icon" className="icon" />
            <p className="text">Immortal:</p>
            <span className="ranks">{">20000 and above orders"}</span>
          </div>
        </div>

        <div className="ranking__benefits">
          <h5 className="benefitt">Benefits</h5>
          <div className="ranking__list">
            <div className="listed">
              <div className="listed__ranks">
                <img src={bronze_1} alt="bronze icon" />
                <p className="text">Bronze:</p>
              </div>
              <div className="listed__ranks">
                <img src={silver_1} alt="silver icon" className="icon" />
                <p className="text">Silver:</p>
              </div>
              <div className="listed__ranks">
                <img src={gold_1} alt="bronze icon" />
                <p className="text">Gold:</p>
              </div>
              <div className="listed__ranks">
                <img src={platinum_1} alt="bronze icon" />
                <p className="text">Platinum:</p>
              </div>
              <div className="listed__ranks">
                <img src={diamond_1} alt="bronze icon" />
                <p className="text">Diamond:</p>
              </div>
              <div className="listed__ranks">
                <img src={elite_1} alt="bronze icon" />
                <p className="text">Elite:</p>
              </div>
              <div className="listed__ranks">
                <img src={master_1} alt="bronze icon" />
                <p className="text">Master:</p>
              </div>
              <div className="listed__ranks">
                <img src={grand_1} alt="bronze icon" />
                <p className="text">Grand Master:</p>
              </div>
              <div className="listed__ranks">
                <img src={immortal_1} alt="bronze icon" />
                <p className="text">Immortal:</p>
              </div>
            </div>

            <div className="listed__info">
              <p className="infos">up to 5 coupon annually</p>
              <p className="infos">up to 10 coupon annually</p>
              <p className="infos">up to 15 coupon annually</p>
              <p className="infos">Gold + bonuses</p>
              <p className="infos">Platinum + bonuses</p>
              <p className="infos">Diamond + bonuses</p>
              <p className="infos">Elite + bonuses</p>
              <p className="infos">Master + bonuses</p>
              <p className="infos">Grand master +Free delivery + bonuses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingBadge;
