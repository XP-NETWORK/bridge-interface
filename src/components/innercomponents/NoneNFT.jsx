import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import NONFT from '../../assets/img/noNft.svg';
import { setReset } from '../../store/reducers/generalSlice';
import { CHAIN_INFO } from '../values';
import { getAddEthereumChain } from "../../wallet/chains"

function NoneNFT() {
    const account = useSelector(state => state.general.account)
    const from = useSelector(state => state.general.from)
    
    // async function switchNetwork (){
    //     const info = CHAIN_INFO[from?.key]
    //     const chainId = `0x${info.chainId.toString(16)}`;

    //     try {
    //         await window.ethereum.request({
    //             method: "wallet_switchEthereumChain",
    //             params: [{ chainId }],
    //           })
    //     } catch (error) {
    //         console.log(error);
    //         try {
    //             const toHex = (num) => {
    //                 return '0x'+num.toString(16)
    //             }
    //             const chain = getAddEthereumChain()[parseInt(chainId).toString()]
    //             const params = {
    //                 chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
    //                 chainName: chain.name,
    //                 nativeCurrency: {
    //                   name: chain.nativeCurrency.name,
    //                   symbol: chain.nativeCurrency.symbol, // 2-6 characters long
    //                   decimals: chain.nativeCurrency.decimals,
    //                 },
    //                 rpcUrls: chain.rpc,
    //                 blockExplorerUrls: [ ((chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url) ? chain.explorers[0].url : chain.infoURL) ]
    //               }
    //             await window.ethereum.request({
    //                 method: "wallet_addEthereumChain",
    //                 params: [params, account],
    //             })
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

 

    const dispatch = useDispatch()
    return (
        <div className="nonftContainer">
            <div className="nonftAcc">
                <img src={NONFT} alt="No NFT" className="nonft" />
                <h2>Oops...</h2>
                There is nothing here.
                <a onClick={() => dispatch(setReset())} href="#" className="switching">Switch Network</a>
            </div>
        </div>
    )
}

export default NoneNFT;
