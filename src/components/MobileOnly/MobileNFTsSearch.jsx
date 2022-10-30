import React from "react";
import { useDispatch } from "react-redux";
import { setSearchNFTList } from "../../store/reducers/generalSlice";
import CloseButton from "../Buttons/CloseButton";
import PropTypes from "prop-types";

export default function MobileNFTsSearch({ handleSearchTop }) {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(setSearchNFTList(e.target.value));
    };

    return (
        <div className="mobile-search__top">
            <CloseButton handleSearchTop={handleSearchTop} />
            <div className="mobile-search-input__box">
                <div className="mobile-search-input__icon"></div>
                <input
                    onChange={(e) => handleSearch(e)}
                    type="text"
                    placeholder="Search NFT"
                    className="serchInput"
                />
            </div>
        </div>
    );
}

MobileNFTsSearch.propTypes = {
    handleSearchTop: PropTypes.any,
};
