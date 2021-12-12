
import React, { useState } from 'react'
import { Modal, Image  } from "react-bootstrap";
import Close from '../assets/img/icons/close.svg';
import Success from '../assets/img/icons/Success.svg';
import Check from '../assets/img/icons/Check_circle.svg';
import FileCopy from '../assets/img/icons/FileCopy.svg';
import CopyHover from '../assets/img/icons/CopyHover.svg';
import { useSelector } from 'react-redux';
import { chainsConfig } from './values';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { setupURI } from '../wallet/oldHelper';
import CopyIcons from './innercomponents/CopyIcons';
import { getFactory } from '../wallet/helpers';

// !TODO TX AVALANCHE

function NFTsuccess() {

    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const account = useSelector(state => state.general.account)
    const algorandAccount = useSelector(state => state.general.algorandAccount)
    const elrondAccount = useSelector(state => state.general.elrondAccount)
    const tronWallet = useSelector(state => state.general.tronWallet)
    const receiver = useSelector(state => state.general.receiver)
    const txnHashArr = useSelector(state => state.general.txnHashArr)
    const currentTX = useSelector(s => s.general.currrentTx)

    const selectedNFTList = useSelector(state => state.general.selectedNFTList)


    const [show, setShow] = useState(true);
    const handleClose = () => {
        window.location.reload()
    };
    const handleShow = () => setShow(true);
    const [copied, setCopy] = useState()
    const [copyHover, setSetCopyHover] = useState()
    const showSuccess = useSelector(state => state.showSuccess)


    const copy = () => {
      setCopy(true)

      setTimeout(() => setCopy(false), 2000)
    }
    const tx = txnHashArr && txnHashArr.length > 0 ? typeof txnHashArr[currentTX] === 'object' ? txnHashArr[currentTX].hash.toString() : txnHashArr[currentTX] : ''
    const address = account ? account : algorandAccount ? algorandAccount : elrondAccount ? elrondAccount : tronWallet ? tronWallet : ''
    return (
        <div>

            {/* <a href="#" className="themBtn" onClick={handleShow}>Send</a> */}
            {/* show={txnHashArr?.length} */}
            <Modal animation={false} show={txnHashArr?.length} onHide={handleClose} className="nftSuccessMod">
                <Modal.Header>
                    <Modal.Title><img src={Success} /> Success</Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <img src={Close} />
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div className="successBody">
                        <div className="successBox status">
                            <div className="sucesList">
                                <label>Status</label> <span className="statComp"><img src={Check} /> Completed</span>
                            </div>
                            <div className="sucesList">
                                <label>Date</label> <span className="statDate">{moment().format("YYYY-MM-DD hh:mm")}</span>
                            </div>
                            <CopyToClipboard 
                              text={tx}
                              onCopy={copy}
                            >   
                                <div className="sucesList">
                                    <label>Txn Hash</label>
                                    <span className="statTok colBlue">{ tx ? `${tx.substring(0, 10)}...${tx.substring(tx.length - 6)}` : '' }
                                        <CopyIcons />
                                        {/* <Image onMouseOver={() => setSetCopyHover(true)}  onMouseOut={() => setSetCopyHover(false)} src={copyHover ? CopyHover : FileCopy} className="success__copy" /> */}
                                    </span>
                                </div>
                                {/* <span className="copyTokk"><img src={FileCopy} /></span> */}
                            </CopyToClipboard>
                        </div>
                        <div className="successBox SentFrom">
                            <div className="sucesList">
                                <label>Sent From</label> <span className=""><img alt="" src={from ? from.image.src : ''} /> {from ? from.key : ''}</span>
                            </div>
                            <div className="sucesList">
                                <label>Departure Address</label> <span className="colBlue">{address ?`${address.substring(0, 10)}...${address.substring(address.length - 6)}`:''}</span>
                            </div>
                            <div className="sucesList">
                                <label>Sent To</label> <span className=""><img  alt="" src={to ? to.image.src : ''} /> {to ? to.key : ''}</span>
                            </div>
                            <div className="sucesList">
                                <label>Destination address</label> <span className="colBlue">{receiver ?`${receiver.substring(0, 10)}...${receiver.substring(receiver.length - 6)}`:'test'}</span>
                            </div>
                        </div>
                        <div className="nftSelectList">
                            <div className="nftSeleTop">
                                <div className="selectedNft">
                                    Sent NFT <span>/{ selectedNFTList?.length }</span>
                                </div>
                            </div>
                            <ul className="nftSelected nft--success">
                                { selectedNFTList.length ? selectedNFTList.map(( nft, index) => 
                                <SuccessNFT nft={nft} index={index} key={`${index}-nft-succeess`} from={from} />
                                ):''}
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NFTsuccess


function SuccessNFT({nft, from, index}) {
    const {to, algorandAccount} = useSelector(s => s.general)
    const tx = nft.txn ? typeof nft.txn === 'object' ? nft.txn.hash.toString() : nft.txn : ''

    const claim = async () => {
        const factory = await getFactory()
        const origin = await factory.inner(chainsConfig[from.key].Chain)
        const algo = await window.AlgoSigner.accounts({
            ledger: 'MainNet'
        });
        const { address } = algo[0]
        const signer = {
        algoSigner: window.AlgoSigner,
        address: address,
        ledger: "MainNet"
        }
        console.log(origin)
        const clam = await factory.claimAlgorandNft(origin, nft.txn, signer)
    }
    return  (
        <li className="nftSelecItem">
            <img src={setupURI(nft.image)} alt="NFT" />
            <span className="nftSelected__name">{nft.name}</span>
            {/* <span className="bluTextBtn"><a onClick={claim} target="_blank">Claim</a></span> */}
            <span className="bluTextBtn"><a href={`${chainsConfig[from.key].tx + tx}`} target="_blank">View Txn</a></span>
        </li>
    )
}