import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNFTs } from "../../store/reducers/paginationSlice";
import { useDidUpdateEffect } from "../Settings/hooks";
import "./Pagination.css";

export default function Pagination() {
    const dispatch = useDispatch();
    const filteredNFTList = useSelector(
        (state) => state.general.filteredNFTList
    );
    const originalNFTList = useSelector((state) => state.general.NFTList);
    const nfts = filteredNFTList || originalNFTList;

    // Pagination UI
    const [selectedPage, setSelectedPage] = useState(1);
    const nftsPerPage = 100;
    const pageNumbers = [];
    const indexOfLastNFT = selectedPage * nftsPerPage;
    const indexOfFirstNFT = indexOfLastNFT - nftsPerPage;
    const currentNFTs = nfts?.slice(indexOfFirstNFT, indexOfLastNFT);
    const OFF = { pointerEvents: "none" };
    for (let i = 1; i <= Math.ceil(nfts?.length / nftsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        dispatch(setCurrentNFTs(currentNFTs));
    }, [currentNFTs]);

    return (
        <div className="pagination__container">
            <div className="pagination">
                <div
                    style={selectedPage === 1 ? OFF : {}}
                    className="cross-prev"
                >
                    &#10094;&#10094;
                </div>
                <div style={selectedPage === 1 ? OFF : {}} className="prev">
                    &#10094;
                </div>
                {pageNumbers.map((e, index) => (
                    <div
                        onClick={() => setSelectedPage(index + 1)}
                        className={
                            selectedPage === index + 1
                                ? "page-selector--selected"
                                : "page-selector"
                        }
                    >
                        {index + 1}
                    </div>
                ))}
                <div
                    style={selectedPage === pageNumbers?.length ? OFF : {}}
                    className="next"
                >
                    &#10095;
                </div>
                <div
                    style={selectedPage === pageNumbers?.length ? OFF : {}}
                    className="cross-next"
                >
                    &#10095;&#10095;
                </div>
            </div>
        </div>
    );
}
