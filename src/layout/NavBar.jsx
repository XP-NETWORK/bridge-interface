import React from 'react'
import Logo from '../assets/img/nav/Logo.svg';
import Start from '../assets/img/nav/star_menu.svg';

import { Navbar, Container, Brand, Toggle, Collapse, Nav, Link, NavDropdown, Item,   Image, Modal, Button, Header, Title, Body } from "react-bootstrap";


function NavBar() {
    return (
        <header className="HeaderArea" id="Header"> 
            <Navbar expand="lg">
                <Navbar.Brand href="#home" className="navBrand"><img src={Logo} alt="Xp Network" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navMenu">
                        <Nav.Link href="#home">About</Nav.Link>
                        <Nav.Link href="#link">Docs</Nav.Link>
                        <Nav.Link href="#link">FAQs</Nav.Link>
                        <Nav.Link href="#link"><img src={Start} /> Get Featured</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavBar
