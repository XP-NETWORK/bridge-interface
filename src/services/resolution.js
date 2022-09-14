//import Resolution from "@unstoppabledomains/resolution";
import axios from "axios";
import { CHAIN_INFO } from "../components/values";
import { convertOne1 } from "../wallet/helpers";
import store from "../store/store";
import { setAccount } from "../store/reducers/generalSlice";

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
    const { type, key } = to;
    const currency = CHAIN_INFO[key].native;
    const dotExist = domain.lastIndexOf(".");
    if (dotExist === -1) return;
    const ending = domain.slice(domain.lastIndexOf("."), domain.length);
    const isUnstoppableDomain = endings.some((e) => e === ending);
    let address;
    if (isUnstoppableDomain && type !== "EVM") {
        return "notEVM";
    } else if (isUnstoppableDomain && type === "EVM") {
        const data = await fetchData(domain);
        const { multicoinAddresses, addresses } = data;
        switch (currency) {
            case "MATIC":
                address = multicoinAddresses[currency][currency];
                break;
            case "FTM":
                address = multicoinAddresses[currency]["ERC20"];
                break;
            case "ONE":
                const add = multicoinAddresses[currency]["ERC20"];
                address = convertOne1(add);
                break;
            default:
                address = addresses[currency];
                break;
        }
    } else {
        return "invalid";
    }
    if (address) store.dispatch(setAccount(address));
    return address || "undefined";
};

const fetchData = async (domain) => {
    const baseURL = "https://unstoppabledomains.com/api/v1/";

    try {
        const { data } = await axios.get(`${baseURL}${domain}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
