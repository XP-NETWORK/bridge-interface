import BigNumber from "bignumber.js";
import React, { useState, useRef } from "react";
import { LittleLoader } from "../innercomponents/LittleLoader";
import { useDispatch, useSelector } from "react-redux";
import { chainsConfig } from "../values";
<<<<<<< HEAD
import {
  errorToLog,
  getFactory,
  handleChainFactory,
} from "../../wallet/helpers";
=======
import { errorToLog, handleChainFactory } from "../../wallet/helpers";
>>>>>>> temporary
import { setBigNumFees } from "../../store/reducers/generalSlice";
import { useEffect } from "react";

import Wservice from "../Widget/wservice";

const wservice = Wservice();

function SendFees() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.general.balance);

  const to = useSelector((state) => state.general.to);
  const from = useSelector((state) => state.general.from);
  const account = useSelector((state) => state.general.account);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);
  const isToEVM = useSelector((state) => state.general.to).type === "EVM";
  const [fees, setFees] = useState("");
  const Web3Utils = require("web3-utils");
<<<<<<< HEAD

  const [loading, setLoading] = useState(false);

  const elrondAccount = useSelector((state) => state.general.elrondAccount);
=======
  const [loading, setLoading] = useState(false);

  const factory = useSelector((state) => state.general.factory);
  /*const elrondAccount = useSelector((state) => state.general.elrondAccount);
>>>>>>> temporary
  const secretAccount = useSelector((state) => state.general.secretAccount);
  const hederaAccount = useSelector((state) => state.general.hederaAccount);
  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);

<<<<<<< HEAD
  const widget = useSelector((state) => state.widget.widget);
  const { affiliationFees, affiliationSettings } = useSelector(
    ({ settings }) => ({
      affiliationFees: settings.affiliationFees,
      affiliationSettings: settings.affiliationSettings,
    })
  );

=======
>>>>>>> temporary
  const wallet = () => {
    return (
      account ||
      algorandAccount ||
      tezosAccount ||
      elrondAccount ||
      secretAccount ||
      hederaAccount
    );
<<<<<<< HEAD
  };
=======
  };*/
>>>>>>> temporary

  const feesReqInterval = useRef(null);
  async function estimate() {
    const date = new Date();
<<<<<<< HEAD
    let fact;
=======
>>>>>>> temporary
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

<<<<<<< HEAD
      fact = await getFactory();

=======
>>>>>>> temporary
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
<<<<<<< HEAD
          fee = await fact.estimateFees(
=======
          fee = await factory.estimateFees(
>>>>>>> temporary
            fromChain,
            toChain,
            selectedNFTList[0],
            wallet
          );
        } catch (error) {
<<<<<<< HEAD
=======
          console.error(error);
>>>>>>> temporary
          const errBody = {
            type: "Estimate",
            walletAddress: wallet(),
            time: date.toString(),
            fromChain: from.text,
            toChain: to.text,
            message: error,
<<<<<<< HEAD
            nfts: selectedNFTList,
          };
          errorToLog(errBody);
          console.log(error.data ? error.data.message : error.message);
        }
      }

      let bigNum = fee ? fee.multipliedBy(1.1) : undefined; //.integerValue().toString(10) : undefined;

      if (widget) {
        bigNum = wservice.calcExtraFees(
          bigNum,
          from,
          affiliationSettings,
          affiliationFees
        );
      }

      bigNum = bigNum ? bigNum.integerValue().toString(10) : undefined;
=======
          };
          errorToLog(errBody);
        }
      }

      const bigNum = fee
        ? fee
            .multipliedBy(1.1)
            .integerValue()
            .toString(10)
        : undefined;
>>>>>>> temporary

      dispatch(setBigNumFees(bigNum));

      let fees;
      if (
        from.type === "Tron" ||
        from.type === "Algorand" ||
        from.type === "Cosmos"
      ) {
        fees = bigNum / 1e6;
<<<<<<< HEAD
=======
      } else if (from.type === "TON") {
        fees = bigNum / 1e9;
>>>>>>> temporary
      } else {
        fees = bigNum && (await Web3Utils.fromWei(String(bigNum), "ether"));
      }

      fees && setFees(+(fees * selectedNFTList.length));
    } catch (error) {
<<<<<<< HEAD
      const errBody = {
=======
      /*const errBody = {
>>>>>>> temporary
        type: "Estimate",
        walletAddress: wallet(),
        time: date.toString(),
        fromChain: from.text,
        toChain: to.text,
        message: error,
<<<<<<< HEAD
      };
      errorToLog(errBody);
      console.log(error.data ? error.data.message : error.message);
=======
        nfts: selectedNFTList,
      };
      errorToLog(errBody);
      console.log(error.data ? error.data.message : error.message);*/
>>>>>>> temporary
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
    <div className="fees">
      <div className="fees__title">Fees</div>
      <div className="fees__bank">
        {balance ? (
          <span className="fees__balance">{`Balance: ${balance.toFixed(
            3
          )} ${config?.token || (from?.text === "Gnosis" && "Gnosis")}`}</span>
        ) : (
          `Balance: 0 ${config?.token}`
        )}
        {loading ? (
          <LittleLoader />
        ) : (
          <span>
            {`${
              fees && fees > 0
                ? from.key === "Tezos"
                  ? new BigNumber(fees).multipliedBy(1e12).toString()
                  : fees?.toFixed(getNumToFix(fees))
                : "0"
            }
                        ${config?.token} 
                        `}
            {/* ${discountLeftUsd && showDiscount(fees).toFixed(2)} */}
          </span>
        )}
      </div>
    </div>
  );
}

export default SendFees;
