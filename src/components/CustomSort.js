const CustomSort = ({sort}) => {
  return (
    <>
      {sort === "custom" && (
        <div className="custom__show">
          <div className="custom__sort">
            <div className="date__box">
              <div className="date__box__input">
                <label>Start date</label>
                <input type="date" />
              </div>
              <div className="date__box__input">
                <label>End date</label>
                <input type="date" />
              </div>
            </div>
            <button className="custom__sort__btn">Sort</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomSort;
