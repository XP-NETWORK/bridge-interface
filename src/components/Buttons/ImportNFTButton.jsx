import React from "react";
import { useDispatch } from "react-redux";
import { setImportModal } from "../../store/reducers/generalSlice";
import { ReactComponent as ImportNft } from "../../assets/img/icons/import.svg";

import { useSelector } from "react-redux";

export default function ImportNFTButton() {
  const dispatch = useDispatch();

  const widget = useSelector((state) => state.widget.widget);

  const handleClick = () => {
    dispatch(setImportModal(true));
  };
  return (
    <div onClick={handleClick} className="import-nft-button">
      {widget ? (
        <ImportNft className="svgWidget stroke" />
      ) : (
        <div className="import-icon"></div>
      )}
    </div>
  );
}
