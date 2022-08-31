import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CHAIN_INFO } from "../values";
import { chainsConfig } from "../values";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { algoConnector } from "../../wallet/connectors";

import { getFactory, convert } from "../../wallet/helpers";
import { ExtensionProvider } from "@elrondnetwork/erdjs/out";
import { ethers } from "ethers";
import {
  setError,
  setNoApprovedNFTAlert,
  setTransferLoaderModal,
  setTxnHash,
} from "../../store/reducers/generalSlice";
import {
  setPasteDestinationAlert,
  setSelectNFTAlert,
} from "../../store/reducers/generalSlice";
import * as thor from "web3-providers-connex";
import Connex from "@vechain/connex";
import { getFromDomain } from "../../services/resolution";
import { transferNFTFromEVM } from "../../services/chains/evm/evmService";
import { transferNFTFromTran } from "../../services/chains/tron/tronHelper";
import { transferNFTFromTezos } from "../../services/chains/tezos/tezosHelper";
import { transferNFTFromCosmos } from "../../services/chains/cosmos/cosmosHelper";
import { transferNFTFromElrond } from "../../services/chains/elrond/elrondHelper";
import { transferNFTFromAlgorand } from "../../services/chains/algorand/algorandHelper";

import { withWidget } from "../Widget/hocs/withWidget";

export default withWidget(function ButtonToTransfer({
  setTxForWidget,
  getExtraFee,
}) {
  const kukaiWalletSigner = useSelector(
    (state) => state.general.kukaiWalletSigner
  );
  const txnHashArr = useSelector((state) => state.general.txnHashArr);
  const receiver = useSelector((state) => state.general.receiver);
  const receiverAddress = convert(receiver);
  const approved = useSelector((state) => state.general.approved);
  const testnet = useSelector((state) => state.general.testNet);
  const to = useSelector((state) => state.general.to.key);
  const _to = useSelector((state) => state.general.to);
  const from = useSelector((state) => state.general.from.key);
  const _from = useSelector((state) => state.general.from);
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
  const hederaSigner = useSelector((state) => state.signers.signer);
  const chainConfig = useSelector((state) => state.signers.chainFactoryConfig);
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

  const unstoppabledomainSwitch = (unstoppabledomain) => {
    let stop;
    if (unstoppabledomain) {
      switch (unstoppabledomain) {
        case "undefined":
          dispatch(
            setError(
              "Your domain does not explicitly support the chain you selected."
            )
          );
          dispatch(dispatch(setTransferLoaderModal(false)));
          setLoading(false);
          stop = true;
          break;
        case "notEVM":
          dispatch(
            setError(
              "Domain names are currently not supported for Non-EVM chains."
            )
          );
          dispatch(dispatch(setTransferLoaderModal(false)));
          setLoading(false);
          stop = true;
          break;
        case "invalid":
          dispatch(
            setError("Domain does not exist. Please, check the spelling.")
          );
          dispatch(dispatch(setTransferLoaderModal(false)));
          setLoading(false);
          stop = true;
          break;
        default:
          break;
      }
    }
    return stop;
  };

  const sendEach = async (nft, index) => {
    const signer = await getSigner();
    const unstoppabledomain = await getFromDomain(receiver, _to);
    const stop = unstoppabledomainSwitch(unstoppabledomain);
    if (stop) return;
    let result;
    const params = {
      to: _to,
      from: _from,
      nft,
      signer: from.text === "Hedera" ? hederaSigner : signer,
      receiver: receiverAddress || unstoppabledomain || receiver,
      bigNumberFees,
      txnHashArr,
      chainConfig,
      testnet,
      extraFees: getExtraFee(from),
    };

    console.log(params, "params");

    switch (_from.type) {
      case "EVM":
        result = await transferNFTFromEVM(params);
        break;
      case "Tron":
        result = await transferNFTFromTran(params);
        break;
      case "Tezos":
        result = await transferNFTFromTezos(params);
        break;
      case "Algorand":
        result = await transferNFTFromAlgorand(params);
        break;
      case "Elrond":
        result = await transferNFTFromElrond(params);
        break;
      case "Cosmos":
        result = await transferNFTFromCosmos(params);
        break;
      case "VeChain":
        result = await transferNFTFromEVM(params);
        break;
      case "Skale":
        result = await transferNFTFromEVM(params);
        break;
      default:
        break;
    }
    if (txnHashArr[0] && !result) {
      dispatch(setTxnHash({ txn: "failed", nft }));
    } else if (result) dispatch(setTxnHash({ txn: result, nft }));
    setLoading(false);
    dispatch(setTransferLoaderModal(false));

    setTxForWidget({
      result,
      fromNonce: _from.nonce,
      toNonce: _to.nonce,
      bigNumberFees,
      from,
      nft,
      senderAddress: account || algorandAccount,
      targetAddress: receiverAddress || unstoppabledomain || receiver,
    });
  };

  const sendAllNFTs = async () => {
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
});
