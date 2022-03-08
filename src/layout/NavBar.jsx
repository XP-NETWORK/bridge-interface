import { useEffect } from 'react';
import Logo from "../assets/img/nav/newXpLogo.svg"
import burger from "../assets/img/nav/burger.svg"
import AccountModal from "../components/AccountModal"
import { Navbar, Nav, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setAccountModal, setReset } from '../store/reducers/generalSlice';
import "./NavBar.css"

function NavBar() {

    const dispatch = useDispatch()
    const account = useSelector(state => state.general.account)
    const tronAccount = useSelector(state => state.general.tronWallet)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const from = useSelector(state => state.general.from)

    const widget = useSelector(state => state.general.widget)
    const handleShow = () => dispatch(setAccountModal(true));
    const step = useSelector(state => state.general.step)
    const testnet = useSelector(state => state.general.testNet)

    useEffect(() => {}, [step])

    

    const setAddress = () => {
        return  from?.type === "EVM" ? account 
            : from?.type === "Tezos" ? tezosAccount 
            : from?.type === "Algorand" ? algorandAccount 
            : from?.type === "Elrond" ? elrondAccount 
            : from?.type === "Tron" ? tronAccount 
            : undefined
    }

    return (
        !widget && <header id="Header"> 
            <Navbar expand="lg">    
                <Navbar.Brand onClick={() => dispatch(setReset())}  >
                    <img src={Logo} alt="Xp Network"/>
                    <div >MULTICHAIN NFT BRIDGE</div>
                    { testnet && <span className="testnet">TestNet</span>}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="" />
                    <Navbar.Collapse id="">
                        <Nav>
                            <Nav.Link  target="_blank" href="https://xp.network/">Home</Nav.Link>
                            <Nav.Link  target="_blank" href="https://docs.xp.network/">Docs</Nav.Link>
                            <Nav.Link  target="_blank" href="https://stake.xp.network">Staking</Nav.Link>
                            {/* <div className='navbar-connect'>Connect Wallet</div> */}
                            {/* { setAddress() && 
                            <Nav.Link onClick={handleShow}>
                                <div className="account__box">
                                    {setAddress() ?`${setAddress().substring(0, window.innerWidth <= 600 ? 16 : 10)}...${setAddress().substring(setAddress().length - 2)}`:''} 
                                    <img src={NftSelect} alt='' />
                                </div>
                            </Nav.Link>
                            } */}
                        </Nav>
                    </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar
