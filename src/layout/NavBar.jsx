import React, { useState } from 'react';
import Logo from '../assets/img/nav/Logo.svg';
import Start from '../assets/img/nav/star_menu.svg';
import Hambar from '../assets/img/icons/Hambar.svg';
import NftSelect from '../assets/img/nftselect.svg';
import Close from '../assets/img/icons/close.svg';
import FileCopy from '../assets/img/icons/FileCopy.svg';

import { Navbar, Nav, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';


function NavBar() {

    const [show, setShow] = useState(false);
    const account = useSelector(state => state.general.account)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <header className="HeaderArea" id="Header"> 
            <Navbar expand="md">
                <Navbar.Brand href="#home" className="navBrand"><img src={Logo} alt="Xp Network" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navMenu">
                        <Nav.Link href="#home">About</Nav.Link>
                        <Nav.Link href="#Docs">Docs</Nav.Link>
                        <Nav.Link href="#FAQs">FAQs</Nav.Link>
                        <Nav.Link href="#GetFeatured"><img src={Start} /> Get Featured</Nav.Link>
                        <Nav.Link href="#NFT" className="nftConnect" onClick={handleShow}>{account ?`${account.substring(0, 6)}...${account.substring(account.length - 2)}`:''} <img src={NftSelect} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavBar
