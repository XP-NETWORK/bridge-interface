import React, { useState } from "react";
import { ChainType, CHAIN_INFO, Chain } from "xp.network";
import { useDispatch, useSelector } from "react-redux";
import {
    setPreFetchData,
    cleanSelectedNFTList,
    setShowSearchNFTCanisterModal,
    setICPCanisterSearch,
} from "../../../store/reducers/generalSlice";
import { useCheckMobileScreen } from "../../Settings/hooks";
import { StringShortener } from "../../../utils";
import { withServices } from "../../App/hocs/withServices";
import { Modal } from "react-bootstrap";

const CollectionPannel = () => {
    const preFetchData = useSelector((state) => state.general.preFetchData);

    //const dispatch = useDispatch();

    const isMobile = useCheckMobileScreen();

    const chain = CHAIN_INFO.get(Chain.DFINITY);
    const dispatch = useDispatch();
    const dab = preFetchData.contract === "default";
    return (
        <div className="scretPannelWrap collectionPannelWrap">
            <div className="collectionPannel">
                <p>
                    <span>Contract: </span>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={
                            dab
                                ? "https://dab.ooo/nfts/"
                                : `${chain.blockExplorerUrlAddr}${preFetchData.contract}`
                        }
                    >
                        {dab
                            ? "DAB NFT list"
                            : isMobile
                            ? StringShortener(preFetchData.contract, 10)
                            : preFetchData.contract}
                    </a>
                </p>
                <div
                    className="clear-selected"
                    onClick={() => {
                        dispatch(cleanSelectedNFTList());
                        dispatch(setPreFetchData(null));
                    }}
                >
                    Change canister
                </div>
            </div>
        </div>
    );
};

const PreNftFech = ({ show }) => {
    const dispatch = useDispatch();

    const ICPCanisterSearch = useSelector(
        (state) => state.general.ICPCanisterSearch
    );

    const handleLoadAssets = (defaultColletions) => {
        if (!ICPCanisterSearch && !defaultColletions) return;
        dispatch(
            setPreFetchData({
                contract: ICPCanisterSearch || defaultColletions,
            })
        );
        dispatch(setICPCanisterSearch(""));
    };

    return (
        <div className={`nftListBox preNftFetch ${show && "hidden"}`}>
            <div className="preScreen">
                <h3>NFT canister</h3>
                <p>Please enter canister address below.</p>

                <div className="fieldsWrapper">
                    <div className="contract-input__wrapper">
                        <input
                            onBlur={() => {}}
                            onChange={(e) =>
                                dispatch(setICPCanisterSearch(e.target.value))
                            }
                            type="text"
                            id="contractAdd"
                            name="contractAddress"
                            placeholder="Paste Canister Address"
                            value={ICPCanisterSearch}
                            className={""}
                        />
                        {/*contractOnBlur && !validContract && (
            <span className={"contract--invalid"}>
              Error Contract Address
            </span>
          )*/}
                        {/* {toggle === "set" && <SecretContractsDropdown />} */}
                    </div>
                </div>
                <div className="buttonContainer">
                    <div
                        className="transfer-button"
                        onClick={() => handleLoadAssets()}
                    >
                        Load assets
                    </div>
                    <div
                        className="transfer-button secondary"
                        onClick={() => handleLoadAssets("default")}
                    >
                        Show DAB collections
                    </div>
                </div>
            </div>
        </div>
    );
};

const NFTListTopButton = withServices(({ serviceContainer }) => {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setShowSearchNFTCanisterModal(true));
    };

    const showSearchNFTCanisterModal = useSelector(
        (state) => state.general.showSearchNFTCanisterModal
    );
    const [actionId, setActionId] = useState("");
    const [searchError, setError] = useState(false);

    const handleSearch = () => {
        bridge.getChain(Chain.DFINITY).then(async (chainWrapper) => {
            const targetCanister = await chainWrapper.chain.validatedMint(
                actionId
            );
            if (!targetCanister) {
                return setError(true);
            }
            setError(false);
            dispatch(setICPCanisterSearch(targetCanister));
            handleClose();
        });
    };

    const handleClose = () => {
        setActionId("");
        setError(false);
        dispatch(setShowSearchNFTCanisterModal(false));
    };

    return (
        <>
            <Modal
                show={showSearchNFTCanisterModal}
                animation={null}
                className=" ChainModal import-nft__modal"
            >
                {" "}
                <Modal.Header className="border-0">
                    <Modal.Title>Search NFT Canister</Modal.Title>
                    <span className="CloseModal">
                        <div
                            onClick={handleClose}
                            className="close-modal"
                        ></div>
                    </span>
                </Modal.Header>
                <Modal.Body className="import-nft__body">
                    <div className="import-nft__form">
                        <form
                            action=""
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div>
                                <label htmlFor="contractAdd">
                                    {" "}
                                    Paste Bridge Action Id
                                </label>
                                <input
                                    onChange={(e) => {
                                        setActionId(e.target.value);
                                    }}
                                    type="text"
                                    id="contractAdd"
                                    name="contractAddress"
                                    value={actionId}
                                    className={"contract__input--valid"}
                                />

                                {searchError && (
                                    <span className={"contract--invalid"}>
                                        Action Id is not found
                                    </span>
                                )}
                            </div>

                            <div className="import-nft__buttons">
                                <div
                                    onClick={handleSearch}
                                    className="btn-import"
                                >
                                    Search
                                </div>
                                <div
                                    onClick={handleClose}
                                    className="btn-cancel"
                                >
                                    Cancel
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <div onClick={handleClick} className="import-nft-button icp-search">
                <div className="import-icon"></div>
            </div>
        </>
    );
});

export const withICP = (Wrapped) =>
    function CBU(props) {
        return (
            <Wrapped
                {...props}
                chainSpecificRender={{
                    ...(props.chainSpecificRender || {}),
                    [ChainType.DFINITY]: {
                        PreNftFech,
                        CollectionPannel,
                        NFTListTopButton,
                    },
                }}
                chainSpecific={{
                    ...(props.chainSpecific || {}),
                }}
            />
        );
    };
