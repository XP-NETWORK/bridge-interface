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

//import { biz } from "../values";

import withChains from "./hocs";
import ReactGA from "../../services/GA4";
import ReceiverIsContract from "../Alerts/ReceiverIsContract";

const intervalTm = 15_000;

function NFTaccount(props) {
    const { serviceContainer, chainSpecific, _from, algorandAccount } = props;

    const dispatch = useDispatch();

    const from = _from.key;
    const secret = from === "Secret";
    //const prevSelected = usePrevious(from);

    let nfts = useSelector((state) => state.general.NFTList);
    let currentsNFTs = useSelector((state) => state.general.currentsNFTs);

    const importModal = useSelector((state) => state.general.importModal);

    const tronWallet = useSelector((state) => state.general.tronWallet);
    const account = useSelector((state) => state.general.account);

    //const prevAccount = usePrevious(account);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const hederaAccount = useSelector((state) => state.general.hederaAccount);
    const secretAccount = useSelector((state) => state.general.secretAccount);
    const tonAccount = useSelector((state) => state.general.tonAccount);
    const NFTSetToggler = useSelector((state) => state.general.NFTSetToggler);
    //const prevNFTSetToggler = usePrevious(NFTSetToggler);

    let selectedNFTs = useSelector((state) => state.general.selectedNFTList);

    const unwrappedEGold = useSelector((state) => state.general.unwrappedEGold);

    const checkWallet = useSelector((state) => state.general.checkWallet);

    const accountWalletModal = useSelector(
        (state) => state.general.accountWalletModal
    );

    const undeployedUserStore = useSelector(
        (state) => state.general.undeployedUserStore
    );

    const lockMainPannel = useSelector((state) => state.general.lockMainPannel);

    //const preFetchData = useSelector((state) => state.general.preFetchData);

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

    async function getNFTsList(fromChain, contract) {
        dispatch(setBigLoader(true));
        try {
            let nfts = await fromChain.getNFTs(
                bridge.checkWallet || _account,
                contract
            );
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
            dispatch(
                setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25))
            );
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
            !secret &&
                _account &&
                getNFTsList(fromChain /*preFetchData?.contract*/);

            //update Balance
            getBalance(fromChain);
            chainSpecific && chainSpecific(dispatch, fromChain, _account);
            balanceInterval = setInterval(
                () => getBalance(fromChain),
                intervalTm
            );
        })();

        return () => clearInterval(balanceInterval);
    }, [_from, _account, NFTSetToggler /*preFetchData?.contract*/]);

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/account/",
            title: "check",
        });
        return () => {};
    }, []);

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
            <ReceiverIsContract />
            <NoApprovedNFT />
            <Container
                className={`nftSlectContaine ${
                    undeployedUserStore ? " undeployedUserStore" : ""
                } ${lockMainPannel ? " lockedX" : ""}`}
            >
                <ReturnBtn />
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

export default withChains(NFTaccount);
