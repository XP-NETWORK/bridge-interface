import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSelectedNFTList } from "../../store/reducers/generalSlice";
import ListedView from "./ListedView";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import Close from "../../assets/img/icons/close.svg";

export default function Selected({ index, nft }) {
    const widget = useSelector((state) => state.general.widget);
    const dispatch = useDispatch();

    const handleRemove = (nft) => {
        dispatch(removeFromSelectedNFTList(nft));
    };

    return (
        <li key={`selected-nft-${index}`} className="selected-nfts-item">
            <ListedView nft={nft} key={`nft-n-${index}`} />
            <span className="nfts-item__name">
                {nft.data?.name || nft.name || nft.native.name}
            </span>
            <input
                placeholder="Enter amount"
                className="nft-item__input"
                type="text"
            />
            <span
                onClick={() => handleRemove(nft)}
                className="selected-nfts__delete"
            >
                {widget ? (
                    <CloseComp className="svgWidget" />
                ) : (
                    <img alt="" src={Close} />
                )}
            </span>
        </li>
    );
}
