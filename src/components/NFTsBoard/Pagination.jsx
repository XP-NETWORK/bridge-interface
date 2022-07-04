import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Pagination() {
    const dispatch = useDispatch();
    const pageNumber = [];
    const nfts = useSelector((state) => state.general.NFTList);

    const currentPageClick = (page) => {
        debugger;
        console.log(page);
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
                        pageNumber[i + 1] && (
                            <li onClick={() => currentPageClick(page)}>
                                {page}
                            </li>
                        )
                )}
                {(nfts?.length / 6) % 6 > 3 && <div>...</div>}
                <div>{(nfts?.length / 6) % 6}</div>
            </ul>
            <div className="pagination__next">&#10095;</div>
        </div>
    );
}
