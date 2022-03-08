import { useEffect } from 'react';
import Logo from "../assets/img/nav/newXpLogo.svg"
import burger from "../assets/img/nav/burger.svg"
import AccountModal from "../components/AccountModal"
import { Navbar, Nav, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setAccountModal, setReset, setWalletsModal } from '../store/reducers/generalSlice';
import "./NavBar.css"
import { useWeb3React } from '@web3-react/core';
import Identicon from '../components/Identicon';

function NavBar() {
    const dispatch = useDispatch()
    const widget = useSelector(state => state.general.widget)
    const handleShow = () => dispatch(setAccountModal(true));
    const step = useSelector(state => state.general.step)
    const testnet = useSelector(state => state.general.testNet)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tezosAccount = useSelector(state => state.general.tezosAccount)
    const { chainId, account } = useWeb3React();

    const walletAccount = account || elrondAccount || tezosAccount

    const handleConnect = () => {
        dispatch(setWalletsModal(true))
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
                            <div onClick={handleConnect} className='navbar-connect'>
                                {walletAccount ? `${walletAccount.substring(0, window.innerWidth <= 600 ? 16 : 10)}...${walletAccount.substring(walletAccount.length - 2)}` : "Connect Wallet"}
                                {walletAccount && <Identicon account={walletAccount} />}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                <AccountModal />
            </Navbar>
        </header>
    )
}

export default NavBar
