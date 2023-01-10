import React from "react";
import Blockies from "react-blockies";
import PropTypes from "prop-types";

export default function Identicon({ account }) {
    return (
        <Blockies
            seed={account}
            size={10}
            scale={3}
            color="#fff000"
            bgColor="#fff"
            spotColor="#fb1000"
            className="identicon"
        />
    );
}
Identicon.propTypes = {
    account: PropTypes.string,
};
