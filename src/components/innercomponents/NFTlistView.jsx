
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

    function addRemoveNFT (nft, e){
        if(!checkIfSelected(nft)){
            dispatch(setSelectedNFTList(nft))
        }
        else{
            dispatch(removeFromSelectedNFTList(nft))
        }
    }
    console.log(nfts)
    return (
        <div className="nftListBox nftListView">
            
            <ul className="nftList">
            { nfts ?  nfts.filter( nft  => nft?.name?.includes(search ? search : '') || nft?.native.owner?.includes(search ? search : '')).map((nft, index) => 
                <li  className="nftListed nftSelect">
                    <span onClick={(e) => addRemoveNFT(nft, e)} className="selectNftListed">{ checkIfSelected(nft, selectedNFTs) ? <img onClick={(e) => addRemoveNFT(nft, e)} src={CheckGreen} /> : ''}</span><img onClick={(e) => addRemoveNFT(nft, e)} src={nft.image} alt="NFT" /> <span onClick={(e) => addRemoveNFT(nft, e)}>{nft?.name}</span> <NFTdetails nftInf={nft}/>
                </li>) 
                : 
                <NFTempty />
            }
            </ul>
        </div>
    )
}

export default NFTlistView;
