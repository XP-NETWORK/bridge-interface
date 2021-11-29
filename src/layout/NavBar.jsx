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
import info from "../assets/img/icons/infoInactive.svg"
import infoHover from "../assets/img/icons/infoActive.svg" 
import faq from "../assets/img/icons/faqsInactive.svg"
import faqHover from "../assets/img/icons/faqsActive.svg"
import docs from "../assets/img/icons/docsInactive.svg"
import docsHover from "../assets/img/icons/docsActive.svg"
import feat from "../assets/img/icons/featuredInactive.svg"
import featHover from "../assets/img/icons//featuredActive.svg"


function NavBar() {

    // const [infHover, setInfHover] = useState(false)
    // const [faqHover, setFaqHover] = useState(false)
    // const [docHover, setDocsHover] = useState(false)
    // const [featHover, setFeatHover] = useState(false)

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
                        <Nav.Link href="#home"><img className="nav-icon" src={infoHover} />About</Nav.Link>
                        <Nav.Link href="#Docs"><img className="nav-icon" src={docsHover} />Docs</Nav.Link>
                        <Nav.Link href="#FAQs"><img className="nav-icon" src={faqHover} />FAQs</Nav.Link>
                        <Nav.Link href="#GetFeatured"><img className="nav-icon" src={featHover} /> Get Featured</Nav.Link>
                        { setAddress() ? <Nav.Link href="#NFT" className="nftConnect" onClick={handleShow}>{setAddress() ?`${setAddress().substring(0, 6)}...${setAddress().substring(setAddress().length - 2)}`:''} <img src={NftSelect} /></Nav.Link> :''}
                    </Nav>
                </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar
