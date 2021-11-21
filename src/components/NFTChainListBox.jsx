import Ethereum from '../assets/img/chain/Etherium.svg';
import HECO from '../assets/img/chain/HECO.svg';
import Elrond from '../assets/img/chain/Elrond.svg';
import BSC from '../assets/img/chain/Binance.svg';
import Cardano from '../assets/img/chain/Cardano.svg';
import Algorand from '../assets/img/chain/Algarand.svg';
import Search from '../assets/img/icons/Search.svg';

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
            <li className="nftChainItem"><img src={Ethereum} /> Ethereum</li>
            <li className="nftChainItem"><img src={BSC} /> BSC</li>
            {/* <li className="nftChainItem"><img src={Tron} /> Tron</li> */}
            <li className="nftChainItem"><img src={Elrond} /> Elrond</li>
            {/* <li className="nftChainItem"><img src={Polygon} /> Polygon</li> */}
            {/* <li className="nftChainItem"><img src={Avalanche} /> Avalanche</li> */}
            {/* <li className="nftChainItem"><img src={Fantom} /> Fantom</li> */}
            <li className="nftChainItem"><img src={Algorand} /> Algorand</li>
            {/* <li className="nftChainItem"><img src={xDai} /> xDai</li> */}
            {/* <li className="nftChainItem"><img src={Solana} /> Solana</li> */}
            <li className="nftChainItem"><img src={Cardano} /> Cardano</li>
            <li className="nftChainItem"><img src={HECO} /> HECO</li>
        </ul> 
    </div>
    )
}
