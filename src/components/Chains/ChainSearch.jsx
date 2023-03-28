import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as Search } from "../../assets/img/icons/Search.svg";
import { setChainSearch } from "../../store/reducers/generalSlice";

export default function ChainSearch() {
    const search = useSelector((state) => state.general.chainSearch);
    const dispatch = useDispatch();

    const inputElement = useRef(null);

    const handleChange = (e) => {
        console.log(e)
        e.preventDefault();
        if(!(search === "" || search.length ===0) && e.target.value === " "){
            //do nothing
        }else{
            dispatch(setChainSearch(e.target.value));
        }
    };

    useEffect(() => {
        inputElement.current.focus();
        const handleKeyDown = () => {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <form action="#">
            <div className="searchChain">
                <input
                    ref={inputElement}
                    value={search || ""}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Search"
                />
                <div className="chain-search__button">
                    <Search className="svgWidget" alt="search" />
                </div>
            </div>
        </form>
    );
}
