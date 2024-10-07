/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";
import { connectMyNearWallet } from "../../Wallet/ConnectWalletHelper";
import { useSelector } from "react-redux";

export const withNear = (Wrapped) =>
  function CBU(props) {
    const network = useSelector((state) => state.general.testNet);

    const connectionCallback = async (bridge) => {
      console.log("inside connectionCallback");
      const chainWrapper = await bridge.getChain(Chain.NEAR);
      const signer = await connectMyNearWallet(network);
      console.log("signer: ", signer);
      chainWrapper.setSigner(signer);
      return chainWrapper;
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.NEAR]: {
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
