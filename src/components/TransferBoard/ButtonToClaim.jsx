import React from "react";
import { useDispatch } from "react-redux";
import { setIsClaimViaHash } from "../../store/reducers/generalSlice";

export const ButtonToClaim = () => {
  const dispatch = useDispatch();

  const openClaimModal = () => {
    dispatch(setIsClaimViaHash(true));
  };

  return (
    <div onClick={openClaimModal} className={"transfer-button"}>
      Claim NFT
    </div>
  );
};
