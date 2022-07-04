import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Pagination() {
    const dispatch = useDispatch();
    const nfts = useSelector((state) => state.general.NFTList);

    const currentPageClick = (i) => {
        debugger;
        console.log(i);
    };

    return (
        <div className="pagination">
            <div className="pagination__prev">&#10094;</div>
            <ul className="pagination__list">
                {nfts?.map((e, i) => {
                    if ((i / 6) % 6 === 0) {
                        return (
                            <li onClick={() => currentPageClick(i)}>
                                {i > 0 ? nfts.length / i : i}
                            </li>
                        );
                    }
                })}
                {(nfts?.length / 6) % 6 > 3 && <div>...</div>}
                <div>{(nfts?.length / 6) % 6}</div>
            </ul>
            <div className="pagination__next">&#10095;</div>
        </div>
    );
}
