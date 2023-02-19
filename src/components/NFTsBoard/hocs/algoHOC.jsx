/* eslint-disable react/prop-types */
import React from "react";

import { setAlgorandClaimables } from "../../../store/reducers/generalSlice";

import { useSelector } from "react-redux";

import { ChainType } from "xp.network";

export const withAlgo = (Wrapped) =>
    function CBU(props) {
        const account = useSelector((s) => s.general.account);
        const algorandClaimables = useSelector(
            (state) => state.general.algorandClaimables
        );

        const getClaimables = (dispatch, chain, _account) =>
            account &&
            !algorandClaimables?.some((nft) => nft.dataLoaded) &&
            chain
                .getClaimables(_account)
                .then(
                    (claimables) =>
                        claimables &&
                        dispatch(setAlgorandClaimables(claimables))
                );

        return (
            <Wrapped
                {...props}
                algorandAccount={account}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                    [ChainType.ALGORAND]: getClaimables,
                }}
            />
        );
    };
