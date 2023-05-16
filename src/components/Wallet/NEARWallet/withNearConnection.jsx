/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { Chain } from "xp.network";

import { useDispatch, useSelector } from "react-redux";

import {
  setAccount,
  setConnectedWallet,
  setFrom,
  setTo,
  setSelectedNFTList,
  setReceiver,
  updateApprovedNFTs,
  setTxnHash,
  setNearRedirect,
} from "../../../store/reducers/generalSlice";

import { chains } from "../../values";

import { useNavigate } from "react-router";
import { getRightPath } from "../../../wallet/helpers";

import { setupWalletSelector } from "@near-wallet-selector/core";
//import { setupNightly } from "@near-wallet-selector/nightly";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { distinctUntilChanged, map } from "rxjs";
import { adaptToWalletSelector } from "./utils";

export const withNearConnection = (Wrapped) =>
  function CB(props) {
    let [selectedNearWallet, setSelectedNearWallet] = useState("");
    const { serviceContainer } = props;
    //const [selector, setSelector] = useState(null);
    //const [accounts, setAccounts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const NEAR_WALLET_IDS = {
      "meteor-wallet": "Meteor Wallet",
      sender: "Sender",
      "here-wallet": "Here Wallet",
      "my-near-wallet": "My NEAR Wallet",
      "near-wallet": "NEAR Wallet",
    };

    useEffect(async () => {
      dispatch(setConnectedWallet(NEAR_WALLET_IDS[await selectedNearWallet]));
    }, [selectedNearWallet]);

    const saveWallet = (address, bridge, chain, signer) => {
      dispatch(setAccount(address));
      chain.setSigner(signer);
      bridge.setCurrentType(chain);
      dispatch(setFrom(chains.find((c) => c.nonce === Chain.NEAR)));
      // dispatch(setConnectedWallet("Near Wallet"));
    };

    const { NFTList, selectedNFTList, afterNearRedirect } = useSelector(
      (state) => ({
        NFTList: state.general.NFTList,
        selectedNFTList: state.general.selectedNFTList,
        afterNearRedirect: state.general.afterNearRedirect,
        account: state.general.account,
      })
    );

    const params = new URLSearchParams(location.search.replace("?", ""));
    const nearAuth = params.get("all_keys") && params.get("account_id"); // && !params.get("WLS");
    console.log(nearAuth, "nearauth");
    const nearTrx = params.get("NEARTRX");
    const nearFlow = nearTrx || nearAuth;
    const approve = params.get("type") === "approve";
    const send =
      params.get("type") === "transfer" || params.get("type") === "unfreeze";

    //Selector store flow
    useEffect(() => {
      if (serviceContainer.bridge.config) {
        const { bridge } = serviceContainer;
        (async () => {
          const nearParams = bridge.config.nearParams;
          const url = window.location.href;
          const [_selector, chainWrapper] = await Promise.all([
            setupWalletSelector({
              network: window.location.pathname.includes("testnet")
                ? "testnet"
                : "mainnet",
              debug: true,
              modules: [
                setupNearWallet({
                  //successUrl: url,
                  //failureUrl: url,
                }),
                setupMyNearWallet({
                  successUrl:
                    url +
                    `${url.includes("?") ? "&" : "?"}selectedNearWallet=mnw`,
                  failureUrl: url + `&selectedNearWallet=mnw`,
                }),
                setupHereWallet(),
                setupMeteorWallet(),
                setupSender(),
              ],
            }),
            bridge.getChain(Chain.NEAR),
          ]);
          window.wallet_selector_modal = setupModal(_selector, {
            contractId: nearParams?.bridge,
          });
          window.wallet_selector = _selector;

          const sub = _selector.store.observable
            .pipe(
              map((state) => state.accounts),
              distinctUntilChanged()
            )
            .subscribe(async (nextAccounts) => {
              const wallet = await _selector.wallet().catch(() => undefined);

              if (
                wallet?.id === "near-wallet" ||
                wallet?.id === "my-near-wallet"
              ) {
                wallet.signOut();
                return;
              }

              if (nextAccounts[0]) {
                await setSelectedNearWallet(
                  await (await _selector.wallet()).id
                );
                saveWallet(
                  nextAccounts[0].accountId,
                  bridge,
                  chainWrapper,
                  adaptToWalletSelector(
                    wallet,
                    chainWrapper.chain.getProvider()
                  )
                );
              }
            });

          return () => sub.unsubscribe();
        })();
      }
    }, [serviceContainer]);

    //Near Wallet flow
    useEffect(() => {
      if (nearFlow && serviceContainer.bridge.config) {
        (async () => {
          const chainWrapper = await serviceContainer?.bridge?.getChain(
            Chain.NEAR
          );
          const isMyNearWallet = window.location.search.includes(
            "selectedNearWallet=mnw"
          );

          const walletConnection = await chainWrapper?.connect(
            isMyNearWallet ? "https://app.mynearwallet.com/" : undefined
          );

          let address = walletConnection.getAccountId();
          //race condition alert
          if (!address) {
            await new Promise((r) => setTimeout(r, 1000));
            address = walletConnection.getAccountId();
          }
          const signer = walletConnection.account();
          console.log(walletConnection, "walletConnection", address, signer);
          if (address && signer) {
            dispatch(setConnectedWallet("NEAR Wallet"));
            saveWallet(address, serviceContainer.bridge, chainWrapper, signer);

            if (nearTrx) {
              console.log("NEAR: jump to wallet");
              const to = params.get("to");
              dispatch(setTo(chains.find((c) => c.nonce === Number(to))));
              navigate(getRightPath());
            }
          }
        })();
      }
    }, [serviceContainer]);

    useEffect(() => {
      if (Array.isArray(NFTList) && nearTrx && afterNearRedirect) {
        dispatch(setNearRedirect());
        const tokenId = params.get("tokenId");
        const contract = params.get("contract");
        const chainId = String(Chain.NEAR);
        const receiver = params.get("receiver");
        const hash = params.get("transactionHashes");
        const error = params.get("errorMessage") || params.get("errorCode");

        if (approve) {
          const selectedNft = NFTList.find(
            (nft) => nft.native.tokenId === tokenId
          );

          console.log("NEAR: inApprove");
          const alreadyS = selectedNFTList.some(
            (nft) => nft.native.tokenId === tokenId
          );

          !alreadyS && dispatch(setSelectedNFTList(selectedNft));
          dispatch(setReceiver(receiver));
          !error && dispatch(updateApprovedNFTs(selectedNft));
        }

        if (send && hash && serviceContainer.bridge) {
          console.log("NEAR: in send");

          let selectedNft = NFTList.find(
            (nft) => nft.native.tokenId === tokenId
          );

          if (!selectedNft) {
            const xp_near_transfered_nft = window.safeLocalStorage?.getItem(
              "_xp_near_transfered_nft"
            );
            selectedNft = JSON.parse(xp_near_transfered_nft);
          }

          const nft = {
            image: selectedNft.image || selectedNft.media,
            name: selectedNft.title,
            uri: "",
            native: {
              tokenId,
              contract,
              chainId,
            },
          };

          serviceContainer.bridge.getChain(Chain.NEAR).then((chainWrapper) => {
            console.log(`about to notify ${hash}`);
            const { chain } = chainWrapper;
            chain.notify(hash);
          });
          dispatch(setReceiver(receiver));
          dispatch(setSelectedNFTList(nft));
          dispatch(
            setTxnHash({
              txn: { hash },
              nft,
            })
          );
        }
      }
      window.addEventListener("beforeunload", function() {
        window.history.replaceState({}, "", window.location.pathname);
      });
    }, [NFTList, serviceContainer]);

    return <Wrapped {...props} />;
  };
