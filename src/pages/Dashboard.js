import { Outlet } from "react-router-dom";

// components import

import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import Layout from "../containers/Layout";
import Alert from "../components/Alert";
import WithAuth from "../WithAuth";

const Dashboard = () => {
  return (
    <Layout>
      <Breadcrumb name="My Account" />
      <div className="container">
        <div className="dashboard">
          <div className="dashboard__contain">
            <Sidebar />
            <div className="outlet" id="outlet-container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WithAuth(Dashboard);
