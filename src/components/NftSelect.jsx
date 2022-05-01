import ConnectWallet from "./Wallet/ConnectWallet"
import ChainSelectBox from "./Chains/ChainSelectBox"

function NftSelect() {
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
