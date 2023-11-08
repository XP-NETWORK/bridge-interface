import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import {
    setError,
    setTransferLoaderModal,
} from "../../store/reducers/generalSlice";
import { getChainObject } from "../values";
import { switchNetwork } from "../../services/chains/evm/evmService";

export const ClaimInDestination = ({
    serviceContainer,
    fromChain,
    toChain,
    hash,
    setDestHash,
    //receiver,
}) => {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const [fromChainWapper, setFromChainWapper] = useState(null);

    useState(async () => {
        const _from = await bridge.getChain(fromChain);
        setFromChainWapper(_from);
    }, []);

    const handler = async () => {
        dispatch(setQuietConnection(true));

        await switchNetwork(getChainObject(toChain));

        const chainWapper = await new Promise((r) => {
            (async () => {
                let chainWapper = await bridge.getChain(toChain, {
                    overwrite: true,
                });
                while (!chainWapper.signer) {
                    console.log(chainWapper.signer, "signer");
                    chainWapper = await bridge.getChain(toChain, {
                        overwrite: true,
                    });
                    await new Promise((r) => setTimeout(r, 2000));
                }

                r(chainWapper);
            })();
        });
        dispatch(setTransferLoaderModal(true));
        try {
            const { result } = await chainWapper.claim(fromChainWapper, hash);
            const resultObject = chainWapper.handlerResult(result);

            setDestHash(resultObject.hash);
            dispatch(setTransferLoaderModal(false));
        } catch (e) {
            dispatch(setError({ message: e.message }));
            dispatch(setTransferLoaderModal(false));
        }
    };

    return (
        <button className="changeBtn ClaimInDestination" onClick={handler}>
            Claim
        </button>
    );
};
