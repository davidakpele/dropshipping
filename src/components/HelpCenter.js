import help_center from "../assets/imgs/banners/helpcenterbanner.svg";
import faq from "../assets/imgs/icons/faq-icon.svg";
import about from "../assets/imgs/icons/about-icon.svg";
import phone from "../assets/imgs/icons/contact-icon.svg";
import refund from "../assets/imgs/icons/refund-icon.svg";
import terms from "../assets/imgs/icons/terms-icon.svg";
import privacy from "../assets/imgs/icons/privacy-icon.svg";
import { Link } from "react-router-dom";

const HelpCenter = ({ activeHelpTabs, setActiveHelpTabs }) => {
  // function to set active when a tab is clicked
  const handleActiveHelp = (tab) => {
    setActiveHelpTabs(tab);
  };

  return (
    <div className="center">
      <div className="help__banner">
        <img src={help_center} alt="help center banner" />
      </div>
      <div className="help__menus">
        <Link
          to="/faq"
          className={`sub__menu blue ${activeHelpTabs === "faqs" && "active"}`}
          onClick={() => handleActiveHelp("faqs")}
        >
          <div className="menu__icon">
            <img src={faq} alt="" className="color__icon" />
          </div>
          <p className="sub__text">FAQ</p>
        </Link>

        <Link
          to="/about-us"
          className={`sub__menu yellow ${
            activeHelpTabs === "about" && "active"
          }`}
          onClick={() => handleActiveHelp("about")}
        >
          <div className="menu__icon">
            <img src={about} alt="" className="color__icon" />
          </div>
          <p className="sub__text">About Us</p>
        </Link>

        <Link
          to="/contact-us"
          className={`sub__menu green ${
            activeHelpTabs === "contact" && "active"
          }`}
          onClick={() => handleActiveHelp("contact")}
        >
          <div className="menu__icon">
            <img src={phone} alt="" className="color__icon" />
          </div>
          <p className="sub__text">Contact Us</p>
        </Link>

        <Link
          to="/refund-policy"
          className={`sub__menu cyan ${
            activeHelpTabs === "refund" && "active"
          }`}
          onClick={() => handleActiveHelp("refund")}
        >
          <div className="menu__icon">
            <img src={refund} alt="" className="color__icon" />
          </div>
          <p className="sub__text">Refund Policy</p>
        </Link>

        <Link
          to="/terms-condition"
          className={`sub__menu dark-blue ${
            activeHelpTabs === "terms" && "active"
          }`}
          onClick={() => handleActiveHelp("terms")}
        >
          <div className="menu__icon">
            <img src={terms} alt="" className="color__icon" />
          </div>
          <p className="sub__text">Terms & Conditions</p>
        </Link>

        <Link
          to="/privacy-policy"
          className={`sub__menu purple ${
            activeHelpTabs === "privacy" && "active"
          }`}
          onClick={() => handleActiveHelp("privacy")}
        >
          <div className="menu__icon">
            <img src={privacy} alt="" className="color__icon" />
          </div>
          <p className="sub__text">Privacy-Policy</p>
        </Link>
      </div>
    </div>
  );
};

export default HelpCenter;
