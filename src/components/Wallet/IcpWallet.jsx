import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import plugIcon from "../../assets/img/wallet/plug.svg";
//import { connectKeplr } from "./ConnectWalletHelper";
import { getChainObject } from "../values";
import { useCheckMobileScreen } from "../Settings/hooks";

//import { getRightPath, promisify } from "../../utils";

import { withServices } from "../App/hocs/withServices";

import { Chain } from "xp.network";
import {
    setAccount,
    setError,
    setFrom,
} from "../../store/reducers/generalSlice";

//import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function IcpWallet({ serviceContainer }) {
    const { bridge } = serviceContainer;
    const isMobile = useCheckMobileScreen();
    const from = useSelector((state) => state.general.from);
    const dispatch = useDispatch();
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

    const onClickHandler = async (wallet) => {
        //lockBtn(true);

        const [chainWrapper] = await Promise.all([
            bridge.getChain(Chain.DFINITY),
        ]);

        const { ic } = window;
        const connectores = {
            Plug: async () => {
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

                return account;
            },
        };

        const connect = connectores[wallet];

        const account = await connect();
        console.log(account, "account");

        chainWrapper.setSigner(account.signer);
        bridge.setCurrentType(chainWrapper);

        dispatch(setAccount(account.address));

        if (!from) {
            dispatch(setFrom(getChainObject(Chain.DFINITY)));
        }

        //navigateToAccountRoute();

        //const agent = await provider.plug.agent._identity;

        /* await provider.plug.createAgent({
            host: "https://ic0.app",
            whitelist: [
                "evkdu-lqaaa-aaaak-qasva-cai",
                "ryjl3-tyaaa-aaaaa-aaaba-cai",
            ],
        });
        const signer = await provider.plug.agent;
        signer.provider = window.ic.plug;

        /*const res = await chainWrapper.chain.mintNft(signer, {
            uri: "https://meta.polkamon.com/meta?id=10002366712",
        });

        console.log(res, "res");

        const nfts = await chainWrapper.chain.nftList(
            "x7rsp-47alk-amnwa-5cvdj-hjghg-xgcpk-ztmob-s3vjd-ghice-yl2ic-qae",
            "evkdu-lqaaa-aaaak-qasva-cai"
        );

        console.log(nfts);
        /*
        
        const res = await chainWrapper.chain.preTransfer(signer, {
            collectionIdent: "evkdu-lqaaa-aaaak-qasva-cai",
            native: {
                tokenId: "11",
                canisterId: "evkdu-lqaaa-aaaak-qasva-cai",
            },
        });

        console.log(res, "res");
        //}
        //lockBtn(false);



        /*if (signer) {
            chainWrapper.setSigner(signer);
            bridge.setCurrentType(chainWrapper);
            navigateToAccountRoute();
            dispatch(setConnectedWallet(wallet));
        }
        // close();

        const res = await chainWrapper.chain.transferNftToForeign(
            signer,
            7,
            "0xFe6bcdF43396A774836D98332d9eD5dA945f687e",
            {
                collectionIdent: "evkdu-lqaaa-aaaak-qasva-cai",
                native: {
                    tokenId: "11",
                    canisterId: "evkdu-lqaaa-aaaak-qasva-cai",
                },
            },
            new BigNumber("23"),
            "0xFe6bcdF43396A774836D98332d9eD5dA945f687e"
        );

        console.log(res, "res");*/
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
        </>
    );
}

export default withServices(IcpWallet);
