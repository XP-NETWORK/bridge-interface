import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as Search } from "../../assets/img/icons/Search.svg";
import { setChainSearch } from "../../store/reducers/generalSlice";

export default function ChainSearch() {
  const search = useSelector((state) => state.general.chainSearch);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setChainSearch(e.target.value));
  };

  return (
    <form action="#">
      <div className="searchChain">
        <input
          value={search}
          onChange={(e) => handleChange(e)}
          type="search"
          placeholder="Search"
        />
        <button type="submit">
          <Search className="svgWidget" alt="search" />
        </button>
      </div>
    </form>
  );
}
