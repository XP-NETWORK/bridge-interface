import React from "react";
import icon from "../../assets/img/icons/Search.svg";
import PropTypes from "prop-types";

export default function SearchButton({ handleSearchTop }) {
    return (
        <div onClick={handleSearchTop} className="search-button">
            <img src={icon} className="search__icon" alt="" />
        </div>
    );
}

SearchButton.propTypes = {
    handleSearchTop: PropTypes.any.isRequired,
};
