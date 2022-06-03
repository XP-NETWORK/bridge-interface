import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImportModal } from "../../store/reducers/generalSlice";
import {ReactComponent as ImportNft} from "../../assets/img/icons/import.svg"

export default function ImportNFTButton() {
    const dispatch = useDispatch();

    const widget = useSelector((state) => state.general.widget)

    const handleClick = () => {
        dispatch(setImportModal(true));
    };
    return (
        <div onClick={handleClick} className="import-nft-button">
            {widget?<ImportNft className="svgWidget stroke"/> :  <div className="import-icon"></div>}
           
        </div>
    );
}
