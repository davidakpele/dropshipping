import { useSelector } from "react-redux";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import leftBanner from "../assets/imgs/firstbanner.svg";
import Image from "./Image";

// images - bannerCategory
import bannerCat1 from "../assets/imgs/banners/banner5.png";
import bannerCat2 from "../assets/imgs/banners/banner6.png";

const SideBanner = ({ src, fallback, alt }) => {
  return (
    <Image
      src={src}
      fallbackSrc={fallback}
      alt={alt}
      style={{ objectFit: "cover" }}
    />
  );
};

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

export const Banner = () => {
  const { banners } = useSelector((state) => state.cache);

  const [bottom, , left, top] = banners || [];

  return (
    <section className="container banners">
      <div>
        <SideBanner
          src={left?.img}
          fallback={leftBanner}
          alt="Shop smartphones"
        />
      </div>
      <div>
        <HomeBannerSlider />
      </div>
      <div>
        <SideBanner
          src={top?.img}
          fallback="/images/banners/360_F_417425751_z8Rg86FJnDc8vUSC5Frj3CgD4owjLQTB.jpg"
          alt="Shop for clothing"
        />
      </div>
      <div>
        <SideBanner
          src={bottom?.img}
          fallback="/images/banners/360_F_417425475_6i8y2OkKGOwmfTzHLQTxbm60pmNwxdUt.jpg"
          alt="Browse a clothing collection"
        />
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
