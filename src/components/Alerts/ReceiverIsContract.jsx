import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import {
    setCheckDestinationAddress,
    setPasteDestinationAlert,
} from "../../store/reducers/generalSlice";

function ReceiverIsContract() {
    const dispatch = useDispatch();
    const receiver = useSelector((state) => state.general.receiver);
    const alert = useSelector((state) => state.general.checkDestinationAddress);
    console.log(
        "🚀 ~ file: ReceiverIsContract.jsx:11 ~ PasteDestinationAlert ~ alert:",
        alert
    );

    const handleClose = () => {
        dispatch(setCheckDestinationAddress(false));
    };

    useEffect(() => {
        if (receiver) {
            dispatch(setPasteDestinationAlert(false));
        }
    }, [receiver]);

    return (
        <div id="alertb">
            {alert && (
                <div className="aleartBox">
                    Destination address is contract address. Direct transfer to
                    a contract is likely to fail.
                    <span onClick={handleClose} className="closeBox">
                        {" "}
                        <Close className="svgWidget closeIcon" />
                    </span>
                </div>
            )}
        </div>
    );
}

export default ReceiverIsContract;
