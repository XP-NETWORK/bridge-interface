import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListedView from './ListedView'
import NFTdetails from './NFTdetails'
import CheckGreen from '../../assets/img/icons/check_green.svg';
import { removeFromSelectedNFTList, setSelectedNFTList } from '../../store/reducers/generalSlice';
import { isValidHttpUrl } from '../../wallet/helpers';
import brokenUrl from "../../assets/img/brockenurl.png";
import { getUrl } from './NFTHelper';
import BrokenUrlListedView from "./BrokenUrlListedView"


export default function NFTcardListed({nft, index}) {

  const dispatch = useDispatch()
const { video, videoUrl, imageUrl, image, ipfsArr } = getUrl(nft);
const [brokenURL, setBrokenURL] = useState(false)
const selectedNFTs = useSelector(state => state.general.setSelectedNFTList)

const checkIfSelected = () => {
  return selectedNFTs.filter(n => n.native.tokenId === nft.native.tokenId && n.native.contract === nft.native.contract && n.native.chainId === nft.native.chainId)[0]
}

// function addRemoveNFT (){
//   if(!checkIfSelected()){
//       dispatch(setSelectedNFTList(nft))
//   }
//   else{
//       dispatch(removeFromSelectedNFTList(nft))
//   }
// }

  return (
    <li className='nft__listed-card'>
      <span  className="selectNftListed">
          { checkIfSelected() ? 
              <img  src={CheckGreen} alt={`${nft?.name}`} />
              : 
              ''
          }
      </span>
      <div className="listed-image__wrapper">
        { nft.uri && isValidHttpUrl(nft.uri) && brokenURL ?
        <div>image video</div>
        :
        <BrokenUrlListedView />
        }
      </div>
    </li>
  )
}
