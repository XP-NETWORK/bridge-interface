import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moon from "../Settings/assets/img/moon.svg";
import sun from "../Settings/assets/img/sun.svg";
import { toggleTheme } from "../../store/reducers/settingsSlice";

const ThemeSwitch = () => {
  const { settings } = useSelector(({ settings }) => ({
    settings,
  }));

  const dispatch = useDispatch();

  return (
    <div className={`themeSwitch`}>
      <div className="switchWrap" onClick={() => dispatch(toggleTheme())}>
        <div className="switchToggler">
          <img src={settings.theme === "dtm" ? moon : sun} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitch;
