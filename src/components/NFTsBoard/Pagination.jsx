import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Pagination({ setCurrentPage }) {
    const dispatch = useDispatch();
    const [scope, setScope] = useState(1);
    const pageNumber = [];
    const nfts = useSelector((state) => state.general.NFTList);

    const currentPageClick = (page) => {
        setCurrentPage(page);
    };

    for (let i = 1; i <= Math.ceil(nfts?.length / 6); i++) {
        pageNumber.push(i);
    }

    return (
        <div className="pagination">
            <div className="pagination__prev">&#10094;</div>
            <ul className="pagination__list">
                {pageNumber?.map(
                    (page, i) =>
                        pageNumber[i + 1] &&
                        (page === scope ||
                            (page < scope + 3 && page > scope - 3)) && (
                            <li
                                className="pagination__page"
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
            <div className="pagination__next">&#10095;</div>
        </div>
    );
}
