import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import darkTooggle from "../../assets/img/nav/dark-tooggle.svg";
import lightToggle from "../../assets/img/nav/light-toggle.svg";
import { setDarkMode } from "../../store/reducers/generalSlice";

export default function DarkMode() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.general.darkMode);
    const body = document.getElementsByClassName("bridgeBody");
    const burger = document.querySelector(".svgWidget");

    useEffect(() => {
        if (darkMode) {
            body[0].classList.add("dark-mode");
        } else {
            body[0].classList.remove("dark-mode");
        }
    }, [darkMode]);

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
