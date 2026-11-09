import { useSelector } from "react-redux";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "./Image";

// images - bannerCategory
import bannerCat1 from "../assets/imgs/banners/banner5.png";
import bannerCat2 from "../assets/imgs/banners/banner6.png";

const HomeBannerSlider = () => (
  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    loop
    className="home-banner-slider"
  >
    <SwiperSlide>
      <img
        src="/images/banners/xkjdsdoudds.jpg"
        alt="Shop Smart, Live Better"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="/images/banners/kitchen-counter-with-toaster-oven-toaster-oven_976492-15711.avif"
        alt="Shop Smart, Anytime, Anywhere"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="/images/banners/mockup-beautiful-laptop-with-multicolor-background.avif"
        alt="Shop Smart, Anytime, Anywhere"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="/images/banners/pexels-photo-36730407.avif"
        alt="Shop Smart, Anytime, Anywhere"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="/images/banners/6790d8ed9282e28cabc71643_663f025a8fe64d1730ac83c2_fashion_002.jpeg"
        alt="Shop Smart, Anytime, Anywhere"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="/images/banners/6790d8ed9282e28cabc71643_663f025a8fe64d1730ac83c2_fashion_002.jpeg"
        alt="Shop Smart, Anytime, Anywhere"
      />
    </SwiperSlide>
  </Swiper>
);

const BannerLoader = () => {
  return (
    <section className="container banners">
      <div>
        <div className="placeholder"></div>
      </div>
      <div>
        <HomeBannerSlider />
      </div>
      <div>
        <div className="placeholder"></div>
      </div>
      <div>
        <div className="placeholder"></div>
      </div>
    </section>
  );
};

export const Banner = () => {
  const { banners } = useSelector((state) => state.cache);

  let bottom, left, top;
  if (banners) {
    [bottom, , left, top] = banners;
  }

  if (!banners) return <BannerLoader />;

  return (
    <section className="container banners">
      <div>
        <Image src={left.img} alt="" />
      </div>
      <div>
        <HomeBannerSlider />
      </div>
      <div>
        <Image src={top.img} alt="" />
      </div>
      <div>
        <Image src={bottom.img} alt="" />
      </div>
    </section>
  );
};

export const BannerCategory = () => (
  <div className="banner">
    <div className="container">
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
