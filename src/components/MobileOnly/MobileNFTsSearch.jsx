import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchNFTList } from "../../store/reducers/generalSlice";
import CloseButton from "../Buttons/CloseButton";
import PropTypes from "prop-types";
import { getSearched } from "../../wallet/helpers";
import { chains } from "../values";
import { setCurrentNFTs } from "../../store/reducers/generalSlice";

export default function MobileNFTsSearch({ handleSearchTop }) {
    const dispatch = useDispatch();
    const [searchInput, setInput] = useState("");
    let from = useSelector((state) => state.general.from);
    let temporaryFrom = useSelector((state) => state.general.temporaryFrom);

    const checkWallet = useSelector((state) => state.general.checkWallet);
    const algorandAccount = useSelector((s) => s.general.algorandAccount);
    const tronWallet = useSelector((state) => state.general.tronWallet);
    const account = useSelector((state) => state.general.account);
    const tezosAccount = useSelector((state) => state.general.tezosAccount);
    const elrondAccount = useSelector((state) => state.general.elrondAccount);
    const hederaAccount = useSelector((state) => state.general.hederaAccount);
    const secretAccount = useSelector((state) => state.general.secretAccount);
    const nfts = useSelector((state) => state.general.NFTList);

    const handleSearch = (e) => {
        const search = e.target.value
        setInput(search);
    };

    const handleKeyDown = async () => {
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
            const found = await getSearched(_account, searchInput, chain.nonce);
            if (found) dispatch(setSearchNFTList(found));
    };

    useEffect(() => {
      setInput("");
      dispatch(setSearchNFTList(""));
      dispatch(setCurrentNFTs(nfts));
    }, [from, temporaryFrom]);

    return (
        <div onKeyDown={handleKeyDown} className="mobile-search__top">
            <CloseButton handleSearchTop={handleSearchTop} />
            <div className="mobile-search-input__box">
                <div className="mobile-search-input__icon"></div>
                <input
                    onChange={(e) => handleSearch(e)}
                    type="text"
                    placeholder="Search NFT"
                    className="serchInput"
                    value={searchInput}
                />
            </div>
        </div>
    );
}

MobileNFTsSearch.propTypes = {
    handleSearchTop: PropTypes.any,
};
