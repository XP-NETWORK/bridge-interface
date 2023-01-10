import React from "react";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import PropTypes from "prop-types";

export default function CloseButton({ handleSearchTop }) {
    return (
        <div onClick={handleSearchTop} className="close__btn">
            <div className="CloseIcon">
                <Close className="svgWidget " />
            </div>{" "}
        </div>
    );
}

CloseButton.propTypes = {
    handleSearchTop: PropTypes.any.isRequired,
};
