import React from "react";
import PropTypes from "prop-types";

export const LittleLoader = ({ className }) => (
    <div className={`lds-ellipsis ${className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
LittleLoader.propTypes = {
    className: PropTypes.string,
};
