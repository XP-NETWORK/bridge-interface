/* eslint-disable react/prop-types */

import React, { useState, useRef } from "react";
import { LittleLoader } from "../innercomponents/LittleLoader";
import { useDispatch, useSelector } from "react-redux";

import { setBigNumFees } from "../../store/reducers/generalSlice";
import { useEffect } from "react";

import { withServices } from "../App/hocs/withServices";

import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";
import BigNumber from "bignumber.js";

const intervalTm = 10_000;
const deployFeeIntTm = 30_000;

function SendFees(props) {
    const { serviceContainer } = props;

    const { bridge } = serviceContainer;

    const dispatch = useDispatch();
    const balance = useSelector((state) => state.general.balance);

    const to = useSelector((state) => state.general.to);
    const from = useSelector((state) => state.general.from);
    // const EVM = from?.type === "EVM";
    const account = useSelector((state) => state.general.account);
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );

    const [chainParams, setChainParams] = useState({});

    const [fees, setFees] = useState("");

    const [loading, setLoading] = useState(false);

    // const [deployFeeLoading, setDeployFeeLoading] = useState(false);

    const [deployFees, setDeployFees] = useState(0);

    const interval = useRef(null);
    const deployFeeInterval = useRef(null);

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

    const estimateDeploy = async (fromChain, toChain, nfts) => {
        // setDeployFeeLoading(true);
        const promises = nfts.map((nft) =>
            fromChain.estimateDeploy(toChain, nft)
        );
        const settled = await Promise.allSettled(promises);

        let finalFee = new BigNumber(0);
        settled.forEach((item) => {
            const num = new BigNumber(item.value);
            finalFee = finalFee.plus(num);
        });

        setDeployFees(Number(finalFee.toString()));
        // setDeployFeeLoading(false);
    };

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
            setDeployFees(0);
            clearInterval(interval.current);
            clearInterval(deployFeeInterval.current);
            return;
        }

        selectedNFTList.length &&
            (async () => {
                const [fromChainWrapper, toChainWrapper] = await Promise.all([
                    bridge.getChain(from.nonce),
                    bridge.getChain(to.nonce),
                ]);

                const toChain = toChainWrapper.chain;
                estimate(fromChainWrapper, toChain);
                estimateDeploy(fromChainWrapper, toChain, selectedNFTList);
                interval.current = setInterval(() => {
                    estimate(fromChainWrapper, toChain);
                }, intervalTm);
                deployFeeInterval.current = setInterval(() => {
                    estimateDeploy(fromChainWrapper, toChain, selectedNFTList);
                }, deployFeeIntTm);
            })();

        return () => {
            clearInterval(deployFeeInterval.current);
            clearInterval(interval.current);
        };
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
            {deployFees && selectedNFTList?.length ? (
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
                        <span>{deployFees.toFixed(2)}</span>
                        <span>{` ${chainParams?.currencySymbol}`}</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default withServices(SendFees);
