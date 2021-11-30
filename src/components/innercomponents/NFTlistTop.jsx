import React, { useEffect, useState } from 'react'
import { Dropdown, Modal } from "react-bootstrap";
import BSC from '../../assets/img/chain/Binance.svg';
import Search from '../../assets/img/icons/Search.svg';
import ListView from '../../assets/img/icons/ListView.svg';
import GridView from "../../assets/img/icons/GridView.svg"
import { useDispatch } from 'react-redux';
import { setSearchNFTList, allSelected, setNFTsListView, setTo, setSwitchDestination, cleanSelectedNFTList } from "../../store/reducers/generalSlice"
import { useSelector } from 'react-redux';
import SelectDestination from '../SelectDestination';
import NFTChainListBox from '../NFTChainListBox';
import Close from '../../assets/img/icons/close.svg';


function NFTlistTop() {
    const dispatch = useDispatch()
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const NFTListView = useSelector(state => state.general.NFTListView)
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const from = useSelector(state => state.general.from)
    const switchDestination = useSelector(state => state.general.switchDestination)

    const handleSearch = e => {
        dispatch(setSearchNFTList(e.target.value))
    }

    const handleClose = () => {
        dispatch(setSwitchDestination(false))
    }

    const handleView = () => {
        dispatch(setNFTsListView())
    }

    return (
        <div className="nftListTop">
            <Modal animation={false} show={switchDestination} onHide={() => handleClose()} className="ChainModal">
                <Modal.Header className="text-left">
                    <Modal.Title>Change destination chain</Modal.Title>
                    <span className="CloseModal" onClick={() => handleClose()}>
                        <img src={Close} alt="" />
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <NFTChainListBox />
                </Modal.Body>
            </Modal>
            <div className="yourNft desktopOnly">
                Your NFTs on <span><img src={from.image.src} alt="NFT Name" /> {from.key}</span>
            </div>
            <div className="mobileOnly seleNftMob">
                Select NFTs <span>{ nfts?.length }</span>
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
                <div onClick={() => handleView()} className="nftViewBtn">
                    { NFTListView ? 
                        <span  className="ListView"><img src={GridView} /></span>
                    :
                        <span  className="ListView"><img src={ListView} /></span>
                    }
                </div>
                { nfts?.length === selectedNFTs?.length ? 
                    <div onClick={() => dispatch(cleanSelectedNFTList())} className="selectAll">Clear all</div>
                :   
                    <div stye={ nfts ? {} : OFF } onClick={() => dispatch(allSelected())} className="selectAll">
                        Select all
                    </div>
                }
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
