//import Resolution from "@unstoppabledomains/resolution";
import axios from "axios";

import { setReceiver } from "../store/reducers/generalSlice";
import store from "../store/store";
import { convertOne1 } from "../wallet/helpers";

const endings = [
  ".crypto",
  ".nft",
  ".wallet",
  ".blockchain",
  ".x",
  ".bitcoin",
  ".dao",
  ".888",
  ".zil",
];

export const getFromDomain = async (domain, to) => {
  const { chainParams } = to;
  const currency = chainParams.currencySymbol;
  const dotExist = domain.lastIndexOf(".");
  const isNear = /^\S+\.(testnet|near)$/
  if (dotExist === -1 || isNear) return;
  const ending = domain.slice(domain.lastIndexOf("."), domain.length);
  const isUnstoppableDomain = endings.some((e) => e === ending);
  let address;
  if (isUnstoppableDomain && chainParams.type !== "EVM") {
    return "notEVM";
  } else if (isUnstoppableDomain && chainParams.type === "EVM") {
    const data = await fetchData(domain);
    const { records } = data;
    switch (currency) {
      case "MATIC":
        address = records[`crypto.MATIC.version.ERC20.address`];
        break;
      case "FTM":
        address = records[currency][`crypto.FTM.version.ERC20.address`];
        break;
      case "ONE":
        address = convertOne1(
          records[currency][`crypto.ONE.version.ERC20.address`]
        );
        break;
      default:
        address = records[`crypto.${currency}.address`];
        break;
    }
  } else {
    return "invalid";
  }
  if (address) store.dispatch(setReceiver(address));

  return address || "undefined";
};

export const fetchData = async () => {
  var config = {
    method: "get",
    url:
      "https://resolve.unstoppabledomains.com/domains/rodiong-xpnetwork.blockchain",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_UNSTOP_BARER}`,
    },
  };

  try {
    const { data } = await axios(config);

    return data;
  } catch (error) {
    console.log(error);
  }
};
