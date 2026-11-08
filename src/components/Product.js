import { Link, useNavigate } from "react-router-dom";
import { currency_formatter } from "../libries";
import Image from "./Image";
import { useEffect, useRef, useState } from "react";

export const ProductLoader = () => {
  return (
    <div className="product-card">
      <div className="product-card__header">
        <div className="product-card__img placeholder"></div>
        <span className="product-card__discount product-card__discount--ld">
          -15%
        </span>
      </div>
      <div className="product-card__body">
        <div className="product-card__slider-dots">
          <span className="active"></span>
          <span></span>
        </div>
        <div className="product-card__info">
          <p className="product-card__name">
            <span className="placeholder"> iPhone 11 Pro 256Gb </span>
          </p>
          <div className="product-card__flex">
            <span className="placeholder">₦ 300,000</span>
          </div>
          <p className="product-card__price">
            <span className="placeholder"> ₦ 250,000 </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Product = ({ data, isNew }) => {
  const navigate = useNavigate();

  const { id, name, amount, images, previous_amount } = data;

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

  return (
    <div className="product-card" key={id}>
      <div>
        <div
          className="product-card__header"
          onClick={() => navigate(`/product-details/${id}`)}
        >
          {isNew ? <div className="product-card__new">New</div> : null}
          <Image
            src={images[0].image_url}
            alt=""
            className="product-card__img"
            refFunc={(el) => {
              imagesRef.current[0] = el;
            }}
          />
          <Image
            src={images[0].image_url}
            alt=""
            className="product-card__img"
            refFunc={(el) => {
              imagesRef.current[1] = el;
              setTrigger(true);
            }}
          />
          {previous_amount ? (
            <span className="product-card__discount">
              {Math.floor(((previous_amount - amount) / previous_amount) * 100)}
              %
            </span>
          ) : null}
        </div>
        <div className="product-card__slider-dots">
          <span
            ref={(el) => (sliderDotsRef.current[0] = el)}
            onClick={() => goToSlide(0)}
          ></span>
          <span
            ref={(el) => (sliderDotsRef.current[1] = el)}
            onClick={() => goToSlide(1)}
          ></span>
        </div>
      </div>
      <div className="product-card__body">
        <div className="product-card__info">
          <Link to={`/product-details/${id}`}>
            <p className="product-card__name">{name}</p>
          </Link>
          {previous_amount ? (
            <div className="product-card__flex">
              <span className="product-card__del-price">
                {currency_formatter(previous_amount)}
              </span>
            </div>
          ) : null}
          <p className="product-card__price">{currency_formatter(amount)}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
