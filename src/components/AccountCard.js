
const AccountCard = ({ title, details, icon }) => {
  let borders = null;

  // switch (title.toLowerCase()) {
  //   case "name":
  //     borders = "myAccount__card--warning";
  //     break;

  //   case "date of birth":
  //     borders = "myAccount__card--blue";
  //     break;

  //   case "email":
  //     borders = "myAccount__card--primary";
  //     break;

  //   case "phone":
  //     borders = "myAccount__card--danger";
  //     break;

  //   default:
  //     borders = "myAccount__card--primary";
  //     break;
  // }

  return (
    <div className={`myAccount__card ${borders}`}>
      <div className="myAccount__cardAside">
        <div className="myAccount__cardIcon">
          <img src={icon} alt="" srcset="" />
        </div>
      </div>
      <div className="myAccount__cardMain">
        {/* <h3 className="title">{}</h3> */}
        <p className="details">{details}</p>
      </div>
    </div>
  );
};

export default AccountCard;
