import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import { setError, setTransferLoaderModal } from "../../store/reducers/generalSlice";

export const ClaimInDestination = (connection) => {
    return function CB({
        serviceContainer,
        fromChain,
        toChain,
        hash,
        setDestHash,
        //receiver,
    }) {
        const { bridge } = serviceContainer;
        const dispatch = useDispatch();
        const [fromChainWapper, setFromChainWapper] = useState(null);

        useState(async () => {
            const _from = await bridge.getChain(fromChain);

            setFromChainWapper(_from);
        }, []);

        const handler = async () => {
            dispatch(setQuietConnection(true));
            dispatch(setTransferLoaderModal(true));

            const chainWapper = await connection(bridge, toChain);

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
};
