/* eslint-disable react/prop-types */
import React from "react";

import { setAlgorandClaimables } from "../../../store/reducers/generalSlice";

//import { useSelector } from "react-redux";

import { ChainType } from "xp.network";

export const withAlgo = (Wrapped) =>
    function CBU(props) {
        const getClaimables = (dispatch, chain, _account) =>
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
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                    [ChainType.ALGORAND]: getClaimables,
                }}
            />
        );
    };
