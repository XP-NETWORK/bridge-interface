import React, { useEffect, useRef, useState } from 'react'
import { Navbar, Nav, Modal } from "react-bootstrap";
import Logo from '../assets/img/nav/Logo.svg';
import Start from '../assets/img/nav/star_menu.svg';
import Hambar from '../assets/img/icons/Hambar.svg';
import NftSelect from '../assets/img/nftselect.svg';
import Close from '../assets/img/icons/close.svg';
import FileCopy from '../assets/img/icons/FileCopy.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAccountModal, setReset } from '../store/reducers/generalSlice';
import { DetectOutsideClick } from "../components/helpers"


export default function AccountModal() {
    // const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const account = useSelector(state => state.general.account)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const MetaMask = useSelector(state => state.general.MetaMask)
    const onMaiar = useSelector(state => state.general.onMaiar)
    const show = useSelector(state => state.general.accountModal)
    const step = useSelector(state => state.general.step)
    const handleClose = () => dispatch(setAccountModal(false))
    const accountModal = useRef()
    const handleDisconnect = () => {
        dispatch(setReset())
    }

    DetectOutsideClick(accountModal, () => setTimeout(() => handleClose(), 100));



    return (
    <div ref={accountModal} className="accountBox" show={show} onHide={handleClose} >
        <div className="accountTit">
            Account <span className="CloseModal" onClick={handleClose}> <img src={Close}/> </span>
        </div>
        <p className="">{`Connected with ${MetaMask ? 'MetaMask' : onMaiar ? "Maiar Wallet" : ''}`}</p>
        <div className="nftLink">
            <img src={NftSelect} />
            {account ?`${account.substring(0, 10)}...${account.substring(account.length - 2)}` : elrondAccount ? `${elrondAccount.substring(0, 10)}...${elrondAccount.substring(elrondAccount.length - 2)}`: ''}
            <span className="copyTokk"><img src={FileCopy} /></span>
        </div>
        <div className="accountBtn">
            <a href="#" className="changeBtn">Change</a>
            <a onClick={() => handleDisconnect()} href="#" className="changeBtn">Disconnect</a>
        </div>
    </div>
    )
}
