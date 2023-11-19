/* eslint-disable react/prop-types */
import React from "react";

import { setWrappedEGold } from "../../../store/reducers/generalSlice";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { connectExtension } from "../../Wallet/MultiversXWallet/HigherMultiversX";
import { Chain } from "xp.network";

export const withElrond = (Wrapped) =>
    function CBU(props) {
        const getWegldBalance = (dispatch, chain, _account) => {
            return chain.getWegldBalance(_account).then((bal) => bal && dispatch(setWrappedEGold(bal)));
        };

        const connectionCallback = async (bridge) => {
            const chainWrapper = await bridge.getChain(Chain.ELROND);
            const signer = await connectExtension(bridge.network === "testnet" ? "D" : "1");
            chainWrapper.setSigner(signer);
            return chainWrapper;
        };

        return (
            <Wrapped
                {...props}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                    [ChainType.ELROND]: getWegldBalance,
                }}
                chainSpecificRender={{
                    ...(props.chainSpecificRender || {}),
                    [ChainType.ELROND]: {
                        RenderClaimInDestination: ClaimInDestination(connectionCallback),
                    },
                }}
            />
        );
    };
