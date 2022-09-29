import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import { Modal } from "react-bootstrap";
import ImportNFTModal from "../Modals/ImportNFTModal/ImportNFTModal";
import {
  setBalance,
  setError,
  setWrappedEGold,
  cleanSelectedNFTList,
  setUnwrappedEGold,
  setNFTList,
  setSearchNFTList,
} from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlgorandClaimables,
  getFactory,
  mintForTestNet,
  saveForSearch,
  setNFTS,
} from "../../wallet/helpers";
import { ReturnBtn } from "../Settings/returnBtn";
import DesktopTransferBoard from "../TransferBoard/DesktopTransferBoard";
import MobileTransferBoard from "../TransferBoard/MobileTransferBoard";
import "./NFTsBoard.css";
import ChangeNetworkModal from "../Modals/ChangeNetwork/ChangeNetworkModal";
import UnsupportedNetwork from "../Modals/ChangeNetwork/UnsupportedNetwork";
import SelectNFTAler from "../Alerts/SelectNFTAler";
import PasteDestinationAlert from "../Alerts/PasteDestinationAlert";
import NoApprovedNFT from "../Alerts/NoApprovedNFT";
import {
  usePrevious,
  useCheckMobileScreen,
  useDidUpdateEffect,
} from "../Settings/hooks";
import { chains, chainsConfig } from "../values";
import ImportNFTButton from "../Buttons/ImportNFTButton";

import WalletConnectionModal from "../Wallet/WalletConnectionModal";
import ChangeWalletModal from "../Modals/ChangeWallet/ChangeWalletModal";

import NFTscreen from "./NFTscreen";
import NFTmobileView from "./NFTmobileView";

import EGoldSuccess from "./../Modals/eGoldSuccess/EGoldSuccess";
import { checkXpNetLocked } from "../../services/deposits";
import { setDiscountLeftUsd } from "../../store/reducers/discountSlice";

import UserConnect from "../User/UserConnect";
import AccountModal from "../Modals/AccountModal/AccountModal";

function NFTaccount() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from.key);
  const _from = useSelector((state) => state.general.from);
  const prevSelected = usePrevious(from);
  const type = useSelector((state) => state.general.from.type);
  const algorandAccount = useSelector((s) => s.general.algorandAccount);
  const nfts = useSelector((state) => state.general.NFTList);
  const currentsNFTs = useSelector((state) => state.general.currentsNFTs);
  const testnet = useSelector((state) => state.general.testNet);
  const importModal = useSelector((state) => state.general.importModal);
  const algorandClaimables = useSelector(
    (state) => state.general.algorandClaimables
  );
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const prevAccount = usePrevious(account);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const hederaAccount = useSelector((state) => state.general.hederaAccount);
  const secretAccount = useSelector((state) => state.general.secretAccount);
  const NFTSetToggler = useSelector((state) => state.general.NFTSetToggler);
  const prevNFTSetToggler = usePrevious(NFTSetToggler);
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const wrappedEGold = useSelector((state) => state.general.wrappedEGold);
  const unwrappedEGold = useSelector((state) => state.general.unwrappedEGold);
  const NFTListSearch = useSelector((state) => state.general.NFTListSearch);
  const signer = useSelector((state) => state.signers.signer);

  const widget = useSelector((state) => state.widget.widget);
  const checkWallet = useSelector((state) => state.general.checkWallet);

  const accountWalletModal = useSelector(
    (state) => state.general.accountWalletModal
  );
  const prevWrappedEGold = usePrevious(wrappedEGold);
  let balanceInterval = useRef(null);

  //Anjelika - 0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE
  //Anjelika elrond - erd1s89aq3s0z6mjfpx8s85zntlfywsvj5r8nzcdujw7mx53f9et9ezq9fnrws
  //Dima. U - 0x6449b68cc5675f6011e8DB681B142773A3157cb9
  // -||- vechain 0x124fBa3250c8d72FBcb5b5712d0dF48c33E6C1F6, 0x124fBa3250c8d72FBcb5b5712d0dF48c33E6C1F6
  // Dima.B - 0x0d7df42014064a163DfDA404253fa9f6883b9187
  //
  // ????? - 0x3Aa485a8e745Fc2Bd68aBbdB3cf05B58E338D7FE

  async function getNFTsList(str) {
    const useHardcoded = false;
    const hard = "0x85C25cb6e5C648117E33EF2e2Fbd93067D18b529";
    if (type === "Cosmos") return;
    try {
      const w = useHardcoded
        ? hard
        : type === "EVM" || type === "VeChain" || type === "Skale"
        ? account
        : type === "Tezos"
        ? tezosAccount
        : type === "Algorand"
        ? algorandAccount
        : type === "Elrond"
        ? elrondAccount
        : type === "Tron"
        ? tronWallet
        : type === "Hedera"
        ? hederaAccount
        : undefined;
      await setNFTS(w, from, undefined, "account");
    } catch (error) {
      dispatch(setError(error.data ? error.data.message : error.message));
    }
  }

  const getWegldBalance = async () => {
    if (elrondAccount && !prevWrappedEGold) {
      try {
        const factory = await getFactory();
        const elronfFactory = await factory.inner(chainsConfig[from].Chain);
        const weGoldBalance = await elronfFactory.wegldBalance(elrondAccount);
        if (weGoldBalance) dispatch(setWrappedEGold(weGoldBalance));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getBalance = async () => {
    // debugger;
    let _account =
      checkWallet ||
      hederaAccount ||
      account ||
      algorandAccount ||
      tezosAccount ||
      elrondAccount ||
      tronWallet ||
      secretAccount;
    const factory = await getFactory();
    const fromChain = await factory.inner(chainsConfig[from].Chain);
    let balance;
    let balanceToShow;

    !balance &&
      setTimeout(async () => {
        try {
          balance = factory
            ? await factory.balance(fromChain, _account)
            : undefined;

          switch (_from.type) {
            case "EVM":
              balanceToShow = balance / 1e18;
              dispatch(setBalance(Number(balanceToShow)));
              break;
            case "Skale":
              balanceToShow = balance / 1e18;
              dispatch(setBalance(Number(balanceToShow)));
              break;
            case "Tezos":
              dispatch(setBalance(balance / 1e6));
              break;
            case "Tron":
              dispatch(setBalance(balance / 1e6));
              break;
            case "Algorand":
              dispatch(setBalance(balance / 1e6));
              break;
            case "Elrond":
              dispatch(setBalance(balance / 1e18));
              break;
            case "VeChain":
              dispatch(setBalance(balance / 1e18));
              break;
            case "Cosmos":
              dispatch(setBalance(balance / 1e6));
              break;
            case "Hedera":
              dispatch(setBalance(balance / 1e6));
              break;
            default:
              break;
          }
          return balance;
        } catch (error) {
          console.log(error);
        }
      }, 3000);
  };

  useDidUpdateEffect(() => {
    const checkLocked = async () => {
      const data = await checkXpNetLocked(account);
      dispatch(setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25)));
    };
    account && checkLocked();
  }, [account]);

  const saveNFTsForSearch = async () => {
    const _account =
      checkWallet ||
      hederaAccount ||
      account ||
      algorandAccount ||
      tezosAccount ||
      elrondAccount ||
      tronWallet ||
      secretAccount;
    const chain = chains.find((e) => e.key === from);
    await saveForSearch(_account, chain.nonce, nfts);
  };

  useDidUpdateEffect(() => {
    if (nfts.length > 0) saveNFTsForSearch();
  }, [nfts]);

  useEffect(() => {
    const checkIfDataLoaded = async () => {
      if (!nfts?.some((nft) => nft.dataLoaded)) {
        await getNFTsList();
      }
    };
    checkIfDataLoaded();
    const checkAlgorand = async () => {
      if (
        algorandAccount &&
        !algorandClaimables?.some((nft) => nft.dataLoaded)
      ) {
        await getAlgorandClaimables(algorandAccount);
      }
    };
    checkAlgorand();
    getBalance();

    if (from === "Elrond") {
      getWegldBalance();
    }
    balanceInterval = setInterval(() => getBalance(), 5000);

    const keyHandler = async (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      if (event.key === "4" && testnet) {
        await mintForTestNet(from, signer);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      clearInterval(balanceInterval);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    clearInterval(balanceInterval);
    let _account =
      account ||
      algorandAccount ||
      tezosAccount ||
      elrondAccount ||
      tronWallet ||
      secretAccount;
    const getNFTList = async () => {
      if (nfts && prevSelected !== from) {
        await getNFTsList();
      } else if (nfts && prevAccount !== account) {
        await getNFTsList();
      } else if (nfts && NFTSetToggler !== prevNFTSetToggler) {
        await getNFTsList();
      }
    };
    _account && getNFTList();
    getBalance();
    balanceInterval = setInterval(() => getBalance(), 5000);
    dispatch(cleanSelectedNFTList());
    const checkLocked = async () => {
      const data = await checkXpNetLocked(account);
      dispatch(setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25)));
    };
    account && checkLocked();
    return () => clearInterval(balanceInterval);
  }, [from, account, NFTSetToggler]);

  const isMobile = useCheckMobileScreen();

  return (
    <div className="NFTaccount">
      <Modal
        show={importModal}
        animation={null}
        className=" ChainModal import-nft__modal"
      >
        <ImportNFTModal />
      </Modal>
      <Modal
        show={accountWalletModal}
        // onHide={handleClose}
        animation={null}
        className="ChainModal wallet-modal"
      >
        <WalletConnectionModal />
      </Modal>
      <Modal
        show={unwrappedEGold}
        animation={null}
        className="eGold-success ChainModal"
      >
        <EGoldSuccess />
      </Modal>
      <ChangeNetworkModal />
      <ChangeWalletModal />
      <UnsupportedNetwork />
      <SelectNFTAler />
      <PasteDestinationAlert />
      <NoApprovedNFT />
      <Container className="nftSlectContaine">
        <ReturnBtn />
        {widget && (
          <>
            <UserConnect />
            {window.innerWidth < 760 && <UserConnect mobile={true} />}
            <AccountModal />
          </>
        )}
        <div className="row">
          <div className="nftListCol col-lg-8">
            {!isMobile && <NFTscreen />}
            <MobileTransferBoard />
          </div>
          <DesktopTransferBoard />
        </div>
        {isMobile && (
          <NFTmobileView
            selectedNFTs={selectedNFTs}
            _from={_from}
            nfts={currentsNFTs}
          />
        )}
      </Container>
    </div>
  );
}

export default NFTaccount;
