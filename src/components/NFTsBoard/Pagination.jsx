import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Pagination() {
    const dispatch = useDispatch();
    const nfts = useSelector((state) => state.general.NFTList);

    return (
        <div className="pagination">
            <div className="pagination__prev">&#10094;</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>...</div>
            <div>{(nfts?.length / 6) % 6}</div>
            <div className="pagination__next">&#10095;</div>
        </div>
    );
}
