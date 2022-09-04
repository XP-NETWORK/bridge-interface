import React from "react";

export default function SearchButton({ handleSearchTop }) {
    return (
        <div onClick={handleSearchTop} className="search-button">
            <div className="search__icon"></div>
        </div>
    );
}
