import { Link } from "react-router-dom";

import jane from "../assets/new-imgs/jane.svg";
import joe from "../assets/new-imgs/joe.svg";
import timi from "../assets/new-imgs/timi.svg";

import logoFacebook from "../assets/new-imgs/logo-facebook.svg";
import logoInstagram from "../assets/new-imgs/logo-instagram.svg";
import logoTwitter from "../assets/new-imgs/logo-twitter.svg";

const Footer = () => {
  return (
    <>
      <footer className="footer1">
        <div className="container-sm footer1__container">
          <div className="footer1__block">
            <h3 className="footer1__block-heading">Quick Links</h3>
            <div className="footer1__flex quick">
              <ul className="footer1__navbar">
                <li>
                  <Link to="/categories" className="footer1__link">
                    Phones
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Camera
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Monitors
                  </Link>
                </li>
              </ul>
              <ul className="footer1__navbar">
                <li>
                  <Link to="/categories" className="footer1__link">
                    Earbuds
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Earphones
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Flash Drives
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Smart Watches
                  </Link>
                </li>
              </ul>
              <ul className="footer1__navbar">
                <li>
                  <Link to="/categories" className="footer1__link">
                    Games
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Speakers
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer1__link">
                    Memory Cards
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer1__block">
            <h3 className="footer1__block-heading">Help</h3>
            <div className="footer1__flex">
              <ul className="footer1__navbar">
                <li>
                  <Link to="/faq" className="footer1__link">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="footer1__link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="footer1__link">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="footer1__link">
                    Refund Policy
                  </Link>
                </li>
              </ul>
              <ul className="footer1__navbar">
                <li>
                  <Link to="/terms-condition" className="footer1__link">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="footer1__link">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer1__block">
            <h3 className="footer1__block-heading">Customer Service</h3>
            <div className="footer1__contacts">
              <div className="footer1__contact">
                <img src={jane} alt="" />
                Jane
              </div>
              <div className="footer1__contact">
                <img src={joe} alt="" />
                Joe
              </div>
              <div className="footer1__contact">
                <img src={timi} alt="" />
                Timi
              </div>
            </div>
          </div>
          <div className="footer1__block">
            <h3 className="footer1__block-heading">Social Media</h3>
            <div className="footer1__socials">
              <Link
                to="http://www.fb.com/shopnig"
                className="footer1__social"
                target="_blank"
              >
                <img src={logoFacebook} alt="" />
              </Link>
              <Link
                to="http://www.instagram.com/shopnig24"
                className="footer1__social"
                target="_blank"
              >
                <img src={logoInstagram} alt="" />
              </Link>
              <Link
                to="https://x.com/Shopnigmall?s=20"
                className="footer1__social"
                target="_blank"
              >
                <img src="/images/twitter.svg" alt="" className="x-twitter" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">© 2023 ShopNig Mall - All Rights Reserved</div>
    </>
  );
};

export default Footer;
