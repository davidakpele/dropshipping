import { useState } from "react";

//components
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import HelpCenter from "../components/HelpCenter";

const RefundPolicy = () => {
  // state to set active tabs
  const [activeHelpTabs, setActiveHelpTabs] = useState("refund");
  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <div className="contain">
        <div className="help">
          <HelpCenter
            activeHelpTabs={activeHelpTabs}
            setActiveHelpTabs={setActiveHelpTabs}
          />
          <div className="refund">
            <h5 className="refund__title">Refund Policy</h5>
            <div className="refund__body">
              <p className="refund__text">
                Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor
                ornare faucibus vel sed et eleifend habitasse amet. Montes,
                mauris varius ac est bibendum. Scelerisque a, risus ac ante.
                Velit consectetur neque, elit, aliquet. Non varius proin sed
                urna, egestas consequat laoreet diam tincidunt. Magna eget
                faucibus cras justo, tortor sed donec tempus. Imperdiet
                consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in
                fringilla vulputate nunc nec. Dui, massa viverr Aliquam dis
                vulputate vulputate integer sagittis. Faucibus dolor ornare
                faucibus vel sed et eleifend habitasse amet. Montes, mauris
                varius ac est bibendum. Scelerisque a, risus ac ante. Velit
                consectetur neque, elit, aliquet. Non varius proin sed urna,
                egestas consequat laoreet diam tincidunt. Magna eget faucibus
                cras justo, tortor sed donec tempus. Imperdiet consequat, quis
                diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                vulputate nunc nec. Dui, massa viverr
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
