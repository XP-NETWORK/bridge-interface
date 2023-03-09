/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NFTempty from "../innercomponents/NFTempty";

import NFTlistedCard from "./NFTlistedCard";
import { withSecretAuth } from "../Modals/ImportNFTModal/SecretAuth";
import { withServices } from "../App/hocs/withServices";
import { compose } from "redux";
import SecretContractPanel from "../innercomponents/SecretContractPannel";

function NFTlistView({ serviceContainer }) {
    const currentsNFTs = useSelector((state) => state.general.currentsNFTs);
    const from = useSelector((state) => state.general.from);
    const { bridge } = serviceContainer;
    const [chain, setChain] = useState(null);

    useEffect(() => {
        bridge.getChain(from.nonce).then((fromChain) => setChain(fromChain));
    }, []);

    return (
        <div className="nftListBox nftListView">
            {from?.type === "Cosmos" && <SecretContractPanel />}
            <ul className="nftList">
                {currentsNFTs?.length ? (
                    currentsNFTs.map((nft, index) => (
                        <NFTlistedCard
                            nft={nft}
                            index={index}
                            key={index + "listedview"}
                            chain={chain}
                            serviceContainer={serviceContainer}
                        />
                    ))
                ) : (
                    <NFTempty />
                )}
            </ul>
        </div>
    );
}

export default compose(withSecretAuth, withServices)(NFTlistView);
