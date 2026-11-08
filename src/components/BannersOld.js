import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// images - bannerCategory
import bannerCat1 from "../assets/imgs/banners/banner5.png";
import bannerCat2 from "../assets/imgs/banners/banner6.png";

import firstbanner from "../assets/imgs/firstbanner.svg";
// import secondbanner from "../assets/imgs/secondbanner.svg";
import thirdImage from "../assets/imgs/thirdImage.svg";
import fourthImage from "../assets/imgs/fourthImage.svg";
import { Pagination } from "swiper";

/**
 * all banner components will be imported from this module
 * please do not export as default
 */

export const Banner = ({ data }) => {
  const [bottom, center, left, top] = data;
  return (
    <div className="contain">
      <div className="banner">
        <div className="bannerHome">
          <div className="bannerHome__left">
            <img src={left?.img} alt="" />
          </div>
          <div className="bannerHome__main">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="mySwiper"
              spaceBetween={5}
            >
              <SwiperSlide>
                <img src={center?.img} alt="banners" className="banner__img" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={center?.img} alt="banners" className="banner__img" />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="bannerHome__right">
            <div className="top">
              <img src={top?.img} alt="" />
            </div>
            <div className="bottom">
              <img src={bottom?.img} alt="" />
            </div>
          </div>
        </div>
        <div className="banner__mobile">
          <div className="bannerHome__left show">
            <img src={firstbanner} alt="" />
          </div>
          <div className="right show">
            <div className="top">
              <img src={thirdImage} alt="" />
            </div>
            <div className="bottom">
              <img src={fourthImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BannerCategory = () => (
  <div className="banner">
    <div className="contain">
      <div className="bannerCat">
        <div className="bannerCat__wrapper">
          <div className="bannerCat__itm">
            <img src={bannerCat1} alt="" />
          </div>
          <div className="bannerCat__itm">
            <img src={bannerCat2} alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
