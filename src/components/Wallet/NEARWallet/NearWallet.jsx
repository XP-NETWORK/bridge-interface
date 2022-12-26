import React from "react";

import PropTypes from "prop-types";

import near from "../../../assets/img/wallet/NearWallet.svg";

import { withServices } from "../../App/hocs/withServices";

import { Chain } from "xp.network";
import { useDispatch, useSelector } from "react-redux";
import { setWalletsModal } from "../../../store/reducers/generalSlice";

function NearWallet({ serviceContainer }) {
    //const isMobile = innerWidth <= 480;
    const dispatch = useDispatch();
    const { from, testNet } = useSelector((state) => state.general);

    const connectHandler = async () => {
        try {
            const chain = await serviceContainer?.bridge?.getChain(Chain.NEAR);
            const nearParams = serviceContainer?.bridge?.config?.nearParams;
            const nearWalletConnection = await chain?.connect();

            const network =
                location.pathname.match(/^\/(staging|testnet)\/.+/)?.at(1) ||
                "";

            nearWalletConnection.requestSignIn(
                nearParams.bridge, // contract requesting access
                "XP.NETWORK Bridge", // optional title
                `${location.protocol}//${location.host}/${network}/connect?NEARTRX=true`,
                `${location.protocol}//${location.host}/${network}/connect?NEARTRX=true`
            );
        } catch (e) {
            console.log(e, "e");
        }
        dispatch(setWalletsModal(false));
    };

    const getStyles = () => {
        const OFF = { pointerEvents: "none", opacity: "0.6" };
        if (!testNet) return { display: "none" };
        else if (!from) return {};
        else if (from && from?.type === "NEAR") return OFF;
    };

    return (
        <li
            style={getStyles()}
            onClick={connectHandler}
            className="wllListItem"
            data-wallet="NearWallet"
        >
            <img style={{ width: "28px" }} src={near} alt="nearWallet" />
            <p>NearWallet</p>
        </li>
    );
}

NearWallet.propTypes = {
    styles: PropTypes.func,
    connectWallet: PropTypes.func,
    serviceContainer: PropTypes.object,
};

export default withServices(NearWallet);