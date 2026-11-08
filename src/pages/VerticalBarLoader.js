import cls from "classnames";

// align might be unneccessary
const VerticalBarLoader = ({ align, sm }) => {
  return (
    <div className={align || "text-center"}>
      <div className={cls("loaderVBars", sm && "loaderVBars--sm")}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default VerticalBarLoader;
