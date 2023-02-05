import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RedClose from "../../assets/img/icons/RedClose.svg";
import {
    setDepartureOrDestination,
    setReceiver,
    setSwitchDestination,
    setError,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";
import { isValidChecksumAddress } from "ethereumjs-util";

function DestinationChain() {
    const alert = useSelector((state) => state.general.pasteDestinationAlert);
    const to = useSelector((state) => state.general.to);

    const dispatch = useDispatch();
    const receiver = useSelector((state) => state.general.receiver);

    const handleChange = (e) => {
        const address = e.target.value;
        try {
            if (to.type === "EVM") {
                if (address) {
                    const validAddress = isValidChecksumAddress(address);
                    if (validAddress) {
                        dispatch(setReceiver(address));
                    } else {
                        throw new Error(
                            "INVALID RECIPIENT ADDRESS: The recipient address is not a valid EVM address"
                        );
                    }
                }
            } else {
                dispatch(setReceiver(address));
            }
        } catch (error) {
            dispatch(setError(error));
        }
    };

    function handleSwitchChain() {
        dispatch(setDepartureOrDestination("destination"));
        dispatch(setSwitchDestination(true));
    }

    useEffect(() => {}, [to]);

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
                />
                <span className="invalid">
                    <img src={RedClose} alt="Close" /> Invalid address
                </span>
            </div>
        </div>
    );
}

export default DestinationChain;
