import React from "react";
import { useDispatch } from "react-redux";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";
import { setImportModal } from "../../store/reducers/generalSlice";

export default function ImportNFTButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setImportModal(true));
        handleGA4Event(googleAnalyticsCategories.Button, "Import NFT button");
    };
    return (
        <div onClick={handleClick} className="import-nft-button">
            <div className="import-icon"></div>
        </div>
    );
}
