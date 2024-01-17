import Logo from "../assets/img/nav/newXpLogo.svg";
import AccountModal from "..//components/Modals/AccountModal/AccountModal";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import { LinkContainer } from "react-router-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import faq from "../assets/img/nav/faq.svg";
import docs from "../assets/img/nav/doc_icon.svg";
import github from "../assets/img/nav/github.svg";
import video from "../assets/img/nav/vid.svg";
import xpnet from "../assets/img/nav/xpnet.svg";
import message from "../assets/img/nav/helper.svg";
// import deposits from "../assets/img/nav/deposites.svg";
import security from "../assets/img/nav/security.svg";
import UserConnect from "../components/User/UserConnect";
import { setSearchNFTList, setShowVideo } from "../store/reducers/generalSlice";
import { ReactComponent as Hamburger } from "../assets/img/nav/burger.svg";
import { ReactComponent as HamburgerClose } from "../assets/img/nav/burger_close.svg";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
    cleanSelectedNFTList,
    setReceiver,
} from "../store/reducers/generalSlice";
// import { biz } from "../components/values";
import Network from "./Network";
import { googleAnalyticsCategories, handleGA4Event } from "../services/GA4";

function NavBar() {
    const widget = useSelector((state) => state.general.widget);
    const testnet = useSelector((state) => state.general.testNet);
    // const staging = useSelector((state) => state.general.staging);

    const date = useSelector((state) => state.general.gitLatestCommit);
    const [navMenuOpen, toggleNavMenu] = useState(false);
    const dispatch = useDispatch();
    const loc = useLocation();

    const handleEventsForAnalytics = (e) => {
        handleGA4Event(googleAnalyticsCategories.Button, e);
    };

    useEffect(() => {
        if (loc.pathname === "/connect") {
            dispatch(cleanSelectedNFTList());
            dispatch(setReceiver(""));
        }
        dispatch(setSearchNFTList(""));
    }, [loc]);

    return (
        !widget && (
            <header id="Header">
                <Navbar expand="lg">
                    <LinkContainer
                        to={testnet ? "/testnet/connect" : "/connect"}
                    >
                        <Navbar.Brand>
                            <img src={Logo} alt="Xp Network" />
                            <div>MULTICHAIN NFT BRIDGE</div>
                            <Network />
                        </Navbar.Brand>
                    </LinkContainer>
                    {/* <UserConnect desktop={true} /> */}
                    <UserConnect mobile={true} />
                    {navMenuOpen ? (
                        <>
                            <HamburgerClose
                                className="svgWidget hamburgerToggle xmobile_only"
                                onClick={() => {
                                    document
                                        .querySelector(
                                            ".navbar-collapse.collapse"
                                        )
                                        .classList.remove("show");
                                    toggleNavMenu(false);
                                }}
                            />{" "}
                            <div
                                className="navbaroverlay"
                                onClick={() => {
                                    document
                                        .querySelector(
                                            ".navbar-collapse.collapse"
                                        )
                                        .classList.remove("show");
                                    toggleNavMenu(false);
                                }}
                            >
                                {" "}
                            </div>
                        </>
                    ) : (
                        <Hamburger
                            className="svgWidget hamburgerToggle xmobile_only"
                            onClick={() => {
                                document
                                    .querySelector(".navbar-collapse.collapse")
                                    .classList.add("show");
                                toggleNavMenu(true);
                            }}
                        />
                    )}
                    <Navbar.Toggle
                        aria-controls=""
                        className="navbarToggleMoblie"
                    />

                    <Navbar.Collapse id="" style={{ marginLeft: "10px" }}>
                        <Nav>
                            {/* <LinkContainer to='/connect'>
                                <Nav.Link className="desc-link" target="_blank" href="#">Bridge</Nav.Link>
                            </LinkContainer> */}
                            {/* <Nav.Link
                                target="_blank"
                                href="https://bridge-explorer.xp.network/"
                            >
                                <div className="nav-link__icon">
                                    <img src={explorer} alt="" />
                                </div>
                                <div className="nav-link__txt">Explorer</div>
                            </Nav.Link> */}
                            {/* <Nav.Link
                                className="mob-link"
                                target="_blank"
                                href="https://bridge-explorer.xp.network/"
                            >
                                <div className="nav-link__icon">
                                    <img src={explorer} alt="" />
                                </div>
                                <div className="nav-link__txt">Explorer</div>
                            </Nav.Link> */}
                            {/* {!testnet && biz && (
                                <LinkContainer to={"discounts"}>
                                    <Nav.Link>
                                        <div className="nav-link__icon">
                                            <img src={deposits} alt="" />
                                        </div>
                                        <div className="nav-link__txt">
                                            Discounts
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>
                            )} */}
                            <a
                                rel="noreferrer"
                                className="nav-link help-center"
                                target="_blank"
                                href="https://t.me/XP_NETWORK_Technical_Support"
                                onClick={() =>
                                    handleEventsForAnalytics("Help Center")
                                }
                            >
                                <div className="nav-link__icon">
                                    <img src={message} alt="" />
                                </div>
                                <div className="nav-link__txt">Help Center</div>
                            </a>
                            <Nav.Link
                                className="mob-link"
                                target="_blank"
                                href="https://docs.xp.network/docs/Multibridge2.0/faq"
                                onClick={() => handleEventsForAnalytics("FAQ")}
                            >
                                <div className="nav-link__icon">
                                    <img src={faq} alt="" />
                                </div>
                                <div className="nav-link__txt">FAQ</div>
                            </Nav.Link>
                            <Nav.Link
                                className="mob-link"
                                target="_blank"
                                href="https://docs.xp.network/docs/Multibridge2.0/bridge_security/"
                                onClick={() =>
                                    handleEventsForAnalytics("Bridge Security")
                                }
                            >
                                <div className="nav-link__icon">
                                    <img src={security} alt="" />
                                </div>
                                <div className="nav-link__txt">
                                    Bridge Security
                                </div>
                            </Nav.Link>
                            <Nav.Link
                                className="mob-link"
                                target="_blank"
                                href="https://docs.xp.network/"
                                onClick={() => handleEventsForAnalytics("Docs")}
                            >
                                <div className="nav-link__icon">
                                    <img src={docs} alt="" />
                                </div>
                                <div className="nav-link__txt">DOCS</div>
                            </Nav.Link>
                            <Nav.Link
                                className="mob-link"
                                target="_blank"
                                href="https://github.com/xp-network/"
                                onClick={() =>
                                    handleEventsForAnalytics("Github")
                                }
                            >
                                <div className="nav-link__icon">
                                    <img src={github} alt="" />
                                </div>
                                <div className="nav-link__txt ">
                                    <span>GitHub</span>
                                    {date && (
                                        <div className="latest">
                                            <div className="latest__spot"></div>
                                            <div className="latest__date">
                                                {date}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Nav.Link>
                            <Nav.Link
                                className="mob-link"
                                target="_blank"
                                href="#"
                                onClick={() => {
                                    handleEventsForAnalytics(
                                        "NavBar Video Tutorial"
                                    );
                                    dispatch(setShowVideo(true));
                                }}
                            >
                                <div className="nav-link__icon">
                                    <img src={video} alt="" />
                                </div>
                                <div className="nav-link__txt">
                                    Video Tutorial
                                </div>
                            </Nav.Link>
                            <Nav.Link
                                className="mob-link"
                                target="_blank"
                                href="https://xp.network/"
                            >
                                <div className="nav-link__icon">
                                    <img src={xpnet} alt="" />
                                </div>
                                <div className="nav-link__txt">XP.NETWORK</div>
                            </Nav.Link>
                            <UserConnect />
                            <Dropdown className="navbar-dropdown">
                                <DropdownToggle>
                                    <div className="navbar-dropdown__btn">
                                        {navMenuOpen ? (
                                            <>
                                                <div
                                                    className="navbaroverlay"
                                                    onClick={() =>
                                                        toggleNavMenu(false)
                                                    }
                                                ></div>{" "}
                                                <HamburgerClose
                                                    className="svgWidget"
                                                    alt="burgerClose"
                                                    onClick={() =>
                                                        toggleNavMenu(
                                                            navMenuOpen
                                                                ? false
                                                                : true
                                                        )
                                                    }
                                                />{" "}
                                            </>
                                        ) : (
                                            <Hamburger
                                                className="svgWidget"
                                                alt="burger"
                                                onClick={() =>
                                                    toggleNavMenu(
                                                        navMenuOpen
                                                            ? false
                                                            : true
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </DropdownToggle>
                                <Dropdown.Menu>
                                    <div onClick={() => toggleNavMenu(false)}>
                                        {/* <Dropdown.Item
                                            href="https://bridge-explorer.xp.network/"
                                            target="-blank"
                                        >
                                            <div className="drop-item">
                                                <img src={explorer} alt="" />
                                                <div className="drop-icon">
                                                    Explorer
                                                </div>
                                            </div>
                                        </Dropdown.Item> */}
                                        <Dropdown.Item
                                            href="https://github.com/xp-network/"
                                            target="_blank"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleEventsForAnalytics(
                                                        "Burger Github"
                                                    )
                                                }
                                                className="drop-item"
                                            >
                                                <img src={github} alt="" />
                                                <div className="drop-git">
                                                    <span>GitHub</span>
                                                    {date && (
                                                        <div className="latest">
                                                            <div className="latest__spot"></div>
                                                            <div className="latest__date">
                                                                {date}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="https://docs.xp.network/docs/Multibridge2.0/bridge_security/"
                                            target="_blank"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleEventsForAnalytics(
                                                        "Burger Bridge Security"
                                                    )
                                                }
                                                className="drop-item"
                                            >
                                                <img src={security} alt="" />
                                                <div className="drop-git">
                                                    <span>Bridge Security</span>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="https://docs.xp.network/docs/Multibridge2.0/faq"
                                            target="_blank"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleEventsForAnalytics(
                                                        "Burger FAQ"
                                                    )
                                                }
                                                className="drop-item"
                                            >
                                                <img src={faq} alt="" />
                                                <div className="drop-icon">
                                                    FAQs
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="https://docs.xp.network/"
                                            target="_blank"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleEventsForAnalytics(
                                                        "Burger docs"
                                                    )
                                                }
                                                className="drop-item"
                                            >
                                                <img src={docs} alt="" />
                                                <div className="drop-icon">
                                                    DOCs
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                dispatch(setShowVideo(true))
                                            }
                                        >
                                            <div
                                                onClick={() =>
                                                    handleEventsForAnalytics(
                                                        "Burger tutorial"
                                                    )
                                                }
                                                className="drop-item"
                                            >
                                                <img src={video} alt="" />
                                                <div className="drop-icon">
                                                    Video Tutorial
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="https://xp.network/"
                                            target="_blank"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleEventsForAnalytics(
                                                        "Burger website"
                                                    )
                                                }
                                                className="drop-item"
                                            >
                                                <img src={xpnet} alt="" />
                                                <div className="drop-icon">
                                                    XP.NETWORK
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="https://t.me/XP_NETWORK_Technical_Support"
                                            target="_blank"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleEventsForAnalytics(
                                                        "Burger Help Center"
                                                    )
                                                }
                                                className="drop-item"
                                            >
                                                <img src={message} alt="" />
                                                <div className="drop-icon">
                                                    Help Center
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <AccountModal />
                </Navbar>
            </header>
        )
    );
}

export default NavBar;
