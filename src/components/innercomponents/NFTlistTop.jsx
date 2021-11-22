import React from 'react'
import { Dropdown } from "react-bootstrap";
import BSC from '../../assets/img/chain/Binance.svg';
import Search from '../../assets/img/icons/Search.svg';
import ListView from '../../assets/img/icons/ListView.svg';
import { useDispatch } from 'react-redux';
import { setSearchNFTList } from "../../store/reducers/generalSlice"

function NFTlistTop() {
    const dispatch = useDispatch()
    const handleSearch = e => {
        dispatch(setSearchNFTList(e.target.value))
    }
    return (
        <div className="nftListTop">
            <div className="yourNft desktopOnly">
                Your NFTs on <span><img src={BSC} alt="NFT Name" /> BSC</span>
            </div>
            <div className="mobileOnly seleNftMob">
                Select NFT <span>/ 12</span>
            </div>
            <div className="nftTopRIght">
                <div className="searchNft desktopOnly">
                    <Dropdown className="SearchDrop">
                        <Dropdown.Toggle id="SearchDrop" >
                            <img src={Search} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <form action="#">
                                <input onChange={e => handleSearch(e)}  type="search" placeholder="Search NFT" />
                                <button type="button"><img src={Search} /></button>
                            </form>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="nftViewBtn">
                    <span className="ListView"><img src={ListView} /></span>
                </div>
                <div className="selectAll">
                    Select All
                </div>
            </div>
            <div className="mobileOnly mobSearch">
                <form action="#">
                    <input type="search" placeholder="Search NFT" />
                    <button type="button"><img src={Search} /></button>
                </form>
            </div>
        </div>
    )
}

export default NFTlistTop;
