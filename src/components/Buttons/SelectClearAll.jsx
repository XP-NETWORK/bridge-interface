import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    allSelected,
    cleanSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { ReactComponent as Check } from "../../assets/img/icons/gray_check.svg";

export default function SelectClearAll() {
    const dispatch = useDispatch();
    const nfts = useSelector((state) => state.general.NFTList);
    const onlyWhiteListedNFTs = nfts?.filter((n) => n.whitelisted);
    const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
    const OFF = { opacity: 0.6, pointerEvents: "none" };

    return onlyWhiteListedNFTs?.length === selectedNFTs?.length &&
        selectedNFTs?.length ? (
        <div
            className="delete-all"
            onClick={() => dispatch(cleanSelectedNFTList())}
        >
            <Check className="svgWidget" />
        </div>
    ) : (
        <div
            style={nfts ? {} : OFF}
            onClick={() => dispatch(allSelected())}
            className="select-all"
        >
            <Check className="svgWidget" />
        </div>
    );
}
