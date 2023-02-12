/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import { Modal } from "react-bootstrap";
import ImportNFTModal from "../Modals/ImportNFTModal/ImportNFTModal";
import {
  setBalance,
  setError,
  cleanSelectedNFTList,
  setBigLoader,
  setPreloadNFTs,
  setNFTList,
} from "../../store/reducers/generalSlice";
import { setIsEmpty } from "../../store/reducers/paginationSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveForSearch } from "../../wallet/helpers";
import { ReturnBtn } from "../Settings/returnBtn";
import DesktopTransferBoard from "../TransferBoard/DesktopTransferBoard";
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

import WalletConnectionModal from "../Wallet/WalletConnectionModal";
// import ChangeWalletModal from "../Modals/ChangeWallet/ChangeWalletModal";

import NFTscreen from "./NFTscreen";
import NFTmobileView from "./NFTmobileView";

import EGoldSuccess from "./../Modals/eGoldSuccess/EGoldSuccess";
import { checkXpNetLocked } from "../../services/deposits";
import { setDiscountLeftUsd } from "../../store/reducers/discountSlice";

import UserConnect from "../User/UserConnect";
import AccountModal from "../Modals/AccountModal/AccountModal";

import withChains from "./hocs";

const intervalTm = 15_000;

function NFTaccount(props) {
  const { serviceContainer, chainSpecific, _from, algorandAccount } = props;

  const dispatch = useDispatch();

  const from = _from.key;
  const prevSelected = usePrevious(from);

  const nfts = useSelector((state) => state.general.NFTList);
  const currentsNFTs = useSelector((state) => state.general.currentsNFTs);

  const importModal = useSelector((state) => state.general.importModal);

  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);

  const prevAccount = usePrevious(account);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const hederaAccount = useSelector((state) => state.general.hederaAccount);
  const secretAccount = useSelector((state) => state.general.secretAccount);
  const tonAccount = useSelector((state) => state.general.tonAccount);
  const NFTSetToggler = useSelector((state) => state.general.NFTSetToggler);
  const prevNFTSetToggler = usePrevious(NFTSetToggler);

  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);

  const unwrappedEGold = useSelector((state) => state.general.unwrappedEGold);

  const checkWallet = useSelector((state) => state.general.checkWallet);

  const widget = useSelector((state) => state.widget.widget);

  const accountWalletModal = useSelector(
    (state) => state.general.accountWalletModal
  );

  let _account =
    checkWallet ||
    hederaAccount ||
    account ||
    algorandAccount ||
    tezosAccount ||
    elrondAccount ||
    tronWallet ||
    secretAccount ||
    tonAccount;

  const { bridge } = serviceContainer;

  async function getNFTsList(fromChain) {
    dispatch(setBigLoader(true));
    try {
      let nfts = await fromChain.getNFTs(bridge.checkWallet || _account);
      nfts = fromChain.filterNFTs(nfts);
      if (nfts.length < 1) {
        dispatch(setIsEmpty(true));
      } else {
        dispatch(setIsEmpty(false));
        dispatch(setNFTList(nfts));
        dispatch(setPreloadNFTs(nfts.length));
      }

      dispatch(setBigLoader(false));
    } catch (error) {
      console.log(error);
      dispatch(setBigLoader(false));
      dispatch(setNFTList([]));
      console.log(error);
      dispatch(setError(error.data ? error.data.message : error.message));
    }
  }

  const getBalance = async (fromChain) => {
    const _balance = await fromChain.balance(_account);
    dispatch(setBalance(_balance));
  };

  useDidUpdateEffect(() => {
    const checkLocked = async () => {
      const data = await checkXpNetLocked(account);
      dispatch(setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25)));
    };
    account && checkLocked();
  }, [account]);

  useDidUpdateEffect(() => {
    if (nfts.length) {
      saveForSearch(_account, _from.nonce, nfts);
    }
  }, [nfts]);

  useEffect(() => {
    dispatch(cleanSelectedNFTList());
    let balanceInterval;
    (async () => {
      const fromChain = await bridge.getChain(_from.nonce);

      //load nfts
      _account &&
        (prevSelected !== _from.key ||
          prevAccount !== _account ||
          NFTSetToggler !== prevNFTSetToggler) &&
        getNFTsList(fromChain);

      //update Balance
      getBalance(fromChain);
      chainSpecific && chainSpecific(dispatch, fromChain, _account);
      balanceInterval = setInterval(() => getBalance(fromChain), intervalTm);
      const keyHandler = async (event) => {
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
        if (event.key === "4") {
          fromChain.mintNFT("https://meta.polkamon.com/meta?id=10001852306");
        }
      };
      window.addEventListener("keydown", keyHandler);
    })();

    return () => clearInterval(balanceInterval);
  }, [_from, _account, NFTSetToggler]);

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
      {/* <ChangeWalletModal /> */}
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
            {/*isMobile && <MobileTransferBoard />*/}
          </div>
          {!isMobile && <DesktopTransferBoard />}
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

export default withChains(NFTaccount);

/**
 * 
 *   const widget = useSelector((state) => state.widget.widget);

  {widget && (
    <>
      <UserConnect />
      {window.innerWidth < 760 && <UserConnect mobile={true} />}
      <AccountModal />
    </>
  )}
 */
