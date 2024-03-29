import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";
import {
    setBigLoader,
    setNFTList,
    setPreloadNFTs,
    setError,
} from "../../store/reducers/generalSlice";

import { setIsEmpty } from "../../store/reducers/paginationSlice";

import { withServices } from "../App/hocs/withServices";

export default withServices(function Refresh({ serviceContainer }) {
    const {
        from,
        nfts,
        account,
        bigLoader,
        preFetchData,
        secretCred,
    } = useSelector((state) => state.general);
    const dispatch = useDispatch();

    const { bridge } = serviceContainer;

    const refresh = async () => {
        handleGA4Event(googleAnalyticsCategories.Button, "Refresh nfts");
        if (!bigLoader || !nfts) {
            let w = account;

            const fromChain = await bridge.getChain(from.nonce);
            dispatch(setBigLoader(true));
            try {
                let nfts = await fromChain.getNFTs(
                    bridge.checkWallet || w,
                    secretCred.contract || preFetchData?.contract
                );
                nfts = fromChain.filterNFTs(nfts);

                if (nfts.length < 1) {
                    dispatch(setIsEmpty(true));
                } else {
                    dispatch(setIsEmpty(false));
                }

                dispatch(setPreloadNFTs(nfts.length));
                dispatch(setNFTList(nfts));
                dispatch(setBigLoader(false));
            } catch (error) {
                console.log(error);
                dispatch(setBigLoader(false));
                dispatch(setNFTList([]));
                dispatch(
                    setError(error.data ? error.data.message : error.message)
                );
            }
        }
    };

    return (
        <span
            className={
                bigLoader ? "refresh-button--disabled" : "refresh-button"
            }
            onClick={refresh}
        ></span>
    );
});
