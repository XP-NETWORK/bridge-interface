import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setDepartureOrDestination,
    setError,
    setIsInvalidAddress,
    setReceiver,
    setSwitchDestination,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";

import "./Mobile.css";
import { withServices } from "../App/hocs/withServices";

import propTypes from "prop-types";
import { validateFunctions } from "../../services/addressValidators";

function MobileDestinationAddressBar({ serviceContainer }) {
    const { bridge } = serviceContainer;
    const receiver = useSelector((state) => state.general.receiver);
    const dispatch = useDispatch();
    const to = useSelector((state) => state.general.to);
    const isInvalid = useSelector((state) => state.general.isInvalid);

    const handleChange = async (e) => {
        const address = e.target.value;
        const chainWrapper = await bridge.getChain(to.nonce);
        const validAddress = await chainWrapper.validateAddress(address);
        console.log(validAddress);
        try {
            const validateFunc = validateFunctions[to.type];
            if (validateFunc) {
                dispatch(setIsInvalidAddress(validateFunc(address)));
            }
            dispatch(setReceiver(address));
        } catch (error) {
            dispatch(setError(error));
        }
    };

    function handleSwitchChain() {
        dispatch(setDepartureOrDestination("destination"));
        dispatch(setSwitchDestination(true));
    }
    const alert = useSelector((state) => state.general.pasteDestinationAlert);

    return (
        <div className="mobile-destination__container">
            <div className="mobile-destination__header">
                <div className="mobile-destination__subtitle">
                    <div>Destination Chain</div>
                </div>
                <ChainSwitch assignment={"to"} func={handleSwitchChain} />
            </div>
            <div
                className={
                    !alert
                        ? "mobile-destination__address"
                        : "mobile-destination__address desti-alert"
                }
            >
                <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={receiver}
                    className={`reciverAddress ${!isInvalid ? "invalid" : ""}`}
                    placeholder="Paste destination address"
                />
                <span className={`invalid ${!isInvalid ? "visible" : ""}`}>
                    Invalid address
                </span>
            </div>
        </div>
    );
}

MobileDestinationAddressBar.propTypes = {
    serviceContainer: propTypes.object,
};

export default withServices(MobileDestinationAddressBar);
