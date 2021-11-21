import Search from '../assets/img/icons/Search.svg';
import { chains }from '../components/values'
import Etherium from '../assets/img/chain/Etherium.svg';
import Heco from '../assets/img/chain/Heco.svg';
import Elrond from '../assets/img/chain/Elrond.svg';
import Binance from '../assets/img/chain/Binance.svg';
import Cardano from '../assets/img/chain/Cardano.svg';
import Algorand from '../assets/img/chain/Algarand.svg';
import Tron from "../assets/img/chain/Tron.svg"
import Polygon from "../assets/img/chain/Polygon.svg"
import Avalanche from "../assets/img/chain/Avalanche.svg"
import Fantom from "../assets/img/chain/Fantom.svg"
import Xdai from "../assets/img/chain/Xdai.svg"
import Solana from "../assets/img/chain/Solana.svg"

export default function NFTChainListBox() {
    return (
        <div className="nftChainListBox">
        <form action="#">
            <div className="searchChain">
                <input type="search" placeholder="Search" />
                <button type="submit"><img src={Search} alt="" /></button>
            </div>
        </form>
        <ul className="nftChainList scrollSty">
            { chains ? chains.map( chain => { 
                const { image, text, key, value, coming } = chain;
                return ( 
                <li className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
                    <div className="modalSelectOptionsText">
                        {text}
                    </div>
                </li>)
             } ) : "" }            
        </ul> 
    </div>
    )
}
