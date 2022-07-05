import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDidUpdateEffect } from "../Settings/hooks";

export default function Pagination({ setCurrentPage, currentPage }) {
    const dispatch = useDispatch();
    const [scope, setScope] = useState(1);

    const pageNumbers = [];
    const nfts = useSelector((state) => state.general.NFTList);

    const currentPageClick = (page) => {
        setCurrentPage(page);
    };

    const handleArrowClick = (arrow) => {
        switch (arrow) {
            case "prev":
                if (currentPage !== 1) {
                    setCurrentPage(currentPage - 1);
                    if (currentPage - 1 < scope - 1) setScope(scope - 3);
                }
                break;
            case "next":
                if (pageNumbers[currentPage + 1]) {
                    setCurrentPage(currentPage + 1);
                    if (currentPage + 1 > scope + 1) setScope(scope + 3);
                }
                break;
            default:
                break;
        }
    };

    for (let i = 1; i <= Math.ceil(nfts?.length / 6); i++) {
        pageNumbers.push(i);
    }

    useDidUpdateEffect(() => {
        console.log("scope: ", scope, "currentPage: ", currentPage);
    }, [scope, currentPage]);

    return (
        pageNumbers.length > 1 && (
            <div className="pagination">
                <div
                    onClick={() => handleArrowClick("prev")}
                    className="pagination__prev"
                >
                    &#10094;
                </div>
                <ul className="pagination__list">
                    {pageNumbers?.map(
                        (page, i) =>
                            pageNumbers[i + 1] &&
                            (page === scope ||
                                (page < scope + 2 && page > scope - 2)) && (
                                <li
                                    className={
                                        currentPage === page
                                            ? "pagination__pag--active"
                                            : "pagination__page"
                                    }
                                    onClick={() => currentPageClick(page)}
                                >
                                    {page}
                                </li>
                            )
                    )}
                    {(nfts?.length / 6) % 6 > 3 && (
                        <div
                            className="pagination__page"
                            onClick={() => setScope(scope + 3)}
                        >
                            ...
                        </div>
                    )}
                    <div
                        className="pagination__page"
                        onClick={() => currentPageClick((nfts?.length / 6) % 6)}
                    >
                        {Math.round(nfts?.length / 6)}
                    </div>
                </ul>
                <div
                    className="pagination__next"
                    onClick={() => handleArrowClick("next")}
                >
                    &#10095;
                </div>
            </div>
        )
    );
}
