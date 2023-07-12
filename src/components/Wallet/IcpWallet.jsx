import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getChainObject } from "../values";
import { useCheckMobileScreen } from "../Settings/hooks";

import { getRightPath } from "../../utils";

import { withServices } from "../App/hocs/withServices";

import { Chain } from "xp.network";
import {
    setAccount,
    setError,
    setFrom,
    setAuthModalLoader,
} from "../../store/reducers/generalSlice";

import plugIcon from "../../assets/img/wallet/plug.svg";
import stoic from "../../assets/img/wallet/stoic.svg";
//import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function IcpWallet({ serviceContainer }) {
    const { bridge } = serviceContainer;
    const isMobile = useCheckMobileScreen();
    const from = useSelector((state) => state.general.from);
    const to = useSelector((state) => state.general.to);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigateToAccountRoute = () => {
        const path = getRightPath();
        navigate(path);
    };
    /* const dispatch = useDispatch();


    const [lockedBtn, lockBtn] = useState(false);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    //const NONE = { display: "none" };

    const from = useSelector((state) => state.general.from);
    const temporaryFrom = useSelector((state) => state.general.temporaryFrom);
    const testnet = useSelector((state) => state.general.testNet);
    const navigate = useNavigate();

    const navigateToAccountRoute = () => {
        const path = getRightPath();
        navigate(path);
    };*/

    const connectors = {
        Plug: async (chainWrapper) => {
            const { ic } = window;
            if (!ic?.plug) {
                dispatch(
                    setError({
                        message:
                            "You have to install Plug wallet into your browser",
                    })
                );
                return;
            }

            const account = {};
            await ic.plug.requestConnect().catch((e) => {
                dispatch(setError(e));
            });

            const user = ic.plug.sessionManager.sessionData;
            account.address = user.principalId;
            account.signer = ic.plug;
            const prepareAgent = async (canisterId) => {
                await ic.plug.createAgent({
                    host: "https://ic0.app",
                    whitelist: [
                        "ryjl3-tyaaa-aaaaa-aaaba-cai",
                        canisterId,
                        chainWrapper.chain.getParams().bridgeContract.toText(),
                    ],
                });
                console.log("2");
            };
            chainWrapper.prepareAgent = prepareAgent;

            return account;
        },
        Stoic: async () => {
            const lib = await import("ic-stoic-identity");
            const { StoicIdentity } = lib;
            return new Promise((resolve) => {
                StoicIdentity.load().then(async (identity) => {
                    if (identity !== false) {
                        //ID is a already connected wallet!
                    } else {
                        //No existing connection, lets make one!
                        identity = await StoicIdentity.connect();
                    }

                    //Lets display the connected principal!
                    const account = {};
                    //console.log(identity.getPrincipal().toText());
                    account.address = identity.getPrincipal().toText();
                    account.signer = identity;

                    resolve(account);
                });
            });
        },
    };

    const onClickHandler = async (wallet) => {
        try {
            dispatch(setAuthModalLoader(true));

            const [chainWrapper] = await Promise.all([
                bridge.getChain(Chain.DFINITY),
            ]);

            const connect = connectors[wallet];
            const account = await connect(chainWrapper);
            dispatch(setAuthModalLoader(false));
            if (!account) return;

            chainWrapper.setSigner(account.signer);
            bridge.setCurrentType(chainWrapper);

            dispatch(setAccount(account.address));

            if (!from) dispatch(setFrom(getChainObject(Chain.DFINITY)));

            if (from && to) navigateToAccountRoute();
        } catch {
            dispatch(setAuthModalLoader(false));
        }
    };

    const getStyle = () => {
        return {};
    };

    return (
        <>
            <li
                style={isMobile ? { display: "none" } : getStyle()}
                onClick={() => onClickHandler("Plug")}
                className="wllListItem keplr"
                data-wallet="Plug"
            >
                <img src={plugIcon} alt="Plug" />
                <p>Plug</p>
            </li>

            <li
                style={isMobile ? { display: "none" } : getStyle()}
                onClick={() => onClickHandler("Stoic")}
                className="wllListItem keplr"
                data-wallet="Stoic"
            >
                <img src={stoic} alt="Plug" />
                <p>Stoic</p>
            </li>
        </>
    );
}

export default withServices(IcpWallet);
