/* eslint-disable react/prop-types */
import React from "react";

import { setAlgorandClaimables } from "../../../store/reducers/generalSlice";

//import { useSelector } from "react-redux";

import { ChainType } from "xp.network";

export const withAlgo = (Wrapped) =>
    function CBU(props) {
        //const algorandAccount = useSelector((s) => s.general.algorandAccount);
        //console.log(algorandAccount, "algorandAccount");
        //const algorandClaimables = useSelector(
        //   (state) => state.general.algorandClaimables
        // );

        const getClaimables = (dispatch, chain, _account) =>
            //algorandAccount &&

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
                //algorandAccount={algorandAccount}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                    [ChainType.ALGORAND]: getClaimables,
                }}
            />
        );
    };
