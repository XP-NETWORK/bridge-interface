import React, { useEffect } from 'react'

import Algorand from '../../assets/img/chain/Algarand.svg';
import BSC from '../../assets/img/chain/Binance.svg';
import Search from '../../assets/img/icons/Search.svg';
import ListView from '../../assets/img/icons/ListView.svg';
import CheckGreen from '../../assets/img/icons/check_green.svg';

// NFT's
import NFT_1 from '../../assets/img/nfts/nft_1.png';
import NFT_2 from '../../assets/img/nfts/nft_2.png';
import NFT_3 from '../../assets/img/nfts/nft_3.png';
import NFT_4 from '../../assets/img/nfts/nft_4.png';
import NFT_5 from '../../assets/img/nfts/nft_5.png';
import NFT_6 from '../../assets/img/nfts/nft_6.png';
import NFT_7 from '../../assets/img/nfts/nft_7.png';
import NFT_8 from '../../assets/img/nfts/nft_8.png';
import NFT_9 from '../../assets/img/nfts/nft_9.png';

// Chain
import Avalanche from '../../assets/img/chain/Avalanche.svg';
import Close from '../../assets/img/icons/close.svg';
import InfLith from '../../assets/img/icons/infoLifht.svg';
import INF from '../../assets/img/icons/Inf.svg';

import RedClose from '../../assets/img/icons/RedClose.svg';

import NFTdetails from '../NFTdetails';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedNFTList }  from "../../store/reducers/generalSlice"
import NFTempty from './NFTempty';
import NFT from './NFT';

function NFTgridView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)

    useEffect(() => { }, [selectedNFTs])

    return (
        <div className="nftListBox">
            <div className="row">
                { nfts ? nfts.map( (nft, i) => <NFT nft={nft} index={i} />) : <NFTempty /> }
                {/* <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="singleNft  nftSelect">
                        <div className="nftImageBox">
                            <span className="selectNft"><img src={CheckGreen} /></span>
                            <span className="nftImage"><img src={NFT_2} /></span>
                        </div>
                        <div className="nftCont">
                            <span className="nftName">TheMonaLana <NFTdetails/></span>
                            <span className="nftNumber">784</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default NFTgridView;
