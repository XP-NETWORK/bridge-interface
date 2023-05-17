import React from "react";
import { withServices } from "../App/hocs/withServices";
import PropTypes from "prop-types";

const SenderWallet = ({ serviceContainer }) => {
    console.log(
        "🚀 ~ file: SenderWallet.jsx:5 ~ SenderWal ~ Props:",
        serviceContainer
    );
    return <li className="wllListItem">Sender Wallet</li>;
};

SenderWallet.propTypes = {
    serviceContainer: PropTypes.object,
};

export default withServices(SenderWallet);
