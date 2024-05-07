/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";

import { Chain } from "xp.network";
import { connectTonWallet } from "../../Wallet/TONWallet/TonConnectors";

export const withTon = (Wrapped) =>
  function CBU(props) {
    const connectionCallback = async (bridge) => {
      const chainWrapper = await bridge.getChain(Chain.TON);
      const account = await connectTonWallet();

      chainWrapper.setSigner(account.signer);
      return chainWrapper;
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.TON]: {
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
