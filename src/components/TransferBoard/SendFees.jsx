import BigNumber from "bignumber.js";
import React, { useState, useRef } from "react";
import { LittleLoader } from "../innercomponents/LittleLoader";
import { useDispatch, useSelector } from "react-redux";
import { chainsConfig, CHAIN_INFO } from "../values";
import {
    getFactory,
    handleChainFactory,
    setClaimablesAlgorand,
    setNFTS,
} from "../../wallet/helpers";
import { setBigNumFees } from "../../store/reducers/generalSlice";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import DiscountRlzBtn from "./DiscountRlzBtn";
import Fee from "./Fee";

function SendFees() {
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.general.balance);

    const to = useSelector((state) => state.general.to);
    const from = useSelector((state) => state.general.from);
    const account = useSelector((state) => state.general.account);
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );
    const isToEVM = useSelector((state) => state.general.to).type === "EVM";
    const [fees, setFees] = useState("");
    const [feeForTotal, setFeeForTotal] = useState();
    const Web3Utils = require("web3-utils");

    const [loading, setLoading] = useState(false);
    const discountLeftUsd = useSelector(
        (state) => state.discount.discountLeftUsd
    );

    const feesReqInterval = useRef(null);

    async function estimate() {
        let fact;
        let fee;
        try {
            const fromChain = await handleChainFactory(from.text);
            const toChain = await handleChainFactory(to.text);

            const wallet =
                to === "Tron"
                    ? "TCCKoPRcYoCGkxVThCaY9vRPaKiTjE4x1C"
                    : from === "Tron" && isToEVM
                    ? "0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6"
                    : from === "Algorand" && isToEVM
                    ? "0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6"
                    : from === "Elrond" && isToEVM
                    ? "0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6"
                    : from === "Tezos" && isToEVM
                    ? "0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6"
                    : account;

            fact = await getFactory();

            if (to === "Tron") {
                fee =
                    from === "BSC"
                        ? new BigNumber("100000000000000000")
                        : from === "Polygon"
                        ? new BigNumber("23200000000000000000")
                        : from === "Ethereum"
                        ? new BigNumber("14952490000000000")
                        : from === "Algorand"
                        ? new BigNumber("32160950300000000000")
                        : from === "Elrond"
                        ? new BigNumber("239344350000000000")
                        : from === "Avalanche"
                        ? new BigNumber("529683610000000000")
                        : from === "xDai"
                        ? new BigNumber("56645012600000000000")
                        : from === "Fuse"
                        ? new BigNumber("95352570490000000000")
                        : "";
            } else {
                try {
                    fee = await fact.estimateFees(
                        fromChain,
                        toChain,
                        selectedNFTList[0],
                        wallet
                    );
                } catch (error) {
                    console.error(error);
                }
            }

            const bigNum = fee
                ? fee
                      .multipliedBy(1.1)
                      .integerValue()
                      .toString(10)
                : undefined;

            dispatch(setBigNumFees(bigNum));

            let fees;
            if (
                from.type === "Tron" ||
                from.type === "Algorand" ||
                from.type === "Cosmos"
            ) {
                fees = bigNum / 1e6;
            } else {
                fees =
                    bigNum &&
                    (await Web3Utils.fromWei(String(bigNum), "ether"));
            }

            if (fees) {
                setFees(fees * selectedNFTList.length);
                setFeeForTotal(fees);
            }
        } catch (error) {
            console.log(error.data ? error.data.message : error.message);
        }
        setLoading(false);
    }
    function getNumToFix() {
        // debugger
        let num = 1;
        let str;
        if (fees > 0 && fees) {
            do {
                num++;
                str = fees?.toFixed(num).toString();
            } while (str[str.length - 2] === "0");
        }
        return num;
    }

    const config = chainsConfig[from?.text];

    useEffect(() => {
        if (!selectedNFTList.length) {
            setFees("0");
            return clearInterval(feesReqInterval.current);
        }
        setLoading(true);

        estimate();
        feesReqInterval.current = setInterval(() => estimate(), 1000 * 10);
        return () => clearInterval(feesReqInterval.current);
    }, [selectedNFTList, to]);

    useEffect(() => {
        /* clearInterval(estimateInterval);
    estimate();
    const s = setInterval(() => estimate(), 1000 * 30);
    setEstimateInterval(s);
    return () => clearInterval(s);*/
    }, [to]);

    return (
        <div className="checkout">
            <div className="checkout__balance checkout-row">
                <span>Balance: </span>
                {balance ? (
                    <span>{`${balance.toFixed(3)} ${config?.token ||
                        (from?.text === "Gnosis" && "Gnosis")}`}</span>
                ) : (
                    `0 ${config?.token}`
                )}
            </div>
            <div className="checkout__fees checkout-row">
                <span>Fees</span>
                <span>{loading ? <LittleLoader /> : <Fee fees={fees} />}</span>
            </div>
            {discountLeftUsd && <DiscountRlzBtn fees={feeForTotal} />}
        </div>
    );
}

export default SendFees;
