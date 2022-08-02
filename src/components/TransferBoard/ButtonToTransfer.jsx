import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CHAIN_INFO } from "../values";
import { chainsConfig } from "../values";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { algoConnector } from "../../wallet/connectors";
import {
  getFactory,
  setClaimablesAlgorand,
  checkIfOne1,
  convertOne1,
  convert,
} from "../../wallet/helpers";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TempleWallet } from "@temple-wallet/dapp";
import { ExtensionProvider } from "@elrondnetwork/erdjs/out";
import { ethers } from "ethers";
import {
  setError,
  setNFTsToWhitelist,
  setNoApprovedNFTAlert,
  setTransferLoaderModal,
  setTxnHash,
  setURLToOptIn,
} from "../../store/reducers/generalSlice";
import {
  setPasteDestinationAlert,
  setSelectNFTAlert,
} from "../../store/reducers/generalSlice";
import * as thor from "web3-providers-connex";
import { Driver, SimpleNet, SimpleWallet } from "@vechain/connex-driver";
import { Framework } from "@vechain/connex-framework";
import Connex from "@vechain/connex";

import Wservice from "../Widget/wservice";

const wservice = Wservice();

export default function ButtonToTransfer() {
  const kukaiWallet = useSelector((state) => state.general.kukaiWallet);
  const kukaiWalletSigner = useSelector(
    (state) => state.general.kukaiWalletSigner
  );
  const receiver = useSelector((state) => state.general.receiver);
  const receiverAddress = convert(receiver);
  const approved = useSelector((state) => state.general.approved);
  const testnet = useSelector((state) => state.general.testNet);
  const to = useSelector((state) => state.general.to.key);
  const from = useSelector((state) => state.general.from.key);
  const bigNumberFees = useSelector((state) => state.general.bigNumberFees);
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const algorandWallet = useSelector((state) => state.general.AlgorandWallet);
  const MyAlgo = useSelector((state) => state.general.MyAlgo);
  const algorandAccount = useSelector((s) => s.general.algorandAccount);
  const maiarProvider = useSelector((state) => state.general.maiarProvider);
  const templeSigner = useSelector((state) => state.general.templeSigner);
  const keplrWallet = useSelector((state) => state.general.keplrWallet);
  const account = useSelector((state) => state.general.account);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);

  const WCProvider = useSelector((state) => state.general.WCProvider);

  const bitKeep = useSelector((state) => state.general.bitKeep);

  const wid = useSelector((state) => state.general.wid);

  const { affiliationFees, affiliationSettings } = useSelector(
    ({ settings }) => ({
      affiliationFees: settings.affiliationFees,
      affiliationSettings: settings.affiliationSettings,
    })
  );
  const getAlgorandWalletSigner = async () => {
    const base = new MyAlgoConnect();
    if (algorandWallet) {
      try {
        const factory = await getFactory();
        const inner = await factory.inner(15);
        const signer = await inner.walletConnectSigner(
          algoConnector,
          algorandAccount
        );
        return signer;
      } catch (error) {
        console.log(
          error.data
            ? error.data.message
            : error.data
            ? error.data.message
            : error.message
        );
      }
    } else if (MyAlgo) {
      const factory = await getFactory();
      const inner = await factory.inner(15);
      const signer = inner.myAlgoSigner(base, algorandAccount);
      return signer;
    } else {
      const signer = {
        address: algorandAccount,
        algoSigner: window.AlgoSigner,
        ledger: testnet ? "TestNet" : "MainNet",
      };
      return signer;
    }
  };

  const getSigner = async () => {
    let signer;
    try {
      if (from === "Secret") {
        return keplrWallet;
      } else if (from === "Tezos") {
        return templeSigner || kukaiWalletSigner;
      } else if (from === "Algorand") {
        signer = await getAlgorandWalletSigner();
        return signer;
      } else if (from === "Elrond")
        return maiarProvider || ExtensionProvider.getInstance();
      else if (from === "VeChain") {
        const provider = thor.ethers.modifyProvider(
          new ethers.providers.Web3Provider(
            new thor.ConnexProvider({
              connex: new Connex({
                node: testnet
                  ? "https://testnet.veblocks.net/"
                  : "https://sync-mainnet.veblocks.net",
                network: testnet ? "test" : "main",
              }),
            })
          )
        );
        const signer = await provider.getSigner(account);
        return signer;
      } else if (from === "Secret") {
        const signer = window.getOfflineSigner(
          testnet
            ? CHAIN_INFO[from.text].tnChainId
            : CHAIN_INFO[from.text].chainId
        );
        return signer;
      } else {
        let provider;

        if (bitKeep) {
          provider = new ethers.providers.Web3Provider(window.bitkeep.ethereum);
          signer = provider.getSigner(account);
        } else {
          provider = new ethers.providers.Web3Provider(
            WCProvider?.walletConnectProvider || window.ethereum
          );
          signer = provider.getSigner(account);
        }
        return signer;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const sendEach = async (nft, index) => {
    // debugger;
    const signer = await getSigner();
    const toNonce = CHAIN_INFO[to].nonce;
    const fromNonce = CHAIN_INFO[from].nonce;
    const nftSmartContract = nft.native.contract;
    let factory;
    let toChain;
    let fromChain;
    let result;
    try {
      const tokenId =
        nft.native && "tokenId" in nft.native && nft.native.tokenId.toString();

      if (from === "Tron") {
        factory = await getFactory();
        const contract = nftSmartContract.toLowerCase();
        const wrapped = await factory.isWrappedNft(nft, fromNonce);
        let mintWidth;
        if (!wrapped) {
          mintWidth = await factory.getVerifiedContract(
            contract,
            toNonce,
            fromNonce,
            tokenId && !isNaN(Number(tokenId)) ? tokenId : undefined
          );
        }
        toChain = await factory.inner(chainsConfig[to].Chain);
        fromChain = await factory.inner(chainsConfig[from].Chain);
        // console.log(bigNumberFees, "bigNumberFees");
        result = await factory.transferNft(
          fromChain,
          toChain,
          nft,
          undefined,
          receiverAddress || receiver,
          bigNumberFees,
          Array.isArray(mintWidth) ? mintWidth[0] : mintWidth
        );
        console.log("result", result);
        dispatch(dispatch(setTransferLoaderModal(false)));
        setLoading(false);
        dispatch(setTxnHash({ txn: result, nft }));
      } else {
        // debugger
        factory = await getFactory();
        const contract = nft.collectionIdent || nftSmartContract.toLowerCase();
        const wrapped = await factory.isWrappedNft(nft, fromNonce);
        let mintWidth;
        if (!wrapped) {
          mintWidth = await factory.getVerifiedContract(
            contract,
            toNonce,
            fromNonce,
            tokenId && !isNaN(Number(tokenId)) ? tokenId : undefined
          );
        }

        toChain = await factory.inner(chainsConfig[to].Chain);
        fromChain = await factory.inner(chainsConfig[from].Chain);
        result = await factory.transferNft(
          fromChain,
          toChain,
          nft,
          signer,
          receiverAddress || receiver,
          bigNumberFees,
          Array.isArray(mintWidth) ? mintWidth[0] : mintWidth
        );
        console.log("result", result);
        result =
          from === "Algorand" || from === "Tezos" ? { hash: result } : result;
        dispatch(dispatch(setTransferLoaderModal(false)));
        setLoading(false);
        dispatch(setTxnHash({ txn: result, nft }));
      }

      wid &&
        wservice.saveTrx({
          wid,
          result,
          fromNonce,
          toNonce,
          bigNumberFees,
          affiliationFees: wservice.getFee(
            from,
            affiliationSettings,
            affiliationFees
          ),
        });
    } catch (err) {
      console.error(err);
      console.log("this is error in sendeach");
      setLoading(false);
      dispatch(dispatch(setTransferLoaderModal(false)));
      const { data, message, error } = err;
      if (message) {
        if (
          message.includes("User cant pay the bills") ||
          (data ? data.message.includes("User cant pay the bills") : false)
        )
          dispatch(setError(`You don't have enough funds to pay the fees`));
        else if (message) {
          // if(message === "receiver hasn't opted-in to wrapped nft"){
          // dispatch(setURLToOptIn(`${window.location}/?to_opt-in=true&testnet=${testnet}&nft_uri=${nft.uri}`))
          // }
          dispatch(setError(err.data ? err.data.message : err.message));
        } else dispatch(setError(err.data ? err.data.message : err.message));
        return;
      } else dispatch(setError(err.data ? err.data.message : err.message));
      return;
    }
  };

  const sendAllNFTs = () => {
    if (!receiver) {
      dispatch(setPasteDestinationAlert(true));
    } else if (selectedNFTList.length < 1) {
      dispatch(setSelectNFTAlert(true));
    } else if (!approved) {
      dispatch(setNoApprovedNFTAlert(true));
    } else if (!loading && approved) {
      setLoading(true);
      dispatch(setTransferLoaderModal(true));
      selectedNFTList.forEach((nft, index) => {
        sendEach(nft, index);
      });
    }
  };

  return (
    <div
      onClick={sendAllNFTs}
      className={!loading ? "transfer-button" : "transfer-button--disabled"}
    >
      {loading ? "Processing" : "Send"}
    </div>
  );
}
