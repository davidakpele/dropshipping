import React from "react";

//component
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import ProductPreviewLoader from "../components/loaders/ProdPreviewLoader";

const Loader = () => {
  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <ProductPreviewLoader />
    </Layout>
  );
};

export default Loader;
