
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import Close from '../../assets/img/icons/close.svg';
import NFTdetails from '../NFTdetails';
import { useDispatch, useSelector } from 'react-redux';
import NFTempty from './NFTempty';
import CheckGreen from '../../assets/img/icons/check_green.svg';
import { findInArray } from "../helpers"

function NFTlistView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)
    const dispatch = useDispatch()

    // const isSelected = selectedNFTs.filter(n => n.native.tokenId === nft.native.tokenId && n.native.contract === nft.native.contract && n.native.chainId === nft.native.chainId)[0]

    const checkIfSelected = ( nft ) => {
        return selectedNFTs.filter(n => n.native.tokenId === nft.native.tokenId && n.native.contract === nft.native.contract && n.native.chainId === nft.native.chainId)[0]
    }

    function addRemoveNFT (nft){
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
            { nfts ?  nfts.filter( nft  => nft.name.includes(search ? search : '') || nft.native.owner.includes(search ? search : '')).map((nft, index) => 
                <li onClick={() => addRemoveNFT(nft)} className="nftListed nftSelect">
                    <span className="selectNftListed">{ checkIfSelected(nft, selectedNFTs) ? <img src={CheckGreen} /> : ''}</span><img src={nft.image} alt="NFT" /> 333333 NFT <NFTdetails nftInf={nft}/>
                </li>) 
                : 
                <NFTempty />
            }
            </ul>
        </div>
    )
}

export default NFTlistView;
