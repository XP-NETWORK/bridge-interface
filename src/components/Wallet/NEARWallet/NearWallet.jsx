import React, { useState } from "react";

import PropTypes from "prop-types";

import near from "../../../assets/img/wallet/NearWallet.svg";

import { withServices } from "../../App/hocs/withServices";

import { Chain } from "xp.network";
import { /*useDispatch,*/ useSelector } from "react-redux";
import {
    googleAnalyticsCategories,
    handleGA4Event,
} from "../../../services/GA4";
/*import { setWalletsModal } from "../../../store/reducers/generalSlice";
import { getRightPath } from "../../../wallet/helpers";
import { useNavigate } from "react-router-dom";*/

function NearWallet({ serviceContainer }) {
    //const isMobile = innerWidth <= 480;
    //const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { from, to } = useSelector((state) => state.general);

    const [lock, setLock] = useState(false);

    // const navigateToAccountRoute = () => {
    //  if (from && to) navigate(getRightPath());
    // };

    const connectHandler = async () => {
        try {
            setLock(true);
            const chain = await serviceContainer?.bridge?.getChain(Chain.NEAR);
            const nearParams = serviceContainer?.bridge?.config?.nearParams;

            const nearWalletConnection = await chain?.connect();

            const network =
                location.pathname.match(/(staging|testnet)/)?.at(0) || "";
            const successUrl = `${location.protocol}//${
                location.host
            }/${network}/connect?${to ? `toChain=${to.nonce}` : ""}`;

            nearWalletConnection.requestSignIn({
                contractId: nearParams.bridge,
                ...(location.pathname.includes("account")
                    ? { successUrl }
                    : { successUrl }),
                //successUrl,
            });
            handleGA4Event(
                googleAnalyticsCategories.Connect,
                `Connected with: Near Wallet`
            );
        } catch (e) {
            setLock(false);
            console.log(e, "e");
        }
        // dispatch(setWalletsModal(false));
        //navigateToAccountRoute();
    };

    const getStyles = () => {
        //return { display: "none" };
        // eslint-disable-next-line no-debugger
        // debugger;
        const OFF = { pointerEvents: "none", opacity: "0.6" };
        if (lock) return OFF;
        //const NONE = { display: "none" };
        //if (!testNet) return NONE;
        if (!from) return {};
        else if (from && from?.type !== "NEAR") return OFF;
        // return {};
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
