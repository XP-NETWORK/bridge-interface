/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";
import { connectMyNearWallet } from "../../Wallet/ConnectWalletHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  setNEARContractSearch,
  setPreFetchData,
} from "../../../store/reducers/generalSlice";
import { XPDecentralizedUtility } from "../../../utils/xpDecentralizedUtility";

const PreNftFech = ({ show }) => {
  const dispatch = useDispatch();

  const NEARContractSearch = useSelector(
    (state) => state.general.NEARContractSearch,
  );

  const handleLoadAssets = () => {
    if (!NEARContractSearch) return;
    dispatch(
      setPreFetchData({
        contract: NEARContractSearch,
      }),
    );
    dispatch(setNEARContractSearch(""));
  };

  return (
    <div className={`nftListBox preNftFetch ${show && "hidden"}`}>
      <div className="preScreen">
        <h3>NFT contract</h3>
        <p>Please enter contract address below.</p>

        <div className="fieldsWrapper">
          <div className="contract-input__wrapper">
            <input
              onBlur={() => {}}
              onChange={(e) => dispatch(setNEARContractSearch(e.target.value))}
              type="text"
              id="contractAdd"
              name="contractAddress"
              placeholder="Paste Contract Address"
              value={NEARContractSearch}
              className={""}
            />
            {/*contractOnBlur && !validContract && (
            <span className={"contract--invalid"}>
              Error Contract Address
            </span>
          )*/}
            {/* {toggle === "set" && <SecretContractsDropdown />} */}
          </div>
        </div>
        <div className="buttonContainer">
          <div className="transfer-button" onClick={() => handleLoadAssets()}>
            Load assets
          </div>
        </div>
      </div>
    </div>
  );
};

export const withNear = (Wrapped) =>
  function CBU(props) {
    const xpDecentralizedUtility = new XPDecentralizedUtility();
    const nearParams = xpDecentralizedUtility.config.nearParams;

    const connectionCallback = async (bridge) => {
      const chainWrapper = await bridge.getChain(Chain.NEAR);
      const signer = await connectMyNearWallet(nearParams?.bridge);
      chainWrapper.setSigner(signer);
      return chainWrapper;
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.NEAR]: {
            PreNftFech,
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
