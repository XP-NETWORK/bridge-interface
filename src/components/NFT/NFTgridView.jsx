import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import NFTempty from "../innercomponents/NFTempty";
import Missing from "../innercomponents/Missing";
import BigLoader from "../../components/innercomponents/BigLoader";
import NFTcard from "./NFTcard";

import { withSecretAuth } from "../Modals/ImportNFTModal/SecretAuth";

function NFTgridView({ setIndex, scrollIndex, render, secretRender }) {
    const nfts = useSelector((state) => state.general.NFTList);
    const currentsNFTs = useSelector((state) => state.pagination.currentsNFTs);
    console.log(
        "🚀 ~ file: NFTgridView.jsx ~ line 13 ~ NFTgridView ~ currentsNFTs",
        currentsNFTs
    );
    const algorandClaimables = useSelector(
        (state) => state.general.algorandClaimables
    );
    const nftsPlace = window.innerWidth <= 600 ? 2 : 6;
    const placeholders = new Array(
        nfts ? (nftsPlace - nfts.length >= 0 ? nftsPlace - nfts.length : 0) : 0
    ).fill(0);
    const auto = { overflowX: "auto" };
    const loader = useSelector((state) => state.general.bigLoader);

    return (
        <div className="nftListBox">
            {secretRender && secretRender()}
            {loader ? (
                <BigLoader />
            ) : (
                <div
                    style={currentsNFTs?.length > 0 ? auto : {}}
                    className="nft-list__wrapper"
                >
                    {algorandClaimables &&
                        algorandClaimables.map((nft, index) => (
                            <NFTcard
                                nft={nft}
                                index={index}
                                key={`nft-${index}`}
                                claimables={true}
                            />
                        ))}
                    {currentsNFTs?.length
                        ? currentsNFTs?.map((nft, index) => (
                              <NFTcard
                                  nft={nft}
                                  index={index}
                                  key={`nft-${index}`}
                              />
                          ))
                        : (!algorandClaimables ||
                              algorandClaimables?.length < 1) && <NFTempty />}
                    {currentsNFTs?.length > 0 &&
                    currentsNFTs?.length < nftsPlace
                        ? placeholders.map((n, index) => (
                              <Missing key={`missing-${index}-component`} />
                          ))
                        : ""}
                </div>
            )}
        </div>
    );
}

export default withSecretAuth(NFTgridView);
