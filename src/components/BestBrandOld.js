import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../libries";

const BestBrand = () => {
  // declearing data for best-brands
  const [data, setData] = useState([]);

  useEffect(() => {
    // sends reqest to best-brands endpoint
    axios
      .get(`${baseUrl}/brands/best`)
      .then((res) => setData(res.data.data.product));
  }, []);

  return (
    <div className="contain">
      <div className="brand">
        <h3 className="brand__text">Your best brands are on ShopNig</h3>
        <div className="brand__body">
          <div className="brand__part">
            {data?.map((itm) => (
              <div className="brand__names" key={itm.id}>
                <Link to="/categories">
                  <img src={itm.image_url} alt="" className="brand__img" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestBrand;
