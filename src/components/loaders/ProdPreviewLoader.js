import React from "react";
import VerticalBarLoader from "../../pages/VerticalBarLoader";

const ProdPreviewLoader = () => {
  const style = {
    backgroundColor: "#fff",
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3.6rem",
  };

  return (
    <div className="prod-loader">
      <VerticalBarLoader />
    </div>
  );
};

export default ProdPreviewLoader;
