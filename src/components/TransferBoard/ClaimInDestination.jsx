import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import {
  setError,
  setTransferLoaderModal,
} from "../../store/reducers/generalSlice";
import { XPDecentralizedUtility } from "../../utils/xpDecentralizedUtility";

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

      const xPDecentralizedUtility = new XPDecentralizedUtility();

      const chainWapper = await connection(bridge, toChain, fromChain, hash);
      console.log("chainWrapper: ", chainWapper);
      console.log("hash: ", hash);

      try {
        const originChainIdentifier = await bridge.getChain(fromChain);
        const targetChainIdentifier = await bridge.getChain(toChain);
        console.log("identifiers: ", {
          originChainIdentifier,
          targetChainIdentifier,
        });

        const { hash: claimedHash } = await xPDecentralizedUtility.claimNFT(
          originChainIdentifier,
          targetChainIdentifier,
          hash,
          chainWapper,
          fromChainWapper
        );

        setDestHash(claimedHash);
        dispatch(setTransferLoaderModal(false));
      } catch (e) {
        console.log("in catch block");
        console.log(e);
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
