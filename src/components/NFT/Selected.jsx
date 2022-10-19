import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFromSelectedNFTList,
    setSelectedNFTAmount,
} from "../../store/reducers/generalSlice";
import ListedView from "./ListedView";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import Close from "../../assets/img/icons/close.svg";

export default function Selected({ index, nft }) {
    const widget = useSelector((state) => state.general.widget);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState();
    const handleRemove = (nft) => {
        dispatch(removeFromSelectedNFTList(nft));
    };
    const handleInput = (e, index) => {
        // debugger;
        const amount = Number(e.target.value);
        if (e.target.validity.valid) {
            const selected = { amount, index };
            setAmount(e.target.value);
            // if (amount > 25) setLimited(true);
            // else setLimited(false);
            dispatch(setSelectedNFTAmount(selected));
        } else setAmount("");
    };

    return (
        <li key={`selected-nft-${index}`} className={"selected-nfts-item"}>
            <ListedView nft={nft} key={`nft-n-${index}`} />
            <span className="nfts-item__name">
                {nft.data?.name || nft.name || nft.native.name}
            </span>
            {nft.native.amount && (
                <input
                    placeholder="Enter amount"
                    className="nft-item__input"
                    type="text"
                    pattern="[0-9]*"
                    value={amount}
                    onChange={(e) => handleInput(e, index)}
                />
            )}
            <span
                style={nft.native.amount ? {} : { marginLeft: "auto" }}
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
