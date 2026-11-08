import Image from "./Image";

// images - bannerCategory
import bannerCat1 from "../assets/imgs/banners/banner5.png";
import bannerCat2 from "../assets/imgs/banners/banner6.png";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const BannerLoader = () => {
  return (
    <section className="container banners">
      <div>
        <div className="placeholder"></div>
      </div>
      <div>
        <div className="placeholder"></div>
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

  let bottom, center, left, top;
  if (banners) {
    [bottom, center, left, top] = banners;
  }

  const [trigger, setTrigger] = useState(false);

  const imagesRef = useRef([]);
  const sliderDotsRef = useRef([]);

  const goToSlide = (slide) => {
    const slides = imagesRef.current;

    slides.forEach((s, i) => {
      if (!s) return;

      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });

    const sliderDots = sliderDotsRef.current;

    sliderDots.forEach((s, i) => {
      if (!s) return;

      if (slide === i) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  };

  useEffect(() => {
    if (!trigger) return;

    const slides = imagesRef.current;

    let curSlide = 0;
    const maxSlide = slides.length;

    const prevSlide = () => {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
    };

    const nextSlide = () => {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
    };

    // Go to next slide every 10 seconds
    setInterval(nextSlide, 3000);
  }, [trigger]);

  if (!banners) return <BannerLoader />;

  return (

    
    <section className="container banners">
      <div>
        <Image src={left.img} alt="" />
      </div>
      <div>
        <Image
          src={center.img}
          alt="banners"
          className="banner__img"
          refFunc={(el) => {
            imagesRef.current[0] = el;
          }}
        />
        <Image
          src={center.img}
          alt="banners"
          className="banner__img"
          refFunc={(el) => {
            imagesRef.current[1] = el;
            setTrigger(true);
          }}
        />
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
