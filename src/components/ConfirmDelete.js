const ConfirmDelete = ({ handleNo, handleYes }) => {

  return (
    <div className="pop__page">
      <div className="insufficient">
        <div className="insufficient__content">
          <p className="insuff">Do you want to delete?</p>
          <p className="fund">Kindly confirm below</p>
        </div>
        <div className="bank__details">
          <button className="yes__confirm" onClick={handleYes}>Yes</button>
          <button className="no__confirm" onClick={handleNo}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
