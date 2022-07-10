import React from "react";
import { useDispatch, useSelector } from "react-redux";
import darkTooggle from "../../assets/img/nav/dark-tooggle.svg";
import { setDarkMode } from "../../store/reducers/generalSlice";

export default function DarkMode() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.general.darkMode);
    console.log(
        "🚀 ~ file: DarkMode.jsx ~ line 8 ~ DarkMode ~ darkMode",
        darkMode
    );
    return (
        <div
            onClick={() => dispatch(setDarkMode())}
            className="dark-mode__toggle"
        >
            <img src={darkTooggle} alt="" />
        </div>
    );
}
