import { useState, React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Search } from "../../assets/img/icons/Search.svg";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import {
  setFilteredNFTSList,
  setSearchNFTList,
} from "../../store/reducers/generalSlice";

import { getSearched } from "../../wallet/helpers";
import { chains } from "../values";

export default function NFTSearch() {
  const dispatch = useDispatch();
  let nfts = useSelector((state) => state.general.NFTList);
  const [openSearch, setOpen] = useState(false);
  const [searchInput, setInput] = useState("");

  const checkWallet = useSelector((state) => state.general.checkWallet);
  const algorandAccount = useSelector((s) => s.general.algorandAccount);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const hederaAccount = useSelector((state) => state.general.hederaAccount);
  const secretAccount = useSelector((state) => state.general.secretAccount);
  const from = useSelector((state) => state.general.from);

  const handleSearch = (e) => {
    const search = e.target.value
    setInput(search);
    // let filteredNFTs = currentNfts.filter(
    //     (e) =>
    //         e.name?.toLowerCase().includes(search) ||
    //         e.native.name?.toLowerCase().includes(search) ||
    //         e.description?.toLowerCase().includes(search) ||
    //         e.collectionIdent?.toLowerCase() === search.toLowerCase()
    // );

    // dispatch(setSearchNFTList(search));
    // dispatch(setFilteredNFTSList(filteredNFTs));
  };

  const handleKeyDown = async (e) => {
    const chain = chains.find((e) => e.key === from.key);
    const _account =
      checkWallet ||
      hederaAccount ||
      account ||
      algorandAccount ||
      tezosAccount ||
      elrondAccount ||
      tronWallet ||
      secretAccount;
    if (e.key === "Enter") {
      const found = await getSearched(_account, searchInput, chain.nonce);
      if (found) dispatch(setSearchNFTList(found));
    }
  };

  const clear = (()=>{
    console.log("from changed")
    // dispatch()
    setInput("");
    setOpen(false);
    dispatch(setSearchNFTList(""));
    dispatch(setFilteredNFTSList(nfts));
  })
  useEffect(clear,[from])

  return (
    <div onKeyDown={handleKeyDown} className="search-dropdown">
      {openSearch ? (
        <div className="serchInputConatainer">
          <Search className="svgWidget decorIcon" />
          <input
            type="text"
            className="serchInput"
            onChange={handleSearch}
            value={searchInput}
          />
          <div
            id="SearchDrop"
            className="CloseIcon"
            onClick={clear}
          >
            <Close className="svgWidget " />
          </div>
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