import React from "react";
import icon from "../../assets/img/wallet/unstoppable.svg";
import { connectUnstoppable } from "./ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import {
    setAccount,
    setUnstoppableDomains,
} from "../../store/reducers/generalSlice";
import PropTypes from "prop-types";
// import { withServices } from "../../App/hocs/withServices";

export default function Unscopables() {
    // const updatedComponent = withServices((props) => {})

    const dispatch = useDispatch();
    const handleConnect = async () => {
        // close();
        // eslint-disable-next-line no-debugger
        debugger;
        window.localStorage.clear();
        const address = await connectUnstoppable();
        if (address) dispatch(setUnstoppableDomains(true));
        dispatch(setAccount(address));
    };

    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    const getStyle = () => {
        switch (true) {
            case from && from.type !== "EVM":
                return OFF;
            case temporaryFrom && temporaryFrom.type !== "EVM":
                return OFF;
            default:
                break;
        }
    };

    return (
        <li
            style={getStyle()}
            onClick={handleConnect}
            className="wllListItem"
            data-wallet="Unstoppable"
        >
            <img src={icon} alt="#" />
            <p>Unstoppable Domains</p>
        </li>
    );
}

Unscopables.propTypes = {
    close: PropTypes.any,
};
