/* eslint-disable react/prop-types */
import React from "react";

import { checkXpNetLocked } from "../../../services/deposits";

import { setDiscountLeftUsd } from "../../../store/reducers/discountSlice";

import { ChainType } from "xp.network";

import DeployUserStore from "../../TransferBoard/DeployUserStore";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";

import { injected } from "../../../wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { getChainObject } from "../../values";
import { switchNetwork } from "../../../services/chains/evm/evmService";

export const withEVM = (Wrapped) =>
    function CBU(props) {
        const discounts = async (dispatch, _, account) => {
            if (account) {
                const data = await checkXpNetLocked(account);
                dispatch(setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25)));
            }
        };

        const { activate } = useWeb3React();

        const connectionCallback = async (bridge, toChain) => {
            bridge.currentType === "EVM" ? await switchNetwork(getChainObject(toChain)) : await activate(injected);
            await new Promise((r) => setTimeout(r, 3000));

            return await new Promise((r) => {
                (async () => {
                    let chainWapper = await bridge.getChain(toChain);
                    while (!chainWapper.signer) {
                        console.log(chainWapper.signer, "signer");
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
                    [ChainType.EVM]: {
                        DeployUserStore,
                        RenderClaimInDestination: ClaimInDestination(connectionCallback),
                    },
                }}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                    [ChainType.EVM]: discounts,
                }}
            />
        );
    };
