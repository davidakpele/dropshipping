import React from "react";

import { useState } from "react";

//for components
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import HelpCenter from "../components/HelpCenter";

const Faq = () => {
  const [isActive, setIsActive] = useState(false);
  const showIsActive = () => {
    setIsActive((curr) => !curr);
  };

  const [content, setContent] = useState(false);
  const showContent = () => {
    setContent((curr) => !curr);
  };

  const [active, setActive] = useState(false);
  const showActive = () => {
    setActive((curr) => !curr);
  };

  const [question, setQuestion] = useState(false);
  const showQuestion = () => {
    setQuestion((curr) => !curr);
  };

  const [isContent, setIsContent] = useState(false);
  const showIsContent = () => {
    setIsContent((curr) => !curr);
  };

  const [isQuestion, setIsQuestion] = useState(false);
  const showIsQuestion = () => {
    setIsQuestion((curr) => !curr);
  };

  const [contents, setContents] = useState(false);
  const showContents = () => {
    setContents((curr) => !curr);
  };

  // state to set active tabs
  const [activeHelpTabs, setActiveHelpTabs] = useState("faqs");

  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <div className="container">
        <div className="help">
          {/* <div className="help__body"> */}
          <HelpCenter
            activeHelpTabs={activeHelpTabs}
            setActiveHelpTabs={setActiveHelpTabs}
          />
          <div className="faq">
            <h5 className="faq__text">Frequently Asked Question</h5>
            <div className="faq__body">
              <div className="faq__search">
                <div className="search__icon">
                  <ion-icon name="search-outline"></ion-icon>
                </div>
                <div className="enter__word">
                  <input
                    type="text"
                    name="search"
                    placeholder="Enter key word"
                  />
                </div>
              </div>
              {/* <h2 className="">Orders</h2> */}
              <div className="faq__accordion">
                <h2 className="accordion__head">Orders</h2>
                <div className="accordion__body">
                  <div
                    className="accordion__title"
                    onClick={() => showIsActive()}
                  >
                    <h1 className="how__can">
                      How can you place an order on ShopNig?
                    </h1>
                    <div>
                      {isActive ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <p className="text">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      dolor ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum. Aliquam dis
                      vulputate vulputate integer sagittis. Faucibus dolor
                      ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum.
                    </p>
                  )}
                </div>

                <div className="accordion__body">
                  <div
                    className="accordion__title"
                    onClick={() => showContent()}
                  >
                    <h1 className="how__can">
                      How can you place an order on ShopNig?
                    </h1>
                    <div>
                      {content ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  {content && (
                    <p className="text">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      dolor ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum. Aliquam dis
                      vulputate vulputate integer sagittis. Faucibus dolor
                      ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum.
                    </p>
                  )}
                </div>

                <div className="accordion__body">
                  <div
                    className="accordion__title"
                    onClick={() => showActive()}
                  >
                    <h1 className="how__can">
                      How can you place an order on ShopNig?
                    </h1>
                    <div>
                      {active ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  {active && (
                    <p className="text">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      dolor ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum. Aliquam dis
                      vulputate vulputate integer sagittis. Faucibus dolor
                      ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum.
                    </p>
                  )}
                </div>

                <h2 className="accordion__head">Payments</h2>

                <div className="accordion__body">
                  <div
                    className="accordion__title"
                    onClick={() => showQuestion()}
                  >
                    <h1 className="how__can">
                      How can you place an order on ShopNig?
                    </h1>
                    <div>
                      {question ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  {question && (
                    <p className="text">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      dolor ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum. Aliquam dis
                      vulputate vulputate integer sagittis. Faucibus dolor
                      ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum.
                    </p>
                  )}
                </div>

                <div className="accordion__body">
                  <div
                    className="accordion__title"
                    onClick={() => showIsContent()}
                  >
                    <h1 className="how__can">
                      How can you place an order on ShopNig?
                    </h1>
                    <div>
                      {isContent ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  {isContent && (
                    <p className="text">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      dolor ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum. Aliquam dis
                      vulputate vulputate integer sagittis. Faucibus dolor
                      ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum.
                    </p>
                  )}
                </div>

                <div className="accordion__body">
                  <div
                    className="accordion__title"
                    onClick={() => showIsQuestion()}
                  >
                    <h1 className="how__can">
                      How can you place an order on ShopNig?
                    </h1>
                    <div>
                      {isQuestion ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  {isQuestion && (
                    <p className="text">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      dolor ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum. Aliquam dis
                      vulputate vulputate integer sagittis. Faucibus dolor
                      ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum.
                    </p>
                  )}
                </div>

                <div className="accordion__body">
                  <div
                    className="accordion__title"
                    onClick={() => showContents()}
                  >
                    <h1 className="how__can">
                      How can you place an order on ShopNig?
                    </h1>
                    <div>
                      {contents ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                    </div>
                  </div>
                  {contents && (
                    <p className="text">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      dolor ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum. Aliquam dis
                      vulputate vulputate integer sagittis. Faucibus dolor
                      ornare faucibus vel sed et eleifend habitasse amet.
                      Montes, mauris varius ac est bibendum.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
