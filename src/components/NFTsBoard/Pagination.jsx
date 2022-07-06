import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDidUpdateEffect } from "../Settings/hooks";

export default function Pagination({
    setCurrentPage,
    currentPage,
    NFTsPerPage,
}) {
    const [clickable, setClickable] = useState(true);
    const OFF = { pointerEvents: "none" };
    const [scope, setScope] = useState(1);
    const pageNumbers = [];
    const nfts = useSelector((state) => state.general.NFTList);

    const currentPageClick = (page) => {
        setClickable(false);
        if (page > 1 && page < 3) {
            setCurrentPage(2);
        } else setCurrentPage(page);
        tornOnClickable();
    };

    const tornOnClickable = () => {
        setTimeout(() => {
            setClickable(true);
        }, [2500]);
    };

    const showScope = () => {
        let show;
        switch (true) {
            case Math.round(nfts?.length / NFTsPerPage) > 3:
                show = true;
                break;
            case currentPage < Math.round(nfts?.length / NFTsPerPage):
                show = true;

                break;
            default:
                break;
        }
        return show ? (
            <div className="pagination__page" onClick={handleClickOnScope}>
                ...
            </div>
        ) : (
            <></>
        );
    };

    const handleArrowClick = (arrow) => {
        setClickable(false);
        switch (arrow) {
            case "prev":
                if (currentPage !== 1) {
                    setCurrentPage(currentPage - 1);
                    if (currentPage - 1 < scope - 1) setScope(scope - 3);
                }
                break;
            case "next":
                if (pageNumbers[currentPage]) {
                    setCurrentPage(currentPage + 1);
                    if (currentPage + 1 > scope + 1) setScope(scope + 3);
                }
                break;
            default:
                break;
        }
        tornOnClickable();
    };

    const handleClickOnScope = () => {
        setClickable(false);
        setScope(scope + 3);
        if (currentPage < scope + 2) setCurrentPage(currentPage + 3);
        tornOnClickable();
    };

    for (let i = 1; i <= Math.ceil(nfts?.length / NFTsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        pageNumbers.length >= 2 && (
            <div style={clickable ? {} : OFF} className="pagination">
                <div
                    onClick={() => handleArrowClick("prev")}
                    className="pagination__prev"
                >
                    &#10094;
                </div>
                <ul className="pagination__list">
                    {pageNumbers?.map(
                        (page, i) =>
                            pageNumbers[i + 2] &&
                            (page === scope ||
                                (page < scope + 2 && page > scope - 2)) && (
                                <li
                                    key={i}
                                    className={
                                        currentPage === page
                                            ? "pagination__page--active"
                                            : "pagination__page"
                                    }
                                    onClick={() => currentPageClick(page)}
                                >
                                    {page}
                                </li>
                            )
                    )}
                    {showScope()}
                    <div
                        className={
                            currentPage ===
                            Math.round(nfts?.length / NFTsPerPage)
                                ? "pagination__page--active"
                                : "pagination__page"
                        }
                        onClick={() =>
                            currentPageClick(
                                Math.round(nfts?.length / NFTsPerPage)
                            )
                        }
                    >
                        {Math.round(nfts?.length / NFTsPerPage) < 2
                            ? "2"
                            : Math.round(nfts?.length / NFTsPerPage)}
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
