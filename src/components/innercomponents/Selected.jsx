import React from "react";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import Back from "../../assets/img/icons/Back.svg";
import {
  cleanSelectedNFTList,
  removeFromSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { useDispatch } from "react-redux";

export default function Selected({ img, name, index }) {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeFromSelectedNFTList(index));
  };

  return (
    <li className="nftSelecItem">
      <img src={img} alt="NFT" />
      <span className="nftSelecItem__name">{name}</span>
      <span className="Close">
        {" "}
        <Close className="svgWidget" onClick={() => handleRemove()} />
      </span>
    </li>
  );
}
