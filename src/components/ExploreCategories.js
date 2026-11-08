import React from "react";

//img
import yellow_banner from "../assets/imgs/banners/yellow-banner.png";

const Explore = ({ src }) => {
  return (
    <div className="explore__body">
      <div className="explore__part">
        <div className="">
          <img src={src} alt="" className="explore__banner" />
        </div>
        <div className="explore">
          <img src={yellow_banner} alt="" className="yellow__banner" />
        </div>
      </div>
    </div>
  );
};

export default Explore;
