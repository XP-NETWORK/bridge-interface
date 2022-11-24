import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setNoApprovedNFTAlert } from "../../store/reducers/generalSlice";

function NoApprovedNFT() {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.general.noApprovedNFTAlert);
    const approved = useSelector((state) => state.general.approved);

    const handleClose = () => {
        // debugger
        dispatch(setNoApprovedNFTAlert(false));
    };

    useEffect(() => {
        if (approved) {
            dispatch(setNoApprovedNFTAlert(false));
        }
    }, [approved]);

    return (
        <div id="alertb">
            {alert && (
                <div className="aleartBox">
                    Approve selected NFT to continue bridging
                    <span onClick={handleClose} className="closeBox">
                        {" "}
                        <Close className="svgWidget closeIcon" />
                    </span>
                </div>
            )}
        </div>
    );
}

export default NoApprovedNFT;
