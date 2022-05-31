import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import NFTlistTop from "./NFTlistTop";
import { Modal } from "react-bootstrap";
import ImportNFTModal from "../Modals/ImportNFTModal/ImportNFTModal";
import {
    setBalance,
    setChainModal,
    setDepartureOrDestination,
    setError,
    setSearchNFTList,
    setSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    getAlgorandClaimables,
    getFactory,
    setNFTS,
} from "../../wallet/helpers";
import { ReturnBtn } from "../Settings/returnBtn";
import DesktopTransferBoard from "../TransferBoard/DesktopTransferBoard";
import MobileTransferBoard from "../TransferBoard/MobileTransferBoard";
import MobileDestinationAddressBar from "../MobileOnly/MobileDestinationAddressBar";
import "./NFTsBoard.css";
import Refresh from "../Buttons/Refresh";
import ChainSwitch from "../Buttons/ChainSwitch";
import SelectedNFTs from "../Buttons/SelectedNFTs";
import ViewButton from "../Buttons/ViewButton";
import SelectClearAll from "../Buttons/SelectClearAll";
import SelectedNFT from "../innercomponents/SelectedNFT";
import SearchButton from "../Buttons/SearchButton";
import MobileNFTsSearch from "../MobileOnly/MobileNFTsSearch";
import Approval from "../TransferBoard/Approval";
import SendFees from "../TransferBoard/SendFees";
import ButtonToTransfer from "../TransferBoard/ButtonToTransfer";
import ChangeNetworkModal from "../Modals/ChangeNetwork/ChangeNetworkModal";
import UnsupportedNetwork from "../Modals/ChangeNetwork/UnsupportedNetwork";
import SelectNFTAler from "../Alerts/SelectNFTAler";
import PasteDestinationAlert from "../Alerts/PasteDestinationAlert";
import NoApprovedNFT from "../Alerts/NoApprovedNFT";
import { usePrevious } from "../Settings/hooks";
import { chainsConfig } from "../values";
import { useWeb3React } from "@web3-react/core";
import ImportNFTButton from "../Buttons/ImportNFTButton";

function NFTaccount() {
    const dispatch = useDispatch();
    const from = useSelector((state) => state.general.from.key);
    const _from = useSelector((state) => state.general.from);
    const prevSelected = usePrevious(from);
    const type = useSelector((state) => state.general.from.type);
    const algorandAccount = useSelector((s) => s.general.algorandAccount);
    const NFTListView = useSelector((state) => state.general.NFTListView);
    const nfts = useSelector((state) => state.general.NFTList);
    const importModal = useSelector((state) => state.general.importModal);
    const algorandClaimables = useSelector(
        (state) => state.general.algorandClaimables
    );
    const tronWallet = useSelector((state) => state.general.tronWallet);
    const account = useSelector((state) => state.general.account);
    const prevAccount = usePrevious(account);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const NFTSetToggler = useSelector((state) => state.general.NFTSetToggler);
    const prevNFTSetToggler = usePrevious(NFTSetToggler);
    const [showSelected, setShowSelected] = useState(false);
    const [showNFTsSearch, setNFTsSearch] = useState(false);
    const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
    const [index, setIndex] = useState(0);
    const { library } = useWeb3React();
    //Anjelika - 0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE
    //Anjelika elrond - erd1s89aq3s0z6mjfpx8s85zntlfywsvj5r8nzcdujw7mx53f9et9ezq9fnrws
    //Dima. U - 0x6449b68cc5675f6011e8DB681B142773A3157cb9
    // Dima.B - 0x0d7df42014064a163DfDA404253fa9f6883b9187
    // ????? - 0x3Aa485a8e745Fc2Bd68aBbdB3cf05B58E338D7FE

    async function getNFTsList(str) {
        const useHardcoded = false;
        const hard = "0x124fBa3250c8d72FBcb5b5712d0dF48c33E6C1F6";
        try {
            const w = useHardcoded
                ? hard
                : type === "EVM" || type === "VeChain"
                ? account
                : type === "Tezos"
                ? tezosAccount
                : type === "Algorand"
                ? algorandAccount
                : type === "Elrond"
                ? elrondAccount
                : type === "Tron"
                ? tronWallet
                : undefined;
            await setNFTS(w, from, undefined, "account");
        } catch (error) {
            dispatch(setError(error.data ? error.data.message : error.message));
        }
    }

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

    const getBalance = async () => {
        let _account =
            account ||
            algorandAccount ||
            tezosAccount ||
            elrondAccount ||
            tronWallet;
        const factory = await getFactory();
        const fromChain = await factory.inner(chainsConfig[from].Chain);
        let balance;
        let balanceToShow;
        while (!balance) {
            try {
                balance = factory
                    ? await factory.balance(fromChain, _account)
                    : undefined;
                switch (_from.type) {
                    case "EVM":
                        balanceToShow = library.utils.fromWei(
                            `${balance.toNumber()}`,
                            "ether"
                        );
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
                    default:
                        break;
                }
                return balance;
            } catch (error) {
                console.log(error);
            }
        }
    };

    const toShowSuccess = () => {
        // return txnHashArr?.length ? true : false;
        return true;
    };

    useEffect(async () => {
        if (!nfts?.some((nft) => nft.dataLoaded)) {
            await getNFTsList();
        }
        if (
            algorandAccount &&
            !algorandClaimables?.some((nft) => nft.dataLoaded)
        ) {
            await getAlgorandClaimables(algorandAccount);
        }
        getBalance();
    }, []);

    useEffect(async () => {
        if (nfts && prevSelected !== from) {
            await getNFTsList();
        } else if (nfts && prevAccount !== account) {
            await getNFTsList();
        } else if (nfts && NFTSetToggler !== prevNFTSetToggler) {
            await getNFTsList();
        }
        getBalance();
    }, [from, account, NFTSetToggler]);

    useEffect(() => {
        if (selectedNFTs.length < 1) {
            setShowSelected(false);
        }
    }, [selectedNFTs, nfts]);

    return (
        <div className="NFTaccount">
            <Modal
                show={importModal}
                animation={false}
                className=" ChainModal import-nft__modal"
            >
                <ImportNFTModal />
            </Modal>
            <ChangeNetworkModal />
            <UnsupportedNetwork />
            <SelectNFTAler />
            <PasteDestinationAlert />
            <NoApprovedNFT />
            <Container className="nftSlectContaine">
                <ReturnBtn />
                <div className="row">
                    <div className="nftListCol col-lg-8">
                        <div className="nft_selectBox">
                            <NFTlistTop />
                            {NFTListView ? (
                                <NFTlistView />
                            ) : (
                                <NFTgridView
                                    scrollIndex={index}
                                    setIndex={setIndex}
                                />
                            )}
                            {/* <div className="algo-claimable">
                // TODO Algorand Claimable
              </div> */}
                        </div>
                        <MobileTransferBoard />
                    </div>
                    <DesktopTransferBoard />
                </div>
                <div className="mobile-col">
                    <div className="mobile-col__tittle">
                        <div>Send NFT</div>
                    </div>
                    <div className="mobile-col__header">
                        <div>Your NFTs on</div>
                        <Refresh />
                        <ChainSwitch
                            assignment={"from"}
                            func={handleFromChainSwitch}
                        />
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
                                {_from.type === "EVM" && <ImportNFTButton />}
                                {nfts?.length > 0 && (
                                    <div className="mobile-nfts__buttons">
                                        <SearchButton
                                            handleSearchTop={handleSearchTop}
                                        />
                                        {_from.type === "EVM" && (
                                            <ImportNFTButton />
                                        )}
                                        <ViewButton />
                                        <SelectClearAll />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <MobileNFTsSearch
                                handleSearchTop={handleSearchTop}
                            />
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
                    <MobileDestinationAddressBar />
                    <Approval />
                    <SendFees />
                    <ButtonToTransfer />
                </div>
            </Container>
        </div>
    );
}

export default NFTaccount;
