import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromSelectedNFTList,
  setSelectedNFTAmount,
} from "../../store/reducers/generalSlice";
import ListedView from "./ListedView";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import Close from "../../assets/img/icons/close.svg";
import PropTypes from "prop-types";

export default function Selected({ index, nft }) {
  const widget = useSelector((state) => state.general.widget);

  const nfts = useSelector((state) => state.general.selectedNFTList);
  const dispatch = useDispatch();

  const handleRemove = (nft) => {
    dispatch(removeFromSelectedNFTList(nft));
  };

  const handleInput = (e, index) => {
    // debugger;
    let amount = Number(e.target.value);
    if (amount > 50) amount = 50;
    if (amount > Number(nft.native?.amount))
      amount = Number(nft.native?.amount);

    if (amount < 1) amount = 1;
    if (e.target.validity.valid) {
      const selected = { amount, index };

      // if (amount > 25) setLimited(true);
      // else setLimited(false);
      dispatch(setSelectedNFTAmount(selected));
    }
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
          value={
            nfts.find(
              (nft1) =>
                String(nft1.native?.tokenId) + String(nft1.native.contract) ===
                String(nft.native.tokenId) + String(nft.native.contract)
            )?.amountToTransfer
          }
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
Selected.propTypes = {
  index: PropTypes.number,
  nft: PropTypes.object,
};
