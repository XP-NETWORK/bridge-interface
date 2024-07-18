/* eslint-disable react/prop-types */
import React from "react";

import { checkXpNetLocked } from "../../../services/deposits";

import { setDiscountLeftUsd } from "../../../store/reducers/discountSlice";

import { ChainType } from "xp.network";

import DeployUserStore from "../../TransferBoard/DeployUserStore";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";

import { useSelector } from "react-redux";
import { connectHashPack } from "../../Wallet/HederaWallet/hederaConnections";
import { sleep } from "../../../utils";
import { v3_bridge_mode } from "../../values";

export const withHedera = (Wrapped) =>
  function CBU(props) {
    const discounts = async (dispatch, _, account) => {
      if (account) {
        const data = await checkXpNetLocked(account);
        dispatch(setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25)));
      }
    };
    const network = useSelector((state) => state.general.testNet);

    const connectionCallback = async (bridge, toChain) => {
      await connectHashPack(network);
      await sleep(10000);

      if (v3_bridge_mode) {
        return;
      }

      return await new Promise((r) => {
        (async () => {
          let chainWapper = await bridge.getChain(toChain);
          while (!chainWapper.signer) {
            chainWapper = await bridge.getChain(toChain);
            await new Promise((r) => setTimeout(r, 2000));
          }

          r(chainWapper);
        })();
      });
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.HEDERA]: {
            DeployUserStore,
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
        chainSpecific={{
          ...(props.chainSpecific || {}),
          [ChainType.HEDERA]: discounts,
        }}
      />
    );
  };
