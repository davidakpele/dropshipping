import { useState } from "react";
import { Link } from "react-router-dom";

//for components
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import HelpCenter from "../components/HelpCenter";

//images
import about from "../assets/imgs/aboutus-img.svg";
import freedelivery from "../assets/imgs/icons/free-delivery.svg";
import cashback from "../assets/imgs/icons/cashback.svg";
import quality from "../assets/imgs/icons/quality-product.svg";
import support from "../assets/imgs/icons/24hrs-support.svg";
import face from "../assets/imgs/selina-face.svg";
// import { useLocation } from "react-router-dom";

const AboutUs = () => {
  // state to set active tabs
  const [activeHelpTabs, setActiveHelpTabs] = useState("about");
  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <div className="container">
        <div className="about">
          <HelpCenter
            activeHelpTabs={activeHelpTabs}
            setActiveHelpTabs={setActiveHelpTabs}
          />
          <div className="about__wrap">
            <h5 className="about__title">About Us</h5>
            <div className="about__part">
              <div className="know__img">
                <img src={about} alt="" className="img__pics" />
              </div>
              <div className="know__about">
                <h2 className="heading">
                  Know About Our Ecommerce Business, History
                </h2>
                <p className="textt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mattis neque ultrices mattis aliquam, malesuada diam est.
                  Malesuada sem tristique amet erat vitae eget dolor lobortis.
                  Accumsan faucibus vitae lobortis quis bibendum quam.
                </p>
                <Link to="/contact-us">
                  <button className="btn btn-primary">Contact Us</button>
                </Link>
              </div>
            </div>
            <div className="about__features">
              <h2 className="feature__text">
                O<span>ur Feature</span>s
              </h2>
              <div className="feature__part">
                <div className="feature__listed">
                  <div className="list__icons">
                    <img src={freedelivery} alt="" className="iconn" />
                  </div>
                  <div>
                    <p className="list__title">Free Delivery</p>
                    <p className="list__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Massa purus gravida.
                    </p>
                  </div>
                </div>
                <div className="feature__listed">
                  <div className="list__icons">
                    <img src={cashback} alt="" className="iconn" />
                  </div>
                  <div>
                    <p className="list__title">100% Cash Back</p>
                    <p className="list__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Massa purus gravida.
                    </p>
                  </div>
                </div>
                <div className="feature__listed">
                  <div className="list__icons">
                    <img src={quality} alt="" className="iconn" />
                  </div>
                  <div>
                    <p className="list__title">Quality Product</p>
                    <p className="list__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Massa purus gravida.
                    </p>
                  </div>
                </div>
                <div className="feature__listed">
                  <div className="list__icons">
                    <img src={support} alt="" className="iconn" />
                  </div>
                  <div>
                    <p className="list__title">24/7 Support</p>
                    <p className="list__text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Massa purus gravida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about__client">
              <h3 className="client__text">
                Wh<span>at Our Client S</span>ay!
              </h3>
              <div className="client__part">
                <div className="body">
                  <img src={face} alt="" className="facee" />
                </div>
                {/* <div> */}
                <p className="name">Selina Gomez</p>
                <p className="position">Ceo At Webecy Digital</p>
                <p className="saying">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
                  duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam
                  vitae a enim nunc, sed sapien egestas ac nam. Tristique
                  ultrices dolor aliquam lacus volutpat praesent.
                </p>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
