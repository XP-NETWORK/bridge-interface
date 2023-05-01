/* eslint-disable no-debugger */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RedClose from "../../assets/img/icons/RedClose.svg";
import {
    generalValidation,
    inputFilter,
    validateFunctions,
    maxChainAddressLengths,
    checkIfContractAddress,
} from "../../services/addressValidators";
import {
    setDepartureOrDestination,
    setReceiver,
    setSwitchDestination,
    setError,
    setIsInvalidAddress,
    // setReceiverIsContract,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";
import { withServices } from "../App/hocs/withServices";
import PropTypes from "prop-types";

function DestinationChain({ serviceContainer }) {
    const { bridge } = serviceContainer;
    const [destinationProvider, setDestinationProvider] = useState("");
    let alert = useSelector((state) => state.general.pasteDestinationAlert);
    let to = useSelector((state) => state.general.to);
    const isInvalid = useSelector((state) => state.general.isInvalid);

    const dispatch = useDispatch();
    let receiver = useSelector((state) => state.general.receiver);
    let [maxLength, setMaxLength] = useState(0);

    function handleSwitchChain() {
        dispatch(setDepartureOrDestination("destination"));
        dispatch(setSwitchDestination(true));
    }

    useEffect(() => {
        dispatch(setReceiver(""));
        dispatch(setIsInvalidAddress(true));
        setMaxLength(maxChainAddressLengths[to.type]);
        bridge.getChain(to.nonce).then((chain) => {
            const provider = chain.chain.getProvider();
            setDestinationProvider(provider);
        });
    }, [to]);

    useEffect(() => {
        if (receiver === "") {
            dispatch(setIsInvalidAddress(true));
        }
    }, [receiver]);

    const handleChange = (e) => {
        try {
            if (inputFilter(e)) {
                let address = e.target.value.trim();
                if (generalValidation(e, receiver)) {
                    const validateFunc = validateFunctions[to.type];
                    console.log("validateFunc :", to.type);
                    if (validateFunc) {
                        dispatch(setIsInvalidAddress(validateFunc(address)));
                        if (validateFunc(address) && to.type === "EVM") {
                            let bc;
                            checkIfContractAddress(
                                address,
                                destinationProvider
                            ).then((res) => (bc = res));
                            console.log({ bc });
                        }
                    }
                    dispatch(setReceiver(address));
                } else {
                    // dispatch(setIsInvalidAddress(true));
                    // dispatch(setReceiver(address));
                }
            }
        } catch (error) {
            dispatch(setError(error));
        }
    };

    return (
        <div className="destination-props">
            <div className="destination__header">
                <span className="destination__title">Destination</span>
                <ChainSwitch assignment={"to"} func={handleSwitchChain} />
            </div>

            <div
                className={
                    !alert
                        ? "destination__address"
                        : "destination__address desti-alert"
                }
            >
                <input
                    maxLength={maxLength}
                    value={receiver}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Paste destination address"
                    className={
                        isInvalid ? "reciverAddress" : "reciverAddress invalid"
                    }
                />
                {!isInvalid && (
                    <span className={"invalid visible"}>
                        <img src={RedClose} alt="Close" /> Invalid address
                    </span>
                )}
            </div>
        </div>
    );
}

DestinationChain.propTypes = {
    serviceContainer: PropTypes.object,
};

export default withServices(DestinationChain);
