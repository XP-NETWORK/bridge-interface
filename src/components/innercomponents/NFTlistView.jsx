
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import Close from '../../assets/img/icons/close.svg';
import NFTdetails from '../NFTdetails';
import { useDispatch, useSelector } from 'react-redux';
import NFTempty from './NFTempty';
import CheckGreen from '../../assets/img/icons/check_green.svg';

function NFTlistView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)
    const dispatch = useDispatch()

    const checkIfSelected = () => {
        return selectedNFTs.some( nft => nft.native.tokenId === nft.native.tokenId)
    }
    const addRemoveNFT = ( nft, index ) => {
        checkIfSelected() ? dispatch(removeFromSelectedNFTList(index)) : dispatch(setSelectedNFTList(nft))
    }

    return (
        <div className="nftListBox nftListView">
            <ul className="nftSelected">
            { nfts ?  nfts.filter( nft  => nft.name.includes(search ? search : '') || nft.native.owner.includes(search ? search : '')).map((nft, index) => 
                <li onClick={() => addRemoveNFT(nft, index)} className="nftListed">
                    <span className="selectNftListed">{ checkIfSelected() ? <img src={CheckGreen} /> : ''}</span><img src={nft.image} alt="NFT" /> 333333 NFT <NFTdetails nftInf={nft}/>
                </li>) 
                : 
                <NFTempty />
            }
            </ul>
        </div>
    )
}

export default NFTlistView;
