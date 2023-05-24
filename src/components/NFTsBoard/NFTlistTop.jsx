/* eslint-disable react/prop-types */
import { useDispatch, React } from "react-redux";
import {
    setChainModal,
    setDepartureOrDestination,
} from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import ChainListBox from "../Chains/ChainListBox";
import NFTSearch from "./NFTSearch";
import ChainSwitch from "../Buttons/ChainSwitch";
import Refresh from "../Buttons/Refresh";
import SelectedNFTs from "../Buttons/SelectedNFTs";
import ViewButton from "../Buttons/ViewButton";
import ImportNFTButton from "../Buttons/ImportNFTButton";

function NFTlistTop({ chainSpecificRender }) {
    const dispatch = useDispatch();
    const nfts = useSelector((state) => state.general.NFTList);
    const from = useSelector((state) => state.general.from);
    const { CheckClaimables } = chainSpecificRender;

    const handleFromChainSwitch = () => {
        dispatch(setDepartureOrDestination("departure"));
        dispatch(setChainModal(true));
    };

    return (
        <>
            <div className="yourNft--mobile">
                <span className="yourNft__title">Your NFTs on </span>
                {/* <Refresh /> */}
                <ChainSwitch assignment={"from"} />
            </div>
            <div className="nftListTop">
                <ChainListBox />
                <div className="yourNft desktopOnly">
                    <div className="yourNft__title">Your NFTs on</div>
                    <ChainSwitch
                        assignment={"from"}
                        func={handleFromChainSwitch}
                    />
                    <Refresh />

                    {CheckClaimables && CheckClaimables()}
                </div>
                <SelectedNFTs />
                {from.type === "EVM" && nfts?.length < 1 && <ImportNFTButton />}
                {(nfts?.length > 0 || from?.type === "Cosmos") && (
                    <div className="nftTopRIght">
                        <NFTSearch />
                        {from.type === "EVM" && (
                            // ||
                            // from?.type !== "Cosmos"
                            <ImportNFTButton />
                        )}
                        <ViewButton />
                        {/* {onlyWhiteListedNFTs?.length === selectedNFTs?.length &&
                        selectedNFTs?.length ? (
                            <div
                                className="delete-all"
                                onClick={() => dispatch(cleanSelectedNFTList())}
                            >
                                {" "}
                                <Check className="svgWidget" />
                            </div>
                        ) : (
                            <div
                                style={currentsNFTs ? {} : OFF}
                                onClick={() => dispatch(allSelected())}
                                className="select-all"
                            >
                                <Check className="svgWidget" />
                            </div>
                        )} */}
                    </div>
                )}
            </div>
        </>
    );
}

export default NFTlistTop;
