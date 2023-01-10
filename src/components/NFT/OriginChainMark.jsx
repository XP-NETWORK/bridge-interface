import React from "react";
import PropTypes from "prop-types";

export default function OriginChainMark({ icon }) {
    return (
        <div className="origin__mark">
            <img style={{ width: "20px" }} src={icon} alt="" />
        </div>
    );
}

OriginChainMark.propTypes = {
    icon: PropTypes.string,
};
