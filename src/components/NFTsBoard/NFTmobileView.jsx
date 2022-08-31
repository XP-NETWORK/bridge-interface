import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";

import { Modal } from "react-bootstrap";
import ImportNFTModal from "../Modals/ImportNFTModal/ImportNFTModal";
import {
    setBalance,
    setChainModal,
    setDepartureOrDestination,
    setError,
    setSearchNFTList,
    setWrappedEGold,
    cleanSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";

import MobileDestinationAddressBar from "../MobileOnly/MobileDestinationAddressBar";
import "./NFTsBoard.css";
import Refresh from "../Buttons/Refresh";
import ChainSwitch from "../Buttons/ChainSwitch";
import SelectedNFTs from "../Buttons/SelectedNFTs";
import ViewButton from "../Buttons/ViewButton";
import SelectClearAll from "../Buttons/SelectClearAll";
import SelectedNFT from "../NFT/SelectedNFTs";
import SearchButton from "../Buttons/SearchButton";
import MobileNFTsSearch from "../MobileOnly/MobileNFTsSearch";
import Approval from "../TransferBoard/Approval";
import SendFees from "../TransferBoard/SendFees";
import ButtonToTransfer from "../TransferBoard/ButtonToTransfer";
import ImportNFTButton from "../Buttons/ImportNFTButton";

import UnwrapWegld from "../TransferBoard/UnwrapWegld";
import Pagination from "./Pagination";
import ChainListBox from "../Chains/ChainListBox";

const NFTmobileView = ({ selectedNFTs, _from, nfts }) => {
    const dispatch = useDispatch();

    const [showNFTsSearch, setNFTsSearch] = useState(false);
    const [showSelected, setShowSelected] = useState(false);

    const NFTListView = useSelector((state) => state.general.NFTListView);

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
                            on={showSelected}
                            show={
                                selectedNFTs.length > 0
                                    ? handleShowSelected
                                    : undefined
                            }
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
                                <SelectClearAll />
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
            <Approval />
            <SendFees />
            <ButtonToTransfer />
            <UnwrapWegld />
        </div>
    );
};

export default NFTmobileView;
