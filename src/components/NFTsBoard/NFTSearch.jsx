import { useState, useCallback, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Search } from "../../assets/img/icons/Search.svg";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import {
  setFilteredNFTSList,
  setNFTList,
  setSearchNFTList,
} from "../../store/reducers/generalSlice";
import { debounce } from "../helpers";

export default function NFTSearch() {
  const dispatch = useDispatch();

  const nfts = useSelector((state) => state.general.NFTList);
  const currentNfts = useSelector((state) => state.general.currentsNFTs);
  const NFTListSearch = useSelector((state) => state.general.NFTListSearch);
  const [openSearch, setOpen] = useState(false);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    let filteredNFTs = currentNfts.filter(
      (e) =>
        e.name?.toLowerCase().includes(search) ||
        e.native.name?.toLowerCase().includes(search) ||
        e.description?.toLowerCase().includes(search) ||
        e.collectionIdent?.toLowerCase() === search.toLowerCase()
    );

    console.log(filteredNFTs);
    dispatch(setSearchNFTList(search));
    dispatch(setFilteredNFTSList(filteredNFTs));
  };

  return (
    <div className="search-dropdown">
      {openSearch ? (
        <div className="serchInputConatainer">
          <Search className="svgWidget decorIcon" />
          <input
            type="text"
            className="serchInput"
            onChange={handleSearch}
            value={NFTListSearch}
          />{" "}
          <div
            id="SearchDrop"
            className="CloseIcon"
            onClick={() => {
              dispatch(setSearchNFTList(""));
              dispatch(setFilteredNFTSList(nfts));
              setOpen(false);
            }}
          >
            <Close className="svgWidget " />
          </div>{" "}
        </div>
      ) : (
        <div
          id="SearchDrop"
          className="SearchDrop"
          onClick={() => setOpen(true)}
        >
          <Search className="svgWidget " />
        </div>
      )}
    </div>
  );
}
