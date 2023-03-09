/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RedClose from "../../assets/img/icons/RedClose.svg";
import {
    generalValidation,
    inputFilter,
    validateFunctions,
} from "../../services/addressValidators";
import {
    setDepartureOrDestination,
    setReceiver,
    setSwitchDestination,
    setError,
    setIsInvalidAddress,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";

function DestinationChain() {
    let alert = useSelector((state) => state.general.pasteDestinationAlert);
    const to = useSelector((state) => state.general.to);
    const isInvalid = useSelector((state) => state.general.isInvalid);

    const dispatch = useDispatch();
    let receiver = useSelector((state) => state.general.receiver);

    function handleSwitchChain() {
        dispatch(setDepartureOrDestination("destination"));
        dispatch(setSwitchDestination(true));
    }

    useEffect(() => {
        dispatch(setReceiver(""));
        dispatch(setIsInvalidAddress(true));
    }, [to]);

    useEffect(() => {
        if (receiver === "") {
            dispatch(setIsInvalidAddress(true));
        }
    }, [receiver]);

    const handleChange = (e) => {
        // debugger;
        try {
            if (inputFilter(e)) {
                let address = e.target.value.trim();
                if (generalValidation(e, receiver)) {
                    const validateFunc = validateFunctions[to.type];
                    dispatch(setIsInvalidAddress(validateFunc(address)));
                    dispatch(setReceiver(address));
                } else {
                    dispatch(setIsInvalidAddress(true));
                    dispatch(setReceiver(address));
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

export default DestinationChain;
