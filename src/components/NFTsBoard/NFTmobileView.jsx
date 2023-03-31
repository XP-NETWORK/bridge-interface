import { useEffect, useState, React } from "react";
import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import PropTypes from "prop-types";

import {
    setChainModal,
    setDepartureOrDestination,
    setSearchNFTList,
} from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import MobileDestinationAddressBar from "../MobileOnly/MobileDestinationAddressBar";
import "./NFTsBoard.css";
import Refresh from "../Buttons/Refresh";
import ChainSwitch from "../Buttons/ChainSwitch";
import SelectedNFTs from "../Buttons/SelectedNFTs";
import ViewButton from "../Buttons/ViewButton";
import SelectedNFT from "../NFT/SelectedNFTs";
import SearchButton from "../Buttons/SearchButton";
import MobileNFTsSearch from "../MobileOnly/MobileNFTsSearch";
import Approval from "../TransferBoard/Approval";
import SendFees from "../TransferBoard/SendFees";
import ButtonToTransfer from "../TransferBoard/ButtonToTransfer";
import ImportNFTButton from "../Buttons/ImportNFTButton";
import Comment from "../innercomponents/Comment";

import UnwrapWegld from "../TransferBoard/UnwrapWegld";
import Pagination from "./Pagination";
import ChainListBox from "../Chains/ChainListBox";
import { ELROND } from "../../components/values";
import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

const NFTmobileView = ({ selectedNFTs, _from, nfts }) => {
    const dispatch = useDispatch();

    let [showNFTsSearch, setNFTsSearch] = useState(false);
    const [showSelected, setShowSelected] = useState(false);

    const NFTListView = useSelector((state) => state.general.NFTListView);
    const from = useSelector((state) => state.general.from);

    useEffect(() => {
        if (selectedNFTs.length < 1) {
            setShowSelected(false);
        }
    }, [selectedNFTs, nfts]);

    const handleFromChainSwitch = () => {
        dispatch(setDepartureOrDestination("departure"));
        dispatch(setChainModal(true));
    };

    const handleShowSelected = () => {
        setShowSelected(!showSelected);
    };

    const handleSearchTop = () => {
        setNFTsSearch(!showNFTsSearch);
        dispatch(setSearchNFTList(""));
        handleGA4Event(
            googleAnalyticsCategories.Button,
            "Search Mobile Button"
        );
    };

    return (
        <div className="mobile-col">
            <div className="mobile-col__tittle">
                <div>Send NFT</div>
            </div>
            <div className="mobile-col__header">
                <div>Your NFTs on</div>
                <Refresh />
                <ChainListBox />
                <ChainSwitch assignment={"from"} func={handleFromChainSwitch} />
            </div>
            <div className="mobile-nfts__list">
                {!showNFTsSearch ? (
                    <div className="mobile-nfts__header">
                        <SelectedNFTs
                            on={true}
                            show={
                                selectedNFTs.length > 0
                                    ? handleShowSelected
                                    : undefined
                            }
                            // show={true}
                            showSelected={showSelected}
                            setOff={setShowSelected}
                        />
                        {_from.type === "EVM" && nfts?.length < 1 && (
                            <ImportNFTButton />
                        )}
                        {nfts?.length > 0 && (
                            <div className="mobile-nfts__buttons">
                                <SearchButton
                                    handleSearchTop={handleSearchTop}
                                />
                                {_from.type === "EVM" && <ImportNFTButton />}
                                <ViewButton />
                                {/* <SelectClearAll /> */}
                            </div>
                        )}
                    </div>
                ) : (
                    <MobileNFTsSearch handleSearchTop={handleSearchTop} />
                )}
                <div className="mobile-nfts__body">
                    {!showSelected ? (
                        NFTListView ? (
                            <NFTlistView />
                        ) : (
                            <NFTgridView />
                        )
                    ) : (
                        showSelected && <SelectedNFT />
                    )}
                </div>
            </div>
            <Pagination />
            <MobileDestinationAddressBar />
            {nfts?.length ? (
                <>
                    <Approval />
                    <SendFees />
                    <ButtonToTransfer />
                    {from?.text === ELROND && <UnwrapWegld />}
                </>
            ) : (
                <Comment />
            )}
        </div>
    );
};

NFTmobileView.propTypes = {
    selectedNFTs: PropTypes.array,
    _from: PropTypes.object,
    nfts: PropTypes.array,
};

export default NFTmobileView;
