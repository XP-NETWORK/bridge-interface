import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHAIN_INFO, Chain } from "xp.network";
import {
  cleanSelectedNFTList,
  initialSecretCred,
  setSecretCred,
  setSecretLoggedIn,
} from "../../store/reducers/generalSlice";
import { useCheckMobileScreen } from "../Settings/hooks";

import { CopyButton } from "./CopyButton";

export default function SecretContractPanel() {
  const { secretCred } = useSelector(({ general: { secretCred } }) => ({
    secretCred,
  }));

  const dispatch = useDispatch();

  const isMobile = useCheckMobileScreen();
  const chain = CHAIN_INFO.get(Chain.SECRET);

  return (
    <div className="scretPannelWrap">
      <div className="scretPannel">
        <div>
          <p>
            <span>Contract: </span>
            <a
              target="_blank"
              rel="noreferrer"
              href={`${chain.blockExplorerUrlAddr}${secretCred.contract}`}
            >
              {isMobile
                ? `${secretCred.contract.slice(
                    0,
                    5
                  )}...${secretCred.contract.slice(-6)}`
                : secretCred.contract}
            </a>
          </p>
          <CopyButton text={secretCred.contract} />
        </div>

        <div
          className="clear-selected"
          onClick={() => {
            dispatch(cleanSelectedNFTList());
            dispatch(setSecretCred(initialSecretCred));
            dispatch(setSecretLoggedIn(false));
          }}
        >
          Change contract
        </div>
      </div>
    </div>
  );
}
