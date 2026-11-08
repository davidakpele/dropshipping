import React from "react";
import { Link } from "react-router-dom";

// images
import avatar1 from "../assets/imgs/avatar/avatar1.png";
import avatar2 from "../assets/imgs/avatar/avatar2.png";
import avatar3 from "../assets/imgs/avatar/avatar3.png";
import twitter from "../assets/imgs/icons/ftIcon1.svg";
import isntagram from "../assets/imgs/icons/ftIcon2.svg";
import facebook from "../assets/imgs/icons/ftIcon3.svg";

const Footer = () => (
  <footer className="footer">
    <div className="footer__main">
      <div className="contain">
        <div className="footer__mainWrap">
          <div className="footer__quickLinks">
            <h3>Quicklinks</h3>
            <div className="footer__linksWrap">
              <ul className="footer__listing">
                <li className="footer__item">
                  <Link to="/categories">Phones</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Laptops</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Cameras</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Monitors</Link>
                </li>
              </ul>
              <ul className="footer__listing">
                <li className="footer__item">
                  <Link to="/categories">Earbuds</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Earphones</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Flash Drives</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Smart Watches</Link>
                </li>
              </ul>
              <ul className="footer__listing">
                <li className="footer__item">
                  <Link to="/categories">Games</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Speakers</Link>
                </li>
                <li className="footer__item">
                  <Link to="/categories">Memory Cards</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__nav">
            <h3>Help</h3>
            <ul className="footer__listing">
              <li className="footer__item">FAQ (Frequently Asked Questions)</li>
              <li className="footer__item">About us</li>
              <li className="footer__item">Contact us</li>
              <li className="footer__item">Refund Policy</li>
              <li className="footer__item">Terms & Conditions</li>
              <li className="footer__item">Privacy Policy</li>
            </ul>
          </div>
          <div className="footer__cusService">
            <h3>Customer Service</h3>
            <ul className="footer__listing footer__flex">
              <li className="footer__item footer__flex">
                <img src={avatar1} alt="customer care" />
                <span>Jane</span>
              </li>
              <li className="footer__item footer__flex">
                <img src={avatar2} alt="customer care" />
                <span>Joe</span>
              </li>
              <li className="footer__item footer__flex">
                <img src={avatar3} alt="customer care" />
                <span>Jim</span>
              </li>
            </ul>
          </div>
          <div className="footer__socials">
            <h3>Social Media</h3>
            <ul className="footer__listing footer__icon">
              <li className="footer__item">
                <img src={isntagram} alt="facebook" />
              </li>
              <li className="footer__item">
                <img src={twitter} alt="instagram" />
              </li>
              <li className="footer__item">
                <img src={facebook} alt="twitter" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="footer__footer">
      <div className="contain">
        <p>&copy; 2023 ShopNig - All Rights Reserved</p>
      </div>
    </div>
  </footer>
);

export default Footer;
