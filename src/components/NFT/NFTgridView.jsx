/* eslint-disable react/prop-types */

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NFTempty from "../innercomponents/NFTempty";
import Missing from "../innercomponents/Missing";
import BigLoader from "../../components/innercomponents/BigLoader";
import NFTcard from "./NFTcard";

import { withSecretAuth } from "../Modals/ImportNFTModal/SecretAuth";
import { withServices } from "../App/hocs/withServices";
import { compose } from "redux";
import SecretContractPanel from "../innercomponents/SecretContractPannel";

function NFTgridView({ serviceContainer, chainSpecificRender }) {
    const { bridge } = serviceContainer;
    const [chain, setChain] = useState(null);

    const PreNftFetch = chainSpecificRender?.PreNftFech;
    const CollectionPannel = chainSpecificRender?.CollectionPannel;
    const [hasClaimables, setClaimables] = useState(0);

    const from = useSelector((state) => state.general.from);
    const currentsNFTs = useSelector((state) => state.general.currentsNFTs);
    const scrollToggler = useSelector((state) => state.pagination.scrollToggler);
    const wrapper = useRef(null);

    const algorandClaimables = useSelector((state) => state.general.algorandClaimables);

    const preFetchData = useSelector((state) => state.general.preFetchData);

    const nftsPlace = window.innerWidth <= 600 ? 2 : 6;
    const placeholders = new Array(
        currentsNFTs ? (currentsNFTs - currentsNFTs.length >= 0 ? nftsPlace - currentsNFTs.length : 0) : 0
    ).fill(0);
    const auto = { overflowX: "auto" };
    const loader = useSelector((state) => state.general.bigLoader);
    const RenderClaimables = chainSpecificRender?.RenderClaimables;

    useEffect(() => {
        bridge.getChain(from.nonce).then((fromChain) => setChain(fromChain));
    }, []);

    useEffect(() => {
        wrapper?.current?.scrollTo(0, 0);
    }, [scrollToggler]);

    const withCollectionSelector = CollectionPannel && preFetchData;
    const hidden = !PreNftFetch || preFetchData ? "" : "hidden";

    /**${hidden} ${
                    withCollectionSelector ? "withCollectionSelector" : ""
                } */
    return (
        <>
            {PreNftFetch && <PreNftFetch show={!hidden} />}
            <div className={`nftListBox ${hidden} ${withCollectionSelector ? "withCollectionSelector" : ""}`}>
                {from?.type === "Cosmos" && <SecretContractPanel />}
                {withCollectionSelector && <CollectionPannel />}
                {loader ? (
                    <BigLoader />
                ) : (
                    <div ref={wrapper} style={currentsNFTs?.length > 0 ? auto : {}} className="nft-list__wrapper">
                        {Array.isArray(algorandClaimables) && algorandClaimables.length
                            ? algorandClaimables.map((nft, index) => (
                                  <NFTcard
                                      nft={nft}
                                      index={index}
                                      key={`nft-${index}`}
                                      claimables={true}
                                      chain={chain}
                                      chainSpecificRender={chainSpecificRender}
                                      serviceContainer={serviceContainer}
                                  />
                              ))
                            : ""}

                        {Array.isArray(currentsNFTs) && currentsNFTs.length
                            ? currentsNFTs.map((nft, index) => (
                                  <NFTcard
                                      nft={nft}
                                      index={index}
                                      key={`nft-${index}`}
                                      chain={chain}
                                      serviceContainer={serviceContainer}
                                      chainSpecificRender={chainSpecificRender}
                                  />
                              ))
                            : !algorandClaimables?.length && !hasClaimables && <NFTempty />}

                        {RenderClaimables && (
                            <RenderClaimables setClaimables={(claimables) => setClaimables(claimables)} />
                        )}
                        {currentsNFTs?.length > 0 && currentsNFTs?.length < nftsPlace
                            ? placeholders.map((n, index) => <Missing key={`missing-${index}-component`} />)
                            : ""}
                    </div>
                )}
            </div>
        </>
    );
}

export default compose(withSecretAuth, withServices)(NFTgridView);
