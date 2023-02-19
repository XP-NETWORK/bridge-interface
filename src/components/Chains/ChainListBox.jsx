/* eslint-disable no-debugger */
import { useEffect, useRef, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chains } from "../../components/values";
import {
    setChainModal,
    setDepartureOrDestination,
    setTo,
    setFrom,
    setChainSearch,
    setSwitchDestination,
    setChangeWallet,
    setTemporaryFrom,
    setTemporaryTo,
} from "../../store/reducers/generalSlice";
import Chain from "./Chain";
import ChainSearch from "../Chains/ChainSearch";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useLocation } from "react-router-dom";
import { switchNetwork } from "../../services/chains/evm/evmService";
import ScrollArrows from "./ScrollArrows";

import PropTypes from "prop-types";

import { withServices } from "../App/hocs/withServices";

function ChainListBox({ serviceContainer }) {
    const { bridge } = serviceContainer;

    const dispatch = useDispatch();
    const location = useLocation();
    const departureOrDestination = useSelector(
        (state) => state.general.departureOrDestination
    );
    const chainSearch = useSelector((state) => state.general.chainSearch);
    let from = useSelector((state) => state.general.from);
    let to = useSelector((state) => state.general.to);
    const globalTestnet = useSelector((state) => state.general.testNet);
    const show = useSelector((state) => state.general.showChainModal);
    const switchChain = useSelector((state) => state.general.switchDestination);
    const [fromChains, setFromChains] = useState(chains);
    const [toChains, setToChains] = useState(chains);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const algorandAccount = useSelector(
        (state) => state.general.algorandAccount
    );
    const evmAccount = useSelector((state) => state.general.account);
    const tronAccount = useSelector((state) => state.general.tronWallet);
    const { account } = useWeb3React();
    const bitKeep = useSelector((state) => state.general.bitKeep);
    const nftChainListRef = useRef(null);
    const [reached, setReached] = useState(false);

    const handleClose = () => {
        dispatch(setChainModal(false));
        dispatch(setDepartureOrDestination(""));
        dispatch(setSwitchDestination(false));
        dispatch(setChainSearch(""));
    };

    const handleScroll = () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight,
        } = nftChainListRef.current;
        if (nftChainListRef?.current) {
            if (
                Math.ceil(scrollTop) + clientHeight === scrollHeight ||
                Math.ceil(scrollTop) - 1 + clientHeight === scrollHeight
            ) {
                setReached(true);
            } else setReached(false);
        }
    };
    // ! ref
    const chainSelectHandler = async (chain) => {
        // eslint-disable-next-line no-debugger
        // debugger;

        const chainWrapper = await bridge.getChain(chain.nonce);

        if (departureOrDestination === "departure") {
            if (
                chainWrapper.chainParams.name === "VeChain" &&
                bridge.currentType === "EVM"
            ) {
                dispatch(setChangeWallet(true));
                dispatch(setTemporaryFrom(chain));
                dispatch(setTemporaryTo(to));
                handleClose();
            } else if (
                chainWrapper.chainParams.type === bridge.currentType ||
                !bridge.currentType
            ) {
                if (from && from?.text !== chain.text) {
                    if (from?.text === "Harmony" && bitKeep) {
                        dispatch(setTemporaryFrom(chain));

                        dispatch(setChangeWallet(true));
                        handleClose();
                    } else if (
                        (account || evmAccount) &&
                        from.text !== "VeChain"
                    ) {
                        const switched = await switchNetwork(chain);
                        if (switched) {
                            dispatch(setFrom(chain));
                            if (to?.text === chain.text) {
                                dispatch(setTo(from));
                            }
                        }
                        handleClose();
                    } else {
                        dispatch(setFrom(chain));

                        handleClose();
                    }
                } else {
                    dispatch(setFrom(chain));
                    handleClose();
                }
                handleClose();
            } else {
                dispatch(setChangeWallet(true));
                dispatch(setTemporaryFrom(chain));
                dispatch(setTemporaryTo(to));
                handleClose();
            }
            handleClose();
        } else if (departureOrDestination === "destination") {
            if (from?.text === chain.text) {
                if (to?.text === "Harmony" && bitKeep) {
                    dispatch(setTemporaryFrom(to));
                    dispatch(setChangeWallet(true));
                    handleClose();
                } else if (account || evmAccount) {
                    const switched = await switchNetwork(to);
                    if (switched) {
                        dispatch(setTo(from));
                        dispatch(setFrom(to));
                    }
                }
            } else {
                dispatch(setTo(chain));
            }
            handleClose();
        }
    };

    useEffect(() => {
        // debugger;
        let filteredChains = chains;
        if (chainSearch && departureOrDestination === "departure") {
            filteredChains = chains.filter((chain) =>
                chain.text.toLowerCase().includes(chainSearch.toLowerCase())
            );
        }
        const withNew = filteredChains
            .filter((chain) => chain.newChain)
            .sort((a, b) => a.order - b.order);
        const withComing = filteredChains
            .filter((chain) => chain.coming && !chain.newChain)
            .sort((a, b) => b.order - a.order);
        const withMaintenance = filteredChains.filter(
            (chain) => chain.maintenance && !chain.newChain
        );
        const noComingNoMaintenance = filteredChains
            .filter(
                (chain) =>
                    !chain.coming && !chain.maintenance && !chain.newChain
            )
            .sort((a, b) => a.order - b.order);
        let sorted = [
            ...withNew,
            ...noComingNoMaintenance,
            ...withMaintenance,
            ...withComing,
        ];

        if (
            location.pathname === "/connect" ||
            location.pathname === "/testnet/connect" ||
            location.pathname === "/account" ||
            location.pathname === "/testnet/account" ||
            location.pathname === "/staging" ||
            location.pathname === "/staging/account" ||
            location.pathname === "/"
        ) {
            setFromChains(sorted.filter((e) => e.text !== to?.text));
        } else setFromChains(sorted);
        if (sorted.length <= 5) setReached(true);
        return () => setReached(false);
    }, [
        elrondAccount,
        tezosAccount,
        algorandAccount,
        tronAccount,
        evmAccount,
        chainSearch,
        to,
        departureOrDestination,
        location.pathname,
    ]);

    useEffect(() => {
        let filteredChains = chains;
        if (chainSearch && departureOrDestination === "destination") {
            filteredChains = chains.filter((chain) =>
                chain.text.toLowerCase().includes(chainSearch.toLowerCase())
            );
        }
        const withNew = filteredChains
            .filter((chain) => chain.newChain)
            .sort((a, b) => a.order - b.order);
        const withComing = filteredChains
            .filter((chain) => chain.coming && !chain.newChain)
            .sort((a, b) => b.order - a.order);
        const withMaintenance = filteredChains.filter(
            (chain) => chain.maintenance && !chain.newChain
        );
        const noComingNoMaintenance = filteredChains
            .filter(
                (chain) =>
                    !chain.coming && !chain.maintenance && !chain.newChain
            )
            .sort((a, b) => a.order - b.order);
        let sorted = [
            ...withNew,
            ...noComingNoMaintenance,
            ...withMaintenance,
            ...withComing,
        ];
        if (
            location.pathname === "/connect" ||
            location.pathname === "/testnet/connect" ||
            location.pathname === "/account" ||
            location.pathname === "/testnet/account" ||
            location.pathname === "/staging" ||
            location.pathname === "/staging/account" ||
            location.pathname === "/"
        ) {
            setToChains(sorted.filter((e) => e.text !== from?.text));
        } else {
            setToChains(sorted);
        }
        if (sorted.length <= 5) setReached(true);
        return () => setReached(false);
    }, [from, chainSearch, departureOrDestination, location.pathname]);

    useEffect(() => {
        if (
            from?.text === to?.text &&
            (!location.pathname === "/account" ||
                !location.pathname === "/testnet/account")
        ) {
            dispatch(setTo(""));
        }
    }, [to, from, dispatch, location.pathname]);

    return (
        <Modal
            animation={false}
            show={show || switchChain}
            onHide={handleClose}
            className="ChainModal"
        >
            <Modal.Header className="text-left">
                <Modal.Title>{`Select ${
                    departureOrDestination === "destination"
                        ? "destination"
                        : "departure"
                } chain`}</Modal.Title>
                <span className="CloseModal" onClick={handleClose}>
                    <div className="close-modal"></div>
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="nftChainListBox">
                    <ChainSearch />
                    <ul
                        onScroll={handleScroll}
                        ref={nftChainListRef}
                        className="nftChainList scrollSty"
                    >
                        {//! Show only mainnet FROM chains //
                        departureOrDestination === "departure" &&
                            !globalTestnet &&
                            fromChains.map((chain) => {
                                const {
                                    image,
                                    text,
                                    key,
                                    coming,
                                    newChain,
                                    maintenance,
                                    mainnet,
                                    updated,
                                    nonce,
                                } = chain;
                                return (
                                    (mainnet || coming) && (
                                        <Chain
                                            chainSelectHandler={
                                                chainSelectHandler
                                            }
                                            updated={updated}
                                            newChain={newChain}
                                            maintenance={maintenance}
                                            coming={coming}
                                            text={text}
                                            chainKey={key}
                                            filteredChain={chain}
                                            image={image}
                                            key={`chain-${key}`}
                                            nonce={nonce}
                                        />
                                    )
                                );
                            })}
                        {//! Show only mainnet TO chains //
                        departureOrDestination === "destination" &&
                            !globalTestnet &&
                            toChains.map((chain) => {
                                const {
                                    image,
                                    text,
                                    key,
                                    coming,
                                    newChain,
                                    maintenance,
                                    mainnet,
                                    updated,
                                    nonce,
                                } = chain;
                                return (
                                    (mainnet || coming) && (
                                        <Chain
                                            chainSelectHandler={
                                                chainSelectHandler
                                            }
                                            updated={updated}
                                            newChain={newChain}
                                            maintenance={maintenance}
                                            coming={coming}
                                            text={text}
                                            chainKey={key}
                                            filteredChain={chain}
                                            image={image}
                                            nonce={nonce}
                                            key={`chain-${key}`}
                                        />
                                    )
                                );
                            })}
                        {//! Show only testnet FROM chains //
                        departureOrDestination === "departure" &&
                            globalTestnet &&
                            fromChains.map((chain) => {
                                const {
                                    image,
                                    text,
                                    key,
                                    coming,
                                    newChain,
                                    maintenance,
                                    testNet,
                                    updated,
                                    nonce,
                                } = chain;
                                return (
                                    testNet && (
                                        <Chain
                                            chainSelectHandler={
                                                chainSelectHandler
                                            }
                                            updated={updated}
                                            newChain={newChain}
                                            maintenance={maintenance}
                                            coming={coming}
                                            text={text}
                                            chainKey={key}
                                            filteredChain={chain}
                                            image={image}
                                            nonce={nonce}
                                            key={`chain-${key}`}
                                        />
                                    )
                                );
                            })}
                        {//! Show only testnet TO chains //
                        departureOrDestination === "destination" &&
                            globalTestnet &&
                            toChains.map((chain) => {
                                const {
                                    image,
                                    text,
                                    key,
                                    coming,
                                    newChain,
                                    maintenance,
                                    testNet,
                                    updated,
                                    nonce,
                                } = chain;
                                return (
                                    testNet && (
                                        <Chain
                                            chainSelectHandler={
                                                chainSelectHandler
                                            }
                                            updated={updated}
                                            newChain={newChain}
                                            maintenance={maintenance}
                                            coming={coming}
                                            text={text}
                                            chainKey={key}
                                            filteredChain={chain}
                                            image={image}
                                            nonce={nonce}
                                            key={`chain-${key}`}
                                        />
                                    )
                                );
                            })}
                    </ul>
                    {!reached && <ScrollArrows />}
                </div>
            </Modal.Body>
        </Modal>
    );
}

ChainListBox.propTypes = {
    serviceContainer: PropTypes.object,
};

export default withServices(ChainListBox);
