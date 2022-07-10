import React from "react";
import { useDispatch, useSelector } from "react-redux";
import darkTooggle from "../../assets/img/nav/dark-tooggle.svg";
import lightToggle from "../../assets/img/nav/light-toggle.svg";
import { setDarkMode } from "../../store/reducers/generalSlice";

export default function DarkMode() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.general.darkMode);

    return !darkMode ? (
        <div
            onClick={() => dispatch(setDarkMode())}
            className="dark-mode__toggle"
        >
            <img src={darkTooggle} alt="" />
        </div>
    ) : (
        <div
            onClick={() => dispatch(setDarkMode())}
            className="light-mode__toggle"
        >
            <img src={lightToggle} alt="" />
        </div>
    );
}
