import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

//components
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import HelpCenter from "../components/HelpCenter";
import Alert from "../components/Alert";

//images
import flag from "../assets/imgs/icons/flag.svg";
import faces from "../assets/imgs/faces-icon.png";
import { baseUrl } from "../libries";

const ContactUs = ({ sendingMsg }) => {
  // state to set active tabs
  const [activeHelpTabs, setActiveHelpTabs] = useState("contact");

  // const userDetails = useSelector((state) => state.auth.userDetails);

  // console.log(userDetails);

  // showing alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const token = useSelector((state) => state.auth.accessToken);
  const [sendMsg, setSendMsg] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const handleChangeSendMsg = (e) => {
    const { name, value } = e.target;

    setSendMsg({
      ...sendMsg,
      [name]: value,
    });
  };

  const handleContactUs = () => {
    axios({
      url: `${baseUrl}/contact-us`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(sendMsg),
    })
      .then((resp) => {
        setAlertStatus("success");
        setAlertMsg(resp.data.message);
        setShowAlert(true);

        setSendMsg({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          message: "",
        });
      })
      .catch((err) => {
        setAlertStatus("error");
        setAlertMsg(err.message);
        setShowAlert(true);
      });
  };

  return (
    <>
      <Layout>
        <Breadcrumb name="Product detail >" />
        <div className="container">
          <div className="help">
            <HelpCenter
              activeHelpTabs={activeHelpTabs}
              setActiveHelpTabs={setActiveHelpTabs}
            />
            <div className="contact">
              <h5 className="contact__title">Contact Us</h5>
              <div className="contact__body">
                <div className="contact__details">
                  <div className="displaying">
                    <div className="inputs__names">
                      <label htmlFor="firstname">First Name:</label>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="Enter first name"
                        className="namess"
                        value={sendMsg.first_name}
                        onChange={handleChangeSendMsg}
                        required
                      />
                    </div>
                    <div className="inputs__names">
                      <label htmlFor="lastname">Last Name:</label>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Enter last name"
                        className="namess"
                        value={sendMsg.last_name}
                        onChange={handleChangeSendMsg}
                        required
                      />
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="You@example.com"
                      className="mail"
                      value={sendMsg.email}
                      onChange={handleChangeSendMsg}
                      required
                    />
                  </div>
                  <div className="">
                    <label htmlFor="phonenumber">Phone Number:</label>
                    <div className="phone__inputt">
                      <div className="phone__select">
                        <img src={flag} alt="" className="" />
                        <ion-icon
                          name="chevron-down-outline"
                          className=""
                        ></ion-icon>
                      </div>
                      <div className="phone__figure">
                        <input
                          type="text"
                          placeholder="(+234) 01112340197"
                          name="phone_number"
                          className="numberr"
                          value={sendMsg.phone_number}
                          onChange={handleChangeSendMsg}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                      name="message"
                      id=""
                      cols=""
                      rows="7"
                      value={sendMsg.message}
                      onChange={handleChangeSendMsg}
                    >
                      ...
                    </textarea>
                  </div>
                  <div className="btn__send">
                    <button
                      value="submit"
                      className={`sendd ${sendingMsg ? "disablepay" : ""}`}
                      onClick={handleContactUs}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
                <div className="contact__facess">
                  <img src={faces} alt="contact faces" className="facce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {showAlert && (
        <Alert
          alertMsg={alertMsg}
          alertStatus={alertStatus}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default ContactUs;
