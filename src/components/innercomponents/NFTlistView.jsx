import SelectedNFT_1 from '../../assets/img/nfts/SelectedNFT_1.png';
import SelectedNFT_2 from '../../assets/img/nfts/SelectedNFT_2.png';
import SelectedNFT_3 from '../../assets/img/nfts/SelectedNFT_3.png';
import SelectedNFT_4 from '../../assets/img/nfts/SelectedNFT_4.png';
import SelectedNFT_5 from '../../assets/img/nfts/SelectedNFT_5.png';
import Close from '../../assets/img/icons/close.svg';
import NFTdetails from '../NFTdetails';
import { useSelector } from 'react-redux';

function NFTlistView() {
    const nfts = useSelector(state => state.general.NFTList)
    const selectedNFTs = useSelector(state => state.general.selectedNFTList)
    const search = useSelector(state => state.general.NFTListSearch)

    return (
        <div className="nftListBox nftListView">
            <ul className="nftSelected">
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                {/* <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_3} alt="NFT" /> 333333 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_4} alt="NFT" /> 2222 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_5} alt="NFT" /> name 111 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_1} alt="NFT" /> 77777 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li>
                <li className="nftSelecItem">
                    <img src={SelectedNFT_2} alt="NFT" /> 99999 NFT <NFTdetails/> <span className="Close"><img src={Close} /></span>
                </li> */}
            </ul>
        </div>
    )
}

export default NFTlistView;
