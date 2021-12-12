import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap";

import SelectedNFT_1 from '../assets/img/nfts/SelectedNFT_1.png';


import Check from '../assets/img/icons/Check_circle.svg';
import Failed from '../assets/img/icons/Failed.svg';
import Pending from '../assets/img/icons/Pending.svg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'tronweb/node_modules/axios';
import { getFactory, setClaimablesAlgorand } from '../wallet/helpers';
import { removeAlgorandClaimable, setAlgorandClaimables } from '../store/reducers/generalSlice';


// Chain

function Transactionhistory() {
    const {algorandClaimables} = useSelector(s => s.general)
    return (
        <div className="Transactionhistory">
            <Container className="transContainer">
                <div className="transTableCont">
                    <div className="transTitle text-center">
                        <h3>📜 Claimable NFTs </h3>
                    </div>
                    <div className="transferTableBox">
                        <table className="transferTable table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>NFT Name</th>
                                    <th>Token Id</th>
                                    <th>From</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    algorandClaimables && algorandClaimables.length > 0 
                                    ? algorandClaimables.map(n => <Claimable nft={n} />) 
                                    : ''
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export function Claimable(props) {
    const {algorandAccount} = useSelector(s => s.general)
    const {nft, isSuccess} = props
    const { uri, name, nftId } = nft
    const [isOptin, setIsOptin] = useState()
    const dispatch = useDispatch()
    const [image,setImage] = useState()
    const [originalChain,setOrigin] = useState()
    const signer = {
        address: algorandAccount,
        algoSigner: window.AlgoSigner,
        ledger: "MainNet"
    }

    const load = async () => {
        const res = await axios.get(uri)
        if(res.data) {
            const { image, attributes } = res.data
            if(attributes && attributes.length > 0) {
                const originChain = attributes.filter(n => n.trait_type === 'Original Chain')[0]
                if(originChain) setOrigin(originChain.value)
            }
            setImage(res.data.image)
        }
    }
    useEffect(() => {
        load()
    },[])
    const optIn = async () => {
        const factory = await getFactory()
        const algorand = await factory.inner(15)
        const isOpted = await algorand.isOptIn(algorandAccount, nftId)
        console.log(algorand)
        if(!isOpted) {
            const optin = await algorand.optInNft(signer, props.nft)
            if(optin) setIsOptin(true)
        } else setIsOptin(true)
        
    }
    const claim = async () => {
        if(isOptin) {
            const factory = await getFactory()
            const algorand = await factory.inner(15)
            const signer = {
                address: algorandAccount,
                algoSigner: window.AlgoSigner,
                ledger: "MainNet"
            }
            console.log(props.nft)
            try {
                const c = await algorand.claimNft(signer, props.nft)
                setClaimablesAlgorand(algorandAccount)
            } catch(err) {
                console.log(err, 'erlerad')
            }
        }
    }
    const off = { opacity: 0.6, pointerEvents: 'none' }
    return (
        <tr>
            <td>
                {image ? <img src={image} alt="Transaction NFT" className="nftImg" /> : '' }
            </td>
            <td>{name}</td>
            <td className="colBlue">{nftId}</td>
            <td className="colBlue">{originalChain}</td>
            <td className="claimsbut" style={isOptin ? off : {}} onClick={optIn}>
                <div>
                    Opt In
                </div>
            </td>
            <td className="claimsbut" style={!isOptin ? off : {}} onClick={claim}>
                <div>
                    Claim
                </div>
            </td>
        </tr>
    )
}

export default Transactionhistory;
