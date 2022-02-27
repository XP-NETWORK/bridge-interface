
import { setSelectedNFTList, removeFromSelectedNFTList }  from "../../store/reducers/generalSlice"
import NFTdetails from "../NFT/NFTdetails"
import { useDispatch, useSelector } from 'react-redux';
import NFTempty from '../innercomponents/NFTempty';
import CheckGreen from '../../assets/img/icons/check_green.svg';
import ListedView from "../NFT/ListedView"
import { useState } from "react";
import { useEffect } from "react";
import { isWhiteListed } from "./NFTHelper";

function NFTlistView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const from = useSelector(state => state.general.from)
    const search = useSelector(state => state.general.NFTListSearch)
    const [whitelisted, setWhitelisted] = useState()
    const dispatch = useDispatch()
    const OFF = {pointerEvents: "none"}
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

    // useEffect(async () => {
    //   const wl = await isWhiteListed(from.text, nft)
    // }, [])
    
    
    return (
        <div  className="nftListBox nftListView"> 
            <ul className="nftList">
            { nfts?.length ?  nfts.filter( (nft, index) => nft?.name?.includes(search ? search : '') || nft?.native.owner?.includes(search ? search : '')).map((nft, index) =>
                <li className="nftListed nftSelect">
                    <span /*style={!nft.whitelisted ? OFF : {}}*/ onClick={(e) => addRemoveNFT(nft, e)} className="selectNftListed">
                        { checkIfSelected(nft, selectedNFTs) ? 
                            <img onClick={(e) => addRemoveNFT(nft, e)} src={CheckGreen} alt={`${nft?.name}`} />
                            : 
                            ''
                        }
                    </span>
                    <div className="nftListed__info">
                        <ListedView  addRemoveNFT={addRemoveNFT} nft={nft} key={`nft-n-${index}`} />
                        <span /*style={!nft.whitelisted ? OFF : {}}*/ className="name" onClick={(e) => addRemoveNFT(nft, e)}>{nft?.data?.name || nft?.name}</span>
                    </div>
                    {/* { nft.whitelisted ?<NFTdetails nftInf={nft}/> 
                    : 
                    <div className="listed-view__not-whitelisted">
                        <div className="listed-view__not-whitelisted__text">Not Whitelisted</div>
                        <a href='https://t.me/xp_network' className="listed-view__not-whitelisted__button" target="_blank">Tech support</a>
                    </div> } */}
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
