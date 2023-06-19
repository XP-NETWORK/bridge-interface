/* eslint-disable react/prop-types */

import React, { useState, useRef } from "react";
import { LittleLoader } from "../innercomponents/LittleLoader";
import { useDispatch, useSelector } from "react-redux";

import {
    setBigNumFees,
    setBigNumDeployFees,
} from "../../store/reducers/generalSlice";
import { useEffect } from "react";

import withChains from "../NFTsBoard/hocs";

import { ReactComponent as InfLithComp } from "../../assets/img/icons/Inf.svg";
import BigNumber from "bignumber.js";

import Wservice from "../Widget/wservice";

const intervalTm = 10_000;
const deployFeeIntTm = 30_000;

function SendFees(props) {
    const { serviceContainer, chainSpecificRender } = props;
    const { bridge } = serviceContainer;
    const DeployUserStore = chainSpecificRender?.DeployUserStore;

    const dispatch = useDispatch();
    const balance = useSelector((state) => state.general.balance);

    const to = useSelector((state) => state.general.to);
    const from = useSelector((state) => state.general.from);
    const testnet = useSelector((state) => state.general.testNet);

    const account = useSelector((state) => state.general.account);
    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );

    const widget = useSelector((state) => state.widget.widget);
    const { affiliationFees, affiliationSettings } = useSelector(
        ({ settings }) => ({
            affiliationFees: settings.affiliationFees,
            affiliationSettings: settings.affiliationSettings,
        })
    );

    const [chainWrapper, setChainWrapper] = useState(null);

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
            account,
            widget
                ? {
                      wservice: Wservice(),
                      affiliationFees,
                      affiliationSettings,
                      from,
                  }
                : undefined
        );
        dispatch(setBigNumFees(fees));
        setFees(formatedFees * selectedNFTList.length);
        setLoading(false);
    }

    const estimateDeploy = async (fromChain, toChain, nfts) => {
        nfts = nfts.reduce(
            (acc, nft) => {
                return {
                    items: acc.usedContracts.includes(nft.native.contract)
                        ? acc.items
                        : acc.items.concat(nft),
                    usedContracts: acc.usedContracts.concat(
                        nft.native.contract
                    ),
                };
            },
            {
                items: [],
                usedContracts: [],
            }
        ).items;

        const settled = await Promise.all(
            nfts.map((nft) => fromChain.estimateDeploy(toChain, nft))
        );

        const finalFees = settled.reduce(
            (acc, cur) => ({
                fees: acc.fees.plus(new BigNumber(cur.fees)),
                formatedFees: acc.formatedFees + cur.formatedFees,
            }),
            {
                fees: new BigNumber("0"),
                formatedFees: 0,
            }
        );

        dispatch(setBigNumDeployFees(finalFees.fees.toString(10)));
        setDeployFees(finalFees.formatedFees);
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
            .then((fromChainWrapper) => setChainWrapper(fromChainWrapper));
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

    const renderDeployUserStore =
        !testnet &&
        chainWrapper?.disableWhiteList &&
        DeployUserStore &&
        Boolean(selectedNFTList.length);

    return (
        <div className="fees__container">
            {renderDeployUserStore && (
                <DeployUserStore
                    nft={selectedNFTList.at(-1)}
                    chainWrapper={chainWrapper}
                />
            )}
            <div className="fees">
                <div className="fees__title">Fees</div>
                <div className="fees__bank">
                    {balance ? (
                        <span className="fees__balance">{`Balance: ${balance.toFixed(
                            3
                        )} ${chainWrapper?.chainParams.currencySymbol ||
                            (from?.text === "Gnosis" && "Gnosis")}`}</span>
                    ) : (
                        `Balance: 0 ${chainWrapper?.chainParams
                            .currencySymbol || ""}`
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
                        ${chainWrapper?.chainParams.currencySymbol || ""} 
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
                        <span>
                            {deployFees.toFixed(getNumToFix(deployFees))}
                        </span>
                        <span>{` ${chainWrapper?.chainParams.currencySymbol}`}</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default withChains(SendFees);
