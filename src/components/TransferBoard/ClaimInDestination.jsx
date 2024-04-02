import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import {
  setError,
  setTransferLoaderModal,
} from "../../store/reducers/generalSlice";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { sleep } from "../../utils";
import { v3_bridge_mode } from "../values";

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

      const chainWapper = await connection(bridge, toChain, fromChain, hash);
      console.log("chainWrapper: ", chainWapper);
      console.log("hash: ", hash);
      let claimedHash = null;

      try {
        if (v3_bridge_mode) {
          const factory = ChainFactory(ChainFactoryConfigs.TestNet());

          const originChainIdentifier = await bridge.getChain(fromChain);
          const targetChainIdentifier = await bridge.getChain(toChain);
          console.log("identifiers: ", {
            originChainIdentifier,
            targetChainIdentifier,
          });

          const originChain = await factory.inner(
            originChainIdentifier?.chainParams?.v3_chainId
          );
          const targetChain = await factory.inner(
            targetChainIdentifier?.chainParams?.v3_chainId
          );
          console.log("chains: ", {
            originChain,
            targetChain,
          });

          sleep(10000);
          let targetChainSignatures = await targetChain
            .getStorageContract()
            .getLockNftSignatures(
              hash,
              originChainIdentifier?.chainParams?.v3_chainId
            );
          console.log("signatures: ", targetChainSignatures);

          const validatorCount = Number(await targetChain.getValidatorCount());
          const neededSignatures = Math.floor((2 / 3) * validatorCount) + 1;
          console.log("neededSignatures: ", {
            validatorCount,
            neededSignatures,
          });

          while (targetChainSignatures.length < neededSignatures) {
            await sleep(5000);
            targetChainSignatures = await targetChain
              .getStorageContract()
              .getLockNftSignatures(
                hash,
                originChainIdentifier?.chainParams?.v3_chainId
              );
            console.log("inside loop signatures: ", targetChainSignatures);
            console.log(
              "inside loop validatorCount: ",
              await targetChain.getStorageContract().validatorCount()
            );
          }

          console.log("signatures after loop: ", {
            targetChainSignatures,
          });
          console.log("getClaimData: ", {
            originChain,
            hash,
          });

          await targetChainIdentifier.checkSigner();
          const targetChainSigner = targetChainIdentifier.getSigner();
          console.log("targetChainSigner", targetChainSigner);

          console.log(
            "receipt**********",
            await originChain.getProvider().getTransactionReceipt(hash)
          );

          let foundedData = false;
          let nftData = null;
          while (!foundedData) {
            try {
              nftData = await factory.getClaimData(originChain, hash);
              console.log("nftData: ", nftData);
              console.log("Got Claim Data");
              foundedData = true;
            } catch (e) {
              console.log(
                `Retrying to find Claim Data for Lock Hash: ${hash}`,
                e
              );
              await sleep(5000);
            }
          }

          console.log("claimNft: ", {
            targetChainSigner,
            targetChain,
            targetChainSignatures,
          });
          console.log(
            "transformed data: ",
            await targetChain.transform(nftData)
          );
          const claim = await targetChain.claimNft(
            targetChainSigner,
            targetChain.transform(nftData),
            targetChainSignatures
          );
          console.log("claimed: ", claim);
          claimedHash = claim?.hash;
          await sleep(5000);
        } else {
          const { result } = await chainWapper.claim(fromChainWapper, hash);
          const resultObject = chainWapper.handlerResult(result);
          claimedHash = resultObject.hash;
        }

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
