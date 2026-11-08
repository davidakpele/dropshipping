import React from "react";
import Layout from "../containers/Layout";
import { useSelector } from "react-redux";
import error from "../assets/imgs/icons/404.svg";
import { Link } from "react-router-dom";
import errors from "../assets/imgs/icons/404-dark.svg";
const Error = () => {
  const uiMode = useSelector((state) => state.app.uiMode);
  return (
    <Layout>
      <div className="error">
        <div className="contain">
          <div className="error__wrap">
            <div className="error__img">
              <img src={uiMode === "light" ? error : errors} alt="error" />
            </div>
            <div className="error__caption">
              <p className="oops">Oops!</p>
              <h2 className="not-found">page not found</h2>
              <p className="error-content">
                An error occurred, we can’t seem to find the page you’re looking
                for. Go back to the home page!
              </p>
              <Link to="/">
                <button className="btn btn-primary">Back to home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Error;
