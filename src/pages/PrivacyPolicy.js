import { useState } from "react";
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import HelpCenter from "../components/HelpCenter";

const PrivacyPolicy = () => {
  // state to set active tabs
  const [activeHelpTabs, setActiveHelpTabs] = useState("privacy");
  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <div className="container">
        <div className="help">
          <HelpCenter
            activeHelpTabs={activeHelpTabs}
            setActiveHelpTabs={setActiveHelpTabs}
          />
          <div className="privacy">
            <h5 className="privacy__title">Privacy-Policy</h5>
            <div className="privacy__body">
              <h1 className="heading">Privacy policy of ShopNig mall</h1>
              <p className="text">
                ShopNig Mall operates the shopnig.com website, which provides
                the SERVICE.
              </p>
              <p className="text">
                This page is used to inform website visitors regarding our
                policies with the collection, use, and disclosure of Personal
                Information if anyone decided to use our Service, the ShopNig
                mall website.
              </p>
              <p className="text">
                If you choose to use our Service, then you agree to the
                collection and use of information in relation with this policy.
                The Personal Information that we collect are used for providing
                and improving the Service. We will not use or share your
                information with anyone except as described in this Privacy
                Policy.
              </p>
              <p className="text">
                The terms used in this Privacy Policy have the same meanings as
                in our Terms and Conditions, which is accessible at shopnig.com,
                unless otherwise defined in this Privacy Policy.
              </p>

              <h1 className="heading">Information collection and use</h1>
              <p className="text">
                For a better experience while using our Service, we may require
                you to provide us with certain personally identifiable
                information, including but not limited to your name, phone
                number, and postal address. The information that we collect will
                be used to contact or identify you.
              </p>

              <h1 className="heading">Log data</h1>
              <p className="text">
                We want to inform you that whenever you visit our Service, we
                collect information that your browser sends to us that is called
                Log Data. This Log Data may include information such as your
                computer’s Internet Protocol ("IP") address, browser version,
                pages of our Service that you visit, the time and date of your
                visit, the time spent on those pages, and other statistics.
              </p>

              <h1 className="heading">Cookies</h1>
              <p className="text">
                Cookies are files with small amount of data that is commonly
                used an anonymous unique identifier. These are sent to your
                browser from the website that you visit and are stored on your
                computer’s hard drive.
              </p>
              <p className="text">
                Our website uses these "cookies" to collection information and
                to improve our Service. You have the option to either accept or
                refuse these cookies, and know when a cookie is being sent to
                your computer. If you choose to refuse our cookies, you may not
                be able to use some portions of our Service.
              </p>

              <h1 className="heading">Service providers</h1>
              <p className="text">
                We may employ third-party companies and individuals due to the
                following reasons:
              </p>
              <ul className="service__list">
                <li className="lists">To facilitate our Service;</li>
                <li className="lists">To provide the Service on our behalf;</li>
                <li className="lists">
                  To perform Service-related services; or
                </li>
                <li className="lists">
                  To assist us in analyzing how our Service is used.
                </li>
              </ul>
              <p className="text">
                We want to inform our Service users that these third parties
                have access to your Personal Information. The reason is to
                perform the tasks assigned to them on our behalf. However, they
                are obligated not to disclose or use the information for any
                other purpose.
              </p>

              <h1 className="heading">Security</h1>
              <p className="text">
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </p>

              <h1 className="heading">Links to other sites</h1>
              <p className="text">
                Our Service may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by us. Therefore, we
                strongly advise you to review the Privacy Policy of these
                websites. We have no control over, and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
              </p>

              <h1 className="heading">Children’s privacy</h1>
              <p className="text">
                Our Services do not address anyone under the age of 13. We do
                not knowingly collect personal identifiable information from
                children under 13. In the case we discover that a child under 13
                has provided us with personal information, we immediately delete
                this from our servers. If you are a parent or guardian and you
                are aware that your child has provided us with personal
                information, please contact us so that we will be able to do
                necessary actions.
              </p>

              <h1 className="heading">Changes to this privacy policy</h1>
              <p className="text">
                We may update our Privacy Policy from time to time. Thus, we
                advise you to review this page periodically for any changes. We
                will notify you of any changes by posting the new Privacy Policy
                on this page. These changes are effective immediately, after
                they are posted on this page.
              </p>

              <h1 className="heading">Contact us</h1>
              <p className="text">
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
