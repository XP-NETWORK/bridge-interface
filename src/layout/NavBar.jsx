import React, { useEffect, useState } from 'react';
import Logo from '../assets/img/nav/Logo.svg';
import Start from '../assets/img/nav/star_menu.svg';
import Hambar from '../assets/img/icons/Hambar.svg';
import NftSelect from '../assets/img/nftselect.svg';
import Close from '../assets/img/icons/close.svg';
import FileCopy from '../assets/img/icons/FileCopy.svg';
import AccountModal from "../components/AccountModal"
import { Navbar, Nav, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setAccountModal, setReset } from '../store/reducers/generalSlice';



function NavBar() {
    const dispatch = useDispatch()
    const account = useSelector(state => state.general.account)
    const tronAccount = useSelector(state => state.general.tronWallet)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const handleShow = () => dispatch(setAccountModal(true));
    const step = useSelector(state => state.general.step)
        const [copied, setCopy] = useState()

    useEffect(() => {}, [step])

    const setAddress = () => {
        return elrondAccount || tronAccount || account
    }

    return (
        <header className="HeaderArea" id="Header"> 
            <Navbar expand="md">
                <Navbar.Brand onClick={() => dispatch(setReset())} href="#home" className="navBrand"><img src={Logo} alt="Xp Network" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navMenu">
                        <Nav.Link href="#home">About</Nav.Link>
                        <Nav.Link href="#Docs">Docs</Nav.Link>
                        <Nav.Link href="#FAQs">FAQs</Nav.Link>
                        <Nav.Link href="#GetFeatured"><img src={Start} /> Get Featured</Nav.Link>
                        { setAddress() ? <Nav.Link href="#NFT" className="nftConnect" onClick={handleShow}>{setAddress() ?`${setAddress().substring(0, 6)}...${setAddress().substring(setAddress().length - 2)}`:''} <img src={NftSelect} /></Nav.Link> :''}
                    </Nav>
                </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar
