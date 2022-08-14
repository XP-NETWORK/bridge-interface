import { ReturnCode } from "@elrondnetwork/erdjs/out";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNFTs } from "../../store/reducers/generalSlice";
import { setScrollToggler } from "../../store/reducers/paginationSlice";
import { useDidUpdateEffect } from "../Settings/hooks";
import "./Pagination.css";

export default function Pagination() {
    const dispatch = useDispatch();
    const filteredNFTList = useSelector(
        (state) => state.general.filteredNFTList
    );
    const originalNFTList = useSelector((state) => state.general.NFTList);
    const empty = useSelector((state) => state.pagination.empty);

    const nfts = filteredNFTList || originalNFTList;
    console.log(
        "🚀 ~ file: Pagination.jsx ~ line 18 ~ Pagination ~ filteredNFTList",
        filteredNFTList
    );

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
    }, [selectedPage, originalNFTList, filteredNFTList]);

    useEffect(() => {
        if (empty) {
            dispatch(setCurrentNFTs([]));
        }
    }, [empty]);

    const showScope = (index) => {
        const after = 10 - (selectedPage % 10);
        const before = 10 - after;

        if (index >= selectedPage - before && index <= selectedPage + after)
            return true;
    };

    const handleClick = (action, page) => {
        // debugger;
        switch (action) {
            case "cross-prev":
                if (selectedPage - 10 < 1) {
                    setSelectedPage(1);
                } else setSelectedPage(selectedPage - 10);
                break;
            case "prev":
                setSelectedPage(selectedPage - 1);
                break;
            case "cross-next":
                if (selectedPage + 10 > pageNumbers.length) {
                    setSelectedPage(pageNumbers.length);
                } else setSelectedPage(selectedPage + 10);
                break;
            case "next":
                setSelectedPage(selectedPage + 1);
                break;
            case "page-selector":
                setSelectedPage(page);
                break;
            default:
                break;
        }
        dispatch(setScrollToggler());
    };

    return (
        <div
            style={originalNFTList?.length > 100 ? {} : { display: "none" }}
            className="pagination__container"
        >
            <div className="pagination">
                <div
                    onClick={() => handleClick("cross-prev")}
                    style={selectedPage === 1 ? OFF : {}}
                    className="cross-prev"
                >
                    &#10094;&#10094;
                </div>
                <div
                    onClick={() => handleClick("prev")}
                    style={selectedPage === 1 ? OFF : {}}
                    className="prev"
                >
                    &#10094;
                </div>
                {pageNumbers.map((e, index) => {
                    const page = index + 1;
                    return showScope(page) ? (
                        <div
                            key={`Button ${index + 1}`}
                            onClick={() => handleClick("page-selector", page)}
                            style={selectedPage === page ? OFF : {}}
                            className={
                                selectedPage === page
                                    ? "page-selector--selected"
                                    : "page-selector"
                            }
                        >
                            {page}
                        </div>
                    ) : (
                        ""
                    );
                })}
                <div
                    onClick={() => handleClick("next")}
                    style={selectedPage === pageNumbers?.length ? OFF : {}}
                    className="next"
                >
                    &#10095;
                </div>
                <div
                    onClick={() => handleClick("cross-next")}
                    style={selectedPage === pageNumbers?.length ? OFF : {}}
                    className="cross-next"
                >
                    &#10095;&#10095;
                </div>
            </div>
        </div>
    );
}
