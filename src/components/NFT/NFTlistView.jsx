
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import NFTdetails from "../NFT/NFTdetails"
import { useDispatch, useSelector } from 'react-redux';
import NFTempty from '../innercomponents/NFTempty';
import CheckGreen from '../../assets/img/icons/check_green.svg';
import ListedView from "../NFT/ListedView"
import NFTcardListed from "./NFTcardListed";

function NFTlistView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)
    const dispatch = useDispatch()

    const checkIfSelected = ( nft ) => {
        return selectedNFTs.filter(n => n.native.tokenId === nft.native.tokenId && n.native.contract === nft.native.contract && n.native.chainId === nft.native.chainId)[0]
    }

    function addRemoveNFT (nft, e){
        if(!checkIfSelected(nft)){
            dispatch(setSelectedNFTList(nft))
        }
        else{
            dispatch(removeFromSelectedNFTList(nft))
        }
    }
    
    return (
        <div className="nftListBox nftListView"> 
            <ul className="nftList">
            { nfts?.length ?  nfts.filter( (nft, index) => nft?.name?.includes(search ? search : '') || nft?.native.owner?.includes(search ? search : '')).map((nft, index) =>
                <li className="nftListed nftSelect">
                    <span onClick={(e) => addRemoveNFT(nft, e)} className="selectNftListed">
                        { checkIfSelected(nft, selectedNFTs) ? 
                            <img onClick={(e) => addRemoveNFT(nft, e)} src={CheckGreen} alt={`${nft?.name}`} />
                            : 
                            ''
                        }
                    </span>
                    <ListedView addRemoveNFT={addRemoveNFT} nft={nft} key={`nft-n-${index}`} />
                    <span className="name" onClick={(e) => addRemoveNFT(nft, e)}>{nft?.data?.name || nft?.name}</span>
                    <NFTdetails nftInf={nft}/>
                </li>
                ) 
                : 
                <NFTempty />
            }
            </ul>
        </div>
    )
}

export default NFTlistView;
