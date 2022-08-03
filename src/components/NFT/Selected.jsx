import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "../../assets/img/icons/close.svg";
import ListedView from "./ListedView";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import { removeFromSelectedNFTList } from "../../store/reducers/generalSlice";

export default function Selected({ index, nft }) {
    const dispatch = useDispatch();
    const widget = useSelector((state) => state.general.widget);
    const [amount, setAmount] = useState();
    console.log(
        "🚀 ~ file: Selected.jsx ~ line 12 ~ Selected ~ amount",
        amount
    );

    const handleRemove = (nft) => {
        dispatch(removeFromSelectedNFTList(nft));
    };

    const handleAmountChange = (e) => {
        const result = e.target.value.replace(/\D/g, "");
        setAmount(result);
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
