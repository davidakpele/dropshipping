import { useNavigate } from "react-router-dom";
// import notVerified from "../assets/imgs/notVerified.svg";

const DashboardHeader = ({ title, isIcon }) => {
  const navigate = useNavigate();

  const handleArrowBack = () => {
    navigate(-1);
  };
  return (
    <div className="dash__header">
      <div className="dash__head">
        {isIcon === "true" && (
          <ion-icon
            name="arrow-back-outline"
            onClick={handleArrowBack}
          ></ion-icon>
        )}
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default DashboardHeader;
