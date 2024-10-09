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
  setIsClaimViaHash,
} from "../../store/reducers/generalSlice";
import { setIsEmpty } from "../../store/reducers/paginationSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveForSearch } from "../../utils";
import { ReturnBtn } from "../Settings/returnBtn";
import DesktopTransferBoard from "../TransferBoard/DesktopTransferBoard";
import "./NFTsBoard.css";
import ChangeNetworkModal from "../Modals/ChangeNetwork/ChangeNetworkModal";
import UnsupportedNetwork from "../Modals/ChangeNetwork/UnsupportedNetwork";
import SelectNFTAler from "../Alerts/SelectNFTAler";
import PasteDestinationAlert from "../Alerts/PasteDestinationAlert";
import NoApprovedNFT from "../Alerts/NoApprovedNFT";
import {
  // usePrevious,
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

//import { RenderClaimInDestination } from "./hocs/hederaHOC";

//import { biz } from "../values";

import withChains from "./hocs";
import ReactGA from "../../services/GA4";
import ReceiverIsContract from "../Alerts/ReceiverIsContract";
import ClaimNFTViaHashModal from "../Wallet/ClaimNFTViaHashModal";

const intervalTm = 15_000;

function NFTaccount(props) {
  const { serviceContainer, chainSpecific, _from, chainSpecificRender } = props;

  const dispatch = useDispatch();

  const from = _from.key;
  const secret = from === "Secret";
  //const prevSelected = usePrevious(from);

  let nfts = useSelector((state) => state.general.NFTList);
  let currentsNFTs = useSelector((state) => state.general.currentsNFTs);

  const importModal = useSelector((state) => state.general.importModal);

  const account = useSelector((state) => state.general.account);
  const ff = useSelector((state) => state.general.from);
  //const prevAccount = usePrevious(account);

  const NFTSetToggler = useSelector((state) => state.general.NFTSetToggler);
  //const prevNFTSetToggler = usePrevious(NFTSetToggler);

  let selectedNFTs = useSelector((state) => state.general.selectedNFTList);

  const unwrappedEGold = useSelector((state) => state.general.unwrappedEGold);

  const checkWallet = useSelector((state) => state.general.checkWallet);

  const accountWalletModal = useSelector(
    (state) => state.general.accountWalletModal,
  );

  const undeployedUserStore = useSelector(
    (state) => state.general.undeployedUserStore,
  );

  const lockMainPannel = useSelector((state) => state.general.lockMainPannel);

  const preFetchData = useSelector((state) => state.general.preFetchData);

  const Claim = chainSpecificRender?.RenderClaimInDestination;

  let _account = checkWallet || account;

  const { bridge } = serviceContainer;

  async function getNFTsList(fromChain, contract) {
    dispatch(setBigLoader(true));
    try {
      let [nfts] = await Promise.all([
        fromChain.getNFTs(bridge.checkWallet || _account, contract),
        chainSpecific && chainSpecific(dispatch, fromChain, _account),
      ]);
      console.log({ nfts });
      nfts = fromChain.filterNFTs(nfts);

      //fromChain.estimateDeployUserStore();

      dispatch(setNFTList(nfts));
      dispatch(setPreloadNFTs(nfts.length));
      dispatch(setIsEmpty(nfts.length < 1));

      dispatch(setBigLoader(false));
    } catch (error) {
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

  let balanceInterval;

  useEffect(() => {
    dispatch(cleanSelectedNFTList());
    (async () => {
      const fromChain = await bridge.getChain(_from.nonce);

      if (_account) {
        getBalance(fromChain);
        !secret && getNFTsList(fromChain, preFetchData?.contract);
        balanceInterval = setInterval(() => getBalance(fromChain), intervalTm);
      }
    })();

    return () => clearInterval(balanceInterval);
  }, [_from, _account, NFTSetToggler, preFetchData?.contract]);

  useEffect(() => {
    /*window.addEventListener("keydown", async (e) => {
                if (e.code == "Numpad5" && location.origin.match(/localhost/)) {
                    dispatch(setApproveLoader(true));
                    await fromChain
                        .mintNFT(
                            "https://meta.polkamon.com/meta?id=10002366355"
                        )
                        .catch(() => dispatch(setApproveLoader(false)));
                    dispatch(setApproveLoader(false));
                }
            });*/

    ReactGA.send({
      hitType: "pageview",
      page: "/account/",
      title: "check",
    });
    return () => {};
  }, []);

  const isMobile = useCheckMobileScreen();

  const dest = useSelector((state) => state.general.to);

  const isClaimViaHash = useSelector((state) => state.general.isClaimViaHash);

  const closeClaimModal = () => {
    dispatch(setIsClaimViaHash(false));
  };

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
      <ReceiverIsContract />
      <NoApprovedNFT />
      <Container
        className={`nftSlectContaine ${
          undeployedUserStore ? " undeployedUserStore" : ""
        } ${lockMainPannel ? " lockedX" : ""}`}
      >
        <Modal
          className="claimModal"
          animation={false}
          show={isClaimViaHash}
          onHide={closeClaimModal}
        >
          <ClaimNFTViaHashModal handleClose={closeClaimModal} bridge={bridge} />
        </Modal>

        {dest?.type === "Hedera" && (
          // <Alert variant={"warning"}>Kindly make auto association on of your hashpack wallet before transfer nfts to hedera, thank you.</Alert>
          <></>
        )}

        <ReturnBtn />

        {false && (
          <Claim
            serviceContainer={serviceContainer}
            fromChain={ff.nonce}
            toChain={27}
            hash={
              "0x984e0c85404bd5419b33026f507b0e432e4ab35687e9478bf26bf234be41fed1"
            }
          />
        )}

        <div className="row account__container">
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

export default withChains(NFTaccount /*, { withDestinationChains: true }*/);
