import React from "react";
import icon from "../../assets/img/icons/Search.svg";
export default function SearchButton({ handleSearchTop }) {
    return (
        <div onClick={handleSearchTop} className="search-button">
            <img src={icon} className="search__icon" alt="" />
        </div>
    );
}
