import React, { useEffect, useState } from 'react';
import Logo from '../assets/img/nav/Logo.svg';
import NftSelect from '../assets/img/nftselect.svg';
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

    useEffect(() => {}, [step])

    const setAddress = () => {
        return elrondAccount || tronAccount || account
    }

    return (
        <header className="HeaderArea" id="Header"> 
            <Navbar expand="md">
                <Navbar.Brand 
                onClick={() => dispatch(setReset())}  
                className="navBrand"><img src={Logo} alt="Xp Network" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navMenu">
                        <Nav.Link className="navMenu__link" target="_blank" href="https://xp.network/">Home</Nav.Link>
                        <Nav.Link className="navMenu__link" target="_blank" href="https://docs.xp.network/">Docs</Nav.Link>
                        {/* <Nav.Link className="" target="_blank" href="https://xp.network/api/">Bridge API</Nav.Link> */}
                        <Nav.Link className="navMenu__link" target="_blank" href="https://stake.xp.network">Staking</Nav.Link>
                        <Nav.Link className="navMenu__link" target="_blank" href="https://blog.xp.network/">Blog</Nav.Link>
                        { setAddress() ? 
                            <Nav.Link className="nftConnect navMenu__link" onClick={handleShow}>
                                {setAddress() ?`${setAddress().substring(0, 6)}...${setAddress().substring(setAddress().length - 2)}`:''} 
                                <img src={NftSelect} />
                            </Nav.Link> :''}
                    </Nav>
                </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar
