/* eslint-disable react/prop-types */
import BigNumber from "bignumber.js";
import React, { useEffect } from "react";

import {
    setHederaClaimables,
    setNFTSetToggler,
    setTransferLoaderModal,
} from "../../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import { ChainType, Chain } from "xp.network";

import { withServices } from "../../App/hocs/withServices";

import { StringShortener } from "../../../utils";

const CheckClaimables = withServices(({ serviceContainer }) => {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const getClaimables = () => {
        bridge.getChain(Chain.HEDERA).then(async (wrapper) => {
            dispatch(setTransferLoaderModal(true));
            const claimables = await wrapper.getClaimables().catch(() => []);

            const flatClaimables = claimables.reduce((acc, cur) => {
                return [
                    ...acc,
                    ...cur.tokens.map((item) => ({
                        contract: cur.contract,
                        htsToken: cur.htsToken,
                        tokenId: new BigNumber(item._hex).toString(16),
                    })),
                ];
            }, []);

            flatClaimables?.length &&
                dispatch(setHederaClaimables(flatClaimables));
            dispatch(setTransferLoaderModal(false));
        });
    };
    return (
        <button className="hederaCheckClaimBtn" onClick={getClaimables}>
            Check Claimables
        </button>
    );
});

const RenderClaimables = withServices(({ serviceContainer, setClaimables }) => {
    const { bridge } = serviceContainer;
    const hederaClaimables = useSelector(
        (state) => state.general.hederaClaimables
    );

    useEffect(() => {
        setClaimables(hederaClaimables.length);
    }, [hederaClaimables]);

    const dispatch = useDispatch();

    const clickClaim = (token) => {
        bridge.getChain(Chain.HEDERA).then(async (wrapper) => {
            /*const assosiated = await wrapper.assosiate(token);

            if (!assosiated) {
                dispatch(
                    setError({ message: "User rejected token assosiation" })
                );
                return;
            }*/

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
                            <div>{StringShortener(item.contract, 5)}</div>
                            {new BigNumber(item.tokenId).toString()}
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
