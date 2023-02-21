/* eslint-disable react/prop-types */

import React, { useState, useRef } from "react";
import { LittleLoader } from "../innercomponents/LittleLoader";
import { useDispatch, useSelector } from "react-redux";

import { setBigNumFees } from "../../store/reducers/generalSlice";
import { useEffect } from "react";

import { withServices } from "../App/hocs/withServices";

import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";

const intervalTm = 10_000;

function SendFees(props) {
    const { serviceContainer } = props;

    const { bridge } = serviceContainer;

    const dispatch = useDispatch();
    const balance = useSelector((state) => state.general.balance);

    const to = useSelector((state) => state.general.to);
    const from = useSelector((state) => state.general.from);
    const account = useSelector((state) => state.general.account);
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );

    const [chainParams, setChainParams] = useState({});

    const [fees, setFees] = useState("");

    const [loading, setLoading] = useState(false);

    const interval = useRef(null);

    async function estimate(fromChain, toChain) {
        setLoading(true);
        const { fees, formatedFees } = await fromChain.estimate(
            toChain,
            selectedNFTList[0],
            account
        );
        dispatch(setBigNumFees(fees));
        setFees(formatedFees * selectedNFTList.length);
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

    useEffect(() => {
        bridge
            .getChain(from.nonce)
            .then((fromChainWrapper) =>
                setChainParams(fromChainWrapper.chainParams)
            );
    }, [from]);

    useEffect(() => {
        if (!selectedNFTList.length) {
            setFees("0");
            return clearInterval(interval.current);
        }

        selectedNFTList.length &&
            (async () => {
                const [fromChainWrapper, toChainWrapper] = await Promise.all([
                    bridge.getChain(from.nonce),
                    bridge.getChain(to.nonce),
                ]);

                const toChain = toChainWrapper.chain;
                estimate(fromChainWrapper, toChain);
                interval.current = setInterval(
                    () => estimate(fromChainWrapper, toChain),
                    intervalTm
                );
            })();

        return () => clearInterval(interval.current);
    }, [selectedNFTList, to]);

    return (
        <div className="fees__container">
            <div className="fees">
                <div className="fees__title">Fees</div>
                <div className="fees__bank">
                    {balance ? (
                        <span className="fees__balance">{`Balance: ${balance.toFixed(
                            3
                        )} ${chainParams?.currencySymbol ||
                            (from?.text === "Gnosis" && "Gnosis")}`}</span>
                    ) : (
                        `Balance: 0 ${chainParams?.currencySymbol || ""}`
                    )}
                    {loading ? (
                        <LittleLoader />
                    ) : (
                        <span>
                            {`${
                                fees && fees > 0
                                    ? fees?.toFixed(getNumToFix(fees))
                                    : "0"
                            }
                        ${chainParams?.currencySymbol || ""} 
                        `}
                            {/* ${discountLeftUsd && showDiscount(fees).toFixed(2)} */}
                        </span>
                    )}
                </div>
            </div>
            <div className="fees deploy-fees">
                <div className="fees__title deploy-fees__tittle">
                    <span>Deploy Fees</span>
                    <span className="deploy-fees__inf">
                        <InfLithComp
                            className="svgWidget nftInfIcon"
                            alt="info"
                        />
                    </span>
                </div>
                <div>
                    <span>12</span>
                    <span>{` ${chainParams?.currencySymbol}`}</span>
                </div>
            </div>
        </div>
    );
}

export default withServices(SendFees);
