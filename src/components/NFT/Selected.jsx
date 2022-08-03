import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "../../assets/img/icons/close.svg";
import ListedView from "./ListedView";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import {
    removeFromSelectedNFTList,
    updateAmountInSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { id } from "ethers/lib/utils";

export default function Selected({ index, nft }) {
    const dispatch = useDispatch();
    const widget = useSelector((state) => state.general.widget);
    const [amount, setAmount] = useState();

    const handleRemove = (nft) => {
        dispatch(removeFromSelectedNFTList(nft));
    };

    const handleAmountChange = (e) => {
        const amount = e.target.value.replace(/\D/g, "");
        if (amount) {
            dispatch(updateAmountInSelectedNFTList({ amount, index }));
        }
        setAmount(amount);
    };

    return (
        <li key={`selected-nft-${index}`} className="selected-nfts-item">
            <ListedView nft={nft} key={`nft-n-${index}`} />
            <span className="nfts-item__name">
                {nft.data?.name || nft.name || nft.native.name}
            </span>
            <input
                className="sft-amount__input"
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
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
