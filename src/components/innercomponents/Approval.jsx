import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfLith from '../../assets/img/icons/infoLifht.svg';
import { ChainFactoryConfigs,    ChainFactory } from "xp.network/dist";
import {Chain, Config} from 'xp.network/dist/consts';
import { ethers } from "ethers";
import { updateApprovedNFTs, setApproved } from '../../store/reducers/generalSlice';
import { isEqual } from '../helpers';
import { isALLNFTsApproved } from '../../wallet/helpers';

function Approval(props) {
    
    const dispatch = useDispatch()
    const from = useSelector(state => state.general.from)
    const account = useSelector(state => state.general.account)
    const selectedNFTList = useSelector(state => state.general.selectedNFTList)
    const approvedNFTList = useSelector(state => state.general.approvedNFTList)
    const approved = useSelector(state => state.general.approved)
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

    const approveEach = async (nft, signer, chain, index) => {
        try {
            const { tokenId, contract, chainId } = nft.native
            const isInApprovedNFTs = approvedNFTList.filter(n => n.native.tokenId === tokenId && n.native.contract === contract && chainId === n.native.chainId )[0]
            if(!isInApprovedNFTs) {
                const isApproved = await chain.approveForMinter(nft, signer);
                dispatch(updateApprovedNFTs(nft))
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    // Since approveForMinter returns a Promise it's a good idea to await it which requires an async function
    const approveAllNFTs = async () => {
        if(from.type === "EVM"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(account)
            const chain = await handleChainFactory()
            selectedNFTList.forEach((nft, index) => {
                approveEach(nft, signer, chain, index)
            })
        }
        else {
            console.log("Not EVM Network")
        }
    };
    
    useEffect(() => {
        console.log(selectedNFTList, approvedNFTList)
        if(selectedNFTList.length > 0){ 
            dispatch(setApproved(isALLNFTsApproved()))
        }else{
            dispatch(setApproved(false))
        }
    },[selectedNFTList, approvedNFTList])

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
            <div style={selectedNFTList.length ? {} : OFF} className="approveBtn">
                Approve all NFTs
                <div   className="approveBtn">
                    <input checked={approved} type="checkbox" id="approveCheck" />
                    <label htmlFor="approveCheck">
                        <span onClick={approveAllNFTs} className="checkCircle"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Approval;
