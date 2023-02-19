import React from "react";
import { useDispatch } from "react-redux";
import {
    setTo,
    setFrom,
    setChangeWallet,
    setTemporaryFrom,
    setTemporaryTo,
} from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import SetDeparture from "./SetDeparture";
import SetDestination from "./SetDestination";
import ChainListBox from "./ChainListBox";
import swap from "../../assets/img/icons/swapChain.svg";
import { switchNetwork } from "../../services/chains/evm/evmService";

export default function ChainSelectBox() {
    const dispatch = useDispatch();
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const account = useSelector((state) => state.general.account);

    const switchChains = async (e) => {
        // eslint-disable-next-line no-debugger
        if ((from && from.type === to.type) || !account) {
            handleSwitch(e);
        } else {
            dispatch(setTemporaryFrom(to));
            dispatch(setTemporaryTo(from));
            dispatch(setChangeWallet(true));
        }
    };

    const handleSwitch = async (e) => {
        e.preventDefault();
        const temp = to;
        let success;
        if (account) {
            success = await switchNetwork(temp);
            if (success) {
                dispatch(setTo(from));
                dispatch(setFrom(temp));
            }
        } else {
            dispatch(setTo(from));
            dispatch(setFrom(temp));
        }
    };

    return (
        <>
            <ChainListBox switchNetwork={switchNetwork} />
            <div className="chain-select__box">
                Transfer NFTs
                <br /> between blockchains
            </div>
            <div className="nftSelectBox">
                <SetDeparture />
                <span
                    className="swap-chain__btn"
                    onClick={(e) => (from && to ? switchChains(e) : undefined)}
                >
                    <img src={swap} alt="" />
                </span>
                <span className="chain-sep__line"></span>
                <SetDestination />
            </div>
        </>
    );
}
