import React from "react";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import plugIcon from "../../assets/img/wallet/plug.svg";
//import { connectKeplr } from "./ConnectWalletHelper";
//import { getChainObject } from "../values";
import { useCheckMobileScreen } from "../Settings/hooks";

//import { getRightPath, promisify } from "../../utils";

import { withServices } from "../App/hocs/withServices";

import { Chain } from "xp.network";
import {
    //setAccount,
    setError,
} from "../../store/reducers/generalSlice";

//import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function IcpWallet({ serviceContainer }) {
    const { bridge } = serviceContainer;
    const isMobile = useCheckMobileScreen();
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
        wallet;
        //lockBtn(true);
        const account = {};
        const [chainWrapper] = await Promise.all([
            bridge.getChain(Chain.DFINITY),
        ]);
        chainWrapper;
        const { ic: provider } = window;
        if (!provider?.plug) {
            dispatch(
                setError({
                    message:
                        "You have to install Plug wallet into your browser",
                })
            );
            return;
        }

        //let connected = await provider.plug.isConnected();
        // console.log(connected, "connected");
        //if (!connected) {
        await provider.plug.requestConnect().catch((e) => {
            dispatch(setError(e));
        });

        // if (connectionData) connected = true;
        //}

        //if (true) {
        const user = provider.plug.sessionManager.sessionData;
        account.address = user.principalId;
        //const agent = await provider.plug.agent._identity;
        const principalId = await provider.plug.agent.getPrincipal();
        console.log(principalId, "principalId");

        const address = chainWrapper.chain.getAccountIdentifier(
            account.address
        );
        console.log(address, "address");
        const signer = await provider.plug.agent._identity;
        const nfts = await chainWrapper.chain.nftList(
            "tc446-lek6d-tkkcf-dqjfl-bax66-5wfwr-mgnyf-6u3dr-4ibue-zky4o-6qe",
            "evkdu-lqaaa-aaaak-qasva-cai"
        );
        console.log(nfts);
        false &&
            (await chainWrapper.chain.preTransfer(signer, {
                collectionIdent: "rppv3-yqaaa-aaaan-qcx4q-cai",
                native: {
                    tokenId: "10666",
                    canisterId: "ewuhj-dqaaa-aaaag-qahgq-cai",
                },
            }));
        //}
        //lockBtn(false);

        /*if (signer) {
            chainWrapper.setSigner(signer);
            bridge.setCurrentType(chainWrapper);
            navigateToAccountRoute();
            dispatch(setConnectedWallet(wallet));
        }*/
        // close();
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
