import React from 'react'
import { Container } from "react-bootstrap";

import SelectedNFT_1 from '../assets/img/nfts/SelectedNFT_1.png';


import Check from '../assets/img/icons/Check_circle.svg';
import Failed from '../assets/img/icons/Failed.svg';
import Pending from '../assets/img/icons/Pending.svg';


// Chain

function Transactionhistory() {
    return (
        <div className="Transactionhistory">
            <Container className="transContainer">
                <div className="transTableCont">
                    <div className="transTitle text-center">
                        <h3>📜 Transaction history </h3>
                    </div>
                    <div className="transferTableBox">
                        <table className="transferTable table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>NFT Name</th>
                                    <th>Txn Hash</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src={SelectedNFT_1} alt="Transaction NFT" className="nftImg" /></td>
                                    <td>TheMonaLana</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td><span className="statComp"><img src={Check} /> Completed</span></td>
                                    <td>5 min ago</td>
                                </tr>
                                <tr>
                                    <td><img src={SelectedNFT_1} alt="Transaction NFT" className="nftImg" /></td>
                                    <td>TheMonaLana</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td><span className="transFail"><img src={Failed} /> Completed</span></td>
                                    <td>1 min ago</td>
                                </tr>
                                <tr>
                                    <td><img src={SelectedNFT_1} alt="Transaction NFT" className="nftImg" /></td>
                                    <td>TheMonaLana</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td className="colBlue">0xfytyuiolkjh9ijk...678h</td>
                                    <td><span className="transPend"><img src={Pending} /> Completed</span></td>
                                    <td>5 min ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Transactionhistory;
