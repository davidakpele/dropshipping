import { useDispatch, useSelector } from "react-redux";

import { changeMode } from "../store/slices/appSlice";

const ModeToggle = () => {
  const dispatch = useDispatch();

  const uiMode = useSelector((state) => state.app.uiMode);
  // return null;

  return (
    <button
      className="mode-toggle"
      onClick={() => dispatch(changeMode(uiMode === "dark" ? "light" : "dark"))}
    >
      <ion-icon name={uiMode === "dark" ? "sunny-outline" : "moon-outline"} />{" "}
      {uiMode === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ModeToggle;
