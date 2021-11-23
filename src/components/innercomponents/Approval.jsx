import React from 'react'
import { useSelector } from 'react-redux';
import InfLith from '../../assets/img/icons/infoLifht.svg';
import { ChainFactoryConfigs,    ChainFactory } from "xp.network/dist";
import {Chain, Config} from 'xp.network/dist/consts';
import { Wallet, Web3Provider } from "ethers";
import { ethers } from "ethers";

function Approval() {
    
    const from = useSelector(state => state.general.from)
    const account = useSelector(state => state.general.account)
    const selectedNFTList = useSelector(state => state.general.selectedNFTList)
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const mainnetConfig = ChainFactoryConfigs.MainNet;
    const factory = ChainFactory(Config, mainnetConfig());
    const handleChainFactory = async () => {
        // debugger
        let chain
        from.key === "Ethereum" ? chain = await factory.inner(Chain.ETHEREUM) : 
        from.key === "BSC" ? chain = await factory.inner(Chain.BSC) :
        from.key === "Tron" ? chain = await factory.inner(Chain.TRON) :
        from.key === "Elrond" ? chain = await factory.inner(Chain.ELROND) :
        from.key === "Polygon" ? chain = await factory.inner(Chain.POLYGON) :
        from.key === "Avalanche" ? chain = await factory.inner(Chain.AVALANCHE) :
        from.key === "Fantom" ? chain = await factory.inner(Chain.FANTOM) :
        from.key === "Algorand" ? chain = await factory.inner(Chain.ALGORAND) :
        from.key === "xDai" ? chain = await factory.inner(Chain.XDAI) :
        from.key === "Solana" ? chain = await factory.inner(Chain.SOLANA) :
        from.key === "Cardano" ? chain = await factory.inner(Chain.CARDANO) : chain = ""
        return chain
    }

    // Since approveForMinter returns a Promise it's a good idea to await it which requires an async function
    const approve = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(account)
        try {
            const chain = await handleChainFactory()
            const isApproved = await chain.approveForMinter(selectedNFTList[0], signer);
            console.log("Is Approved:", isApproved) 
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="approValBox">
            <div className="approvTop">
                Approval
                <div className="appInf">
                    <span className="infText">
                        We'd like to make sure you really want to send the NFT and pay the associated fees.
                    </span>
                    <img src={InfLith} alt="Inf" />
                </div>
            </div>
            <div style={selectedNFTList.length ? {} : OFF} onClick={() => approve()} className="approveBtn">
                Approve all NFTs
                <div className="approveBtn">
                    <input type="checkbox" id="approveCheck" />
                    <label htmlFor="approveCheck">
                        <span className="checkCircle"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Approval;
