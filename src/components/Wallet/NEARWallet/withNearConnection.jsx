/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { Chain } from "xp.network";

import { useDispatch } from "react-redux";

import {
  setAccount,
  setConnectedWallet,
} from "../../../store/reducers/generalSlice";
import { setSigner } from "../../../store/reducers/signersSlice";

export const withNearConnection = (Wrapped) =>
  function CB(props) {
    const { serviceContainer } = props;
    const dispatch = useDispatch();

    useEffect(() => {
      (async () => {
        if (serviceContainer.bridge) {
          const params = new URLSearchParams(location.search.replace("?", ""));

          if (
            (params.get("nearApproval") ||
              (params.get("account_id") && params.get("all_keys"))) &&
            serviceContainer.bridge.config
          ) {
            const chainWrapper = await serviceContainer?.bridge?.getChain(
              Chain.NEAR
            );
            //const nearParams = serviceContainer?.bridge?.config?.nearParams;
            const walletConnection = await chainWrapper?.connect();
            const address = walletConnection.getAccountId();
            console.log(address, "account");
            const signer = walletConnection.account();
            console.log(signer);
            if (params.get("nearApproval")) {
              const tokenId = params.get("nearTokenId");
              const contract = params.get("nearContract");
              chainWrapper.chain.preTransfer(
                signer,
                {
                  native: {
                    tokenId,
                    contract,
                    chainId: String(Chain.NEAR),
                  },
                },
                undefined
              );
            }

            if (address && signer) {
              dispatch(setAccount(address));
              dispatch(setSigner(signer));
              dispatch(setConnectedWallet("Near Wallet"));
              console.log(localStorage.getItem("_wallet_auth_key"));
              //const obj = JSON.parse(localStorage.getItem("_wallet_auth_key"));
            }
          }
        }
      })();
    }, [serviceContainer]);

    return <Wrapped {...props} />;
  };

/****
   * 
   * 
   *     const umt = await chain.chain.getUserMinter(
                  "",
                  "dimabrook-testnet.testnet"
                );

                console.log(umt);

                const trx = await chain.chain.mintNft(
                  await umt.account("dimabrook-testnet.testnet"),
                  {
                    contract: "usernftminter.testnet",
                    token_id: `NFT#{${Math.ceil(Math.random() * 10000000)}}`,
                    token_owner_id: address,
                    metadata: {
                      image:
                        "https://ipfs.featured.market/ipfs/QmdUhQt8ksfgpxjCYNYFY9134j9H2VUUdNRNsKCs6wFZxb",
                      name: "Halloween Party Girls ",
                      description:
                        "Halloween is all about supernatural, unrealistic and eccentric costumes.\nAdd this Rare NFT in your collection.",
                      attributes: [
                        {
                          trait_type: "eyes",
                          value: "green",
                        },
                      ],
                    },
                  }
                );

                console.log(trx);
   */
