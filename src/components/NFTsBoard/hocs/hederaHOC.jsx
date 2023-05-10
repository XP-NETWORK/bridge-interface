/* eslint-disable react/prop-types */
import BigNumber from "bignumber.js";
import React from "react";

import {
    setHederaClaimables,
    setNFTSetToggler,
    setTransferLoaderModal,
} from "../../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import { ChainType, Chain } from "xp.network";

import { withServices } from "../../App/hocs/withServices";

const CheckClaimables = withServices(({ serviceContainer }) => {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const getClaimables = () => {
        bridge.getChain(Chain.HEDERA).then(async (wrapper) => {
            //const hashConnect = 9.signer.hashconnect;
            /*const cb = async (payload) => {
                if (!payload) return;
                const message = await hashConnect.messages.decode(
                    payload,
                    hashConnect
                );
                if (!message.data?.receipt || message.data.response) return;
                if (message.data?.receipt) {
                    let notEmpty = true;
                    let index = 1;
                    const tokens = [];

                    while (notEmpty) {
                        const claimableIndex = new Uint8Array(
                            Buffer.from(message.data.receipt, "base64")
                        ).subarray(
                            (index != null ? index : 0) * 32,
                            (index != null ? index : 0) * 32 + 32
                        );

                        const token = Buffer.from(claimableIndex).toString(
                            "hex"
                        );
                        const hexToken = "0x" + token;

                        token &&
                            new BigNumber(hexToken).gt(new BigNumber(0)) &&
                            tokens.push(hexToken);

                        if (!token) notEmpty = false;
                        index++;
                    }

                    tokens.length &&
                        dispatch(setHederaClaimables(tokens.slice(1)));
                }
            };*/
            // hashConnect.relay.payload.on(cb);
            dispatch(setTransferLoaderModal(true));
            const claimables = await wrapper.getClaimables().catch(() => []);
            dispatch(setTransferLoaderModal(false));
            claimables?.length &&
                dispatch(
                    setHederaClaimables(
                        claimables.map((token) =>
                            new BigNumber(token._hex).toString(16)
                        )
                    )
                );
        });
    };
    return (
        <button className="hederaCheckClaimBtn" onClick={getClaimables}>
            Check Claimables
        </button>
    );
});

const RenderClaimables = withServices(({ serviceContainer }) => {
    const { bridge } = serviceContainer;
    const hederaClaimables = useSelector(
        (state) => state.general.hederaClaimables
    );
    const dispatch = useDispatch();
    const clickClaim = (token) => {
        bridge.getChain(Chain.HEDERA).then(async (wrapper) => {
            await wrapper.assosiate();
            await wrapper.claim(token);
            const index = hederaClaimables.findIndex((t) => t === token);

            dispatch(
                setHederaClaimables([
                    ...hederaClaimables.slice(0, index),
                    ...hederaClaimables.slice(index + 1),
                ])
            );
            await new Promise((r) => setTimeout(r, 1000));
            dispatch(setNFTSetToggler());
        });
    };

    return (
        <>
            {Array.isArray(hederaClaimables) &&
                hederaClaimables.map((item) => (
                    <div key={item} className="nft-box__wrapper">
                        <div className="nft__card--selected claimable-card__wrapper">
                            <div className="claimable-card__text">
                                The NFT is not claimed
                            </div>
                            {new BigNumber(item).toString()}
                            <div
                                onClick={() => clickClaim(item)}
                                style={{ background: "black" }}
                                className="not-whitelisted__button"
                            >
                                Claim
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
});

export const withHedera = (Wrapped) =>
    function CBU(props) {
        return (
            <Wrapped
                {...props}
                //algorandAccount={algorandAccount}
                chainSpecificRender={{
                    ...(props.chainSpecificRender || {}),
                    [ChainType.HEDERA]: { CheckClaimables, RenderClaimables },
                }}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                }}
            />
        );
    };
