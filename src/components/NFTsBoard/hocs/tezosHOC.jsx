/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";

export const withTezos = (Wrapped) =>
  function CBU(props) {
    const connectionCallback = async (bridge) => {
      const chainWrapper = await bridge.getChain(Chain.TEZOS);
      return chainWrapper;
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.TEZOS]: {
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
