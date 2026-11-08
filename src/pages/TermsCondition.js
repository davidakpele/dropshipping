import { useState } from "react";

//components
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import HelpCenter from "../components/HelpCenter";

const TermsCondition = () => {
  // state to set active tabs
  const [activeHelpTabs, setActiveHelpTabs] = useState("terms");
  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <div className="container">
        <div className="help">
          <HelpCenter
            activeHelpTabs={activeHelpTabs}
            setActiveHelpTabs={setActiveHelpTabs}
          />
          <div className="terms">
            <h5 className="terms__title">Terms & Conditions</h5>
            <div className="terms__body">
              <p className="terms__text">Intellectual Property</p>
              <ul>
                <li className="condition">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis diam erat. Duis velit lectus, posuere a blandit sit amet,
                  tempor at lorem. Donec ultricies, lorem sed ultrices interdum.
                </li>
                <li className="condition">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis diam erat. Duis velit lectus, posuere a blandit sit amet,
                  tempor at lorem. Donec ultricies, lorem sed ultrices interdum.
                </li>
                <li className="condition">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis diam erat. Duis velit lectus, posuere a blandit sit amet,
                  tempor at lorem. Donec ultricies, lorem sed ultrices interdum.
                </li>
                <li className="condition">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis diam erat. Duis velit lectus, posuere a blandit sit amet,
                  tempor at lorem. Donec ultricies, lorem sed ultrices interdum.
                </li>
                <li className="condition">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  quis diam erat. Duis velit lectus, posuere a blandit sit amet,
                  tempor at lorem. Donec ultricies, lorem sed ultrices interdum.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsCondition;
