/* eslint-disable react/prop-types */

import React, { useState, useRef } from "react";
import { LittleLoader } from "../innercomponents/LittleLoader";
import { useDispatch, useSelector } from "react-redux";

import { setBigNumFees } from "../../store/reducers/generalSlice";
import { useEffect } from "react";

import { withServices } from "../App/hocs/withServices";

const intervalTm = 10_000;

function SendFees(props) {
  const { serviceContainer } = props;

  const { bridge } = serviceContainer;

  const dispatch = useDispatch();
  const balance = useSelector((state) => state.general.balance);

  const to = useSelector((state) => state.general.to);
  const from = useSelector((state) => state.general.from);
  const account = useSelector((state) => state.general.account);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);

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

    console.log(fees, formatedFees);

    dispatch(setBigNumFees(fees));
    setFees(formatedFees * selectedNFTList.length);

    /* let fee;
    TODO
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
      
   */
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

  //const config = chainsConfig[from?.text];

  useEffect(() => {
    bridge
      .getChain(from.nonce)
      .then((fromChainWrapper) => setChainParams(fromChainWrapper.chainParams));
  }, []);

  useEffect(() => {
    console.log(selectedNFTList);

    if (!selectedNFTList.length) {
      setFees("0");
      return clearInterval(interval.current);
    }

    selectedNFTList.length &&
      (async () => {
        const [fromChainWrapper, toChainWrapper] = await Promise.all([
          bridge.getChain(from.nonce),
          bridge.getChain(from.nonce),
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
    <div className="fees">
      <div className="fees__title">Fees</div>
      <div className="fees__bank">
        {balance ? (
          <span className="fees__balance">{`Balance: ${balance.toFixed(
            3
          )} ${chainParams?.currency ||
            (from?.text === "Gnosis" && "Gnosis")}`}</span>
        ) : (
          `Balance: 0 ${chainParams?.currency || ""}`
        )}
        {loading ? (
          <LittleLoader />
        ) : (
          <span>
            {`${fees && fees > 0 ? fees?.toFixed(getNumToFix(fees)) : "0"}
                        ${chainParams?.currency || ""} 
                        `}
            {/* ${discountLeftUsd && showDiscount(fees).toFixed(2)} */}
          </span>
        )}
      </div>
    </div>
  );
}

export default withServices(SendFees);
