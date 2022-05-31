import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImportModal } from "../../store/reducers/generalSlice";

export default function ImportNFTButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setImportModal(true));
    };
    return (
        <div onClick={handleClick} className="import-nft-button">
            <div className="import-icon"></div>
        </div>
    );
}
