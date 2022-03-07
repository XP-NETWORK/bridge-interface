import ConnectWallet from "./Wallet/ConnectWallet"
import { useSelector } from 'react-redux';
import ChainSelectBox from "./Chains/ChainSelectBox"

function NftSelect() {
    const {widget} = useSelector(s => s.general)
    return (
        <div className="NftSelect">
            <div className="nftSlectArea">
                <ChainSelectBox />
                <ConnectWallet/>
            </div>
        </div>
    )
}

export default NftSelect
