import Logo from "../assets/img/nav/newXpLogo.svg"
import AccountModal from "..//components/Modals/AccountModal/AccountModal"
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import "./NavBar.css"
import {LinkContainer} from 'react-router-bootstrap'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import about from "../assets/img/nav/about.svg"
import chains from "../assets/img/nav/chains.svg"
import faq from "../assets/img/nav/faq.svg"
import docs from "../assets/img/nav/docs.svg"
import github from "../assets/img/nav/github.svg"
import video from "../assets/img/nav/vid.svg"
import xpnet from "../assets/img/nav/xpnet.svg"
import UserConnect from "../components/User/UserConnect";
import { setShowVideo } from "../store/reducers/generalSlice";

function NavBar() {
    const widget = useSelector(state => state.general.widget)
    const testnet = useSelector(state => state.general.testNet)
    const dispatch = useDispatch()
    return (
        !widget && <header id="Header"> 
            <Navbar expand="lg">    
            <LinkContainer to="/connect">
                <Navbar.Brand>
                    <img src={Logo} alt="Xp Network"/>
                    <div>MULTICHAIN NFT BRIDGE</div>
                    { testnet && <span className="testnet">TestNet</span>}
                </Navbar.Brand>
            </LinkContainer>
            <UserConnect desktop={false} />
                <Navbar.Toggle aria-controls="" />
                    <Navbar.Collapse id="">
                        <Nav>
                            <LinkContainer to='/connect'>
                                <Nav.Link className="desc-link" target="_blank" href="#">Bridge</Nav.Link>
                            </LinkContainer>
                            {/* <Nav.Link target="_blank" href="#">
                                <div className="nav-link__icon"><img src={about} alt="" /></div>
                                <div className="nav-link__txt">About</div>
                            </Nav.Link> */}
                            {/* <Nav.Link target="_blank" href="##">
                                <div className="nav-link__icon"><img src={chains} alt="" /></div>
                                <div className="nav-link__txt">Explorer</div>
                            </Nav.Link> */}
                            <Nav.Link  target="_blank" href="https://docs.xp.network/docs/Multibridge2.0/faq">
                                <div className="nav-link__icon"><img src={faq} alt="" /></div>
                                <div className="nav-link__txt">FAQ</div>
                            </Nav.Link>
                            <Nav.Link className="mob-link" target="_blank" href="https://docs.xp.network/">
                                <div className="nav-link__icon"><img src={docs} alt="" /></div>
                                <div className="nav-link__txt">DOCS</div>
                            </Nav.Link>
                            <Nav.Link className="mob-link" target="_blank" href="#####">
                                <div className="nav-link__icon"><img src={github} alt="" /></div>
                                <div className="nav-link__txt">
                                    GitHub
                                </div>
                            </Nav.Link>
                            <Nav.Link className="mob-link" target="_blank" href="#">
                                <div className="nav-link__icon"><img src={video} alt="" /></div>
                                <div className="nav-link__txt">
                                    Video Tutorial
                                </div>
                            </Nav.Link>
                            <Nav.Link className="mob-link" target="_blank" href="#">
                                <div className="nav-link__icon"><img src={xpnet} alt="" /></div>
                                <div className="nav-link__txt">
                                    XP.NETWORK
                                </div>
                            </Nav.Link>
                            <UserConnect desktop={true} />
                            <Dropdown className='navbar-dropdown'>
                                <DropdownToggle><div className='navbar-dropdown__btn'></div></DropdownToggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <div className="drop-item">
                                            <img src={about} alt="" />
                                            <div className="drop-icon">About</div>
                                        </div></Dropdown.Item>
                                    <Dropdown.Item href="https://docs.xp.network/docs/Multibridge2.0/faq" target="_blank">
                                        <div className="drop-item">
                                            <img src={faq} alt="" />
                                            <div className="drop-icon">FAQs</div>
                                        </div></Dropdown.Item>
                                    <Dropdown.Item href="https://docs.xp.network/" target="_blank">
                                        <div className="drop-item">
                                            <img src={docs} alt="" />
                                            <div className="drop-icon">DOCs</div>
                                        </div></Dropdown.Item>
                                    <Dropdown.Item>
                                        <div onClick={() => dispatch(setShowVideo(true))} className="drop-item">
                                            <img src={video} alt="" />
                                            <div className="drop-icon">Video Tutorial</div>
                                        </div></Dropdown.Item>
                                    <Dropdown.Item href="https://xp.network/" target="_blank">
                                        <div className="drop-item">
                                            <img src={xpnet} alt="" />
                                            <div className="drop-icon">XP.NETWORK</div>
                                        </div></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar
