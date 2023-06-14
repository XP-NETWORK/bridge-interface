import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import plugIcon from "../../assets/img/wallet/plug.svg";

import { getChainObject } from "../values";
import { useCheckMobileScreen } from "../Settings/hooks";

import { getRightPath } from "../../utils";

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

        chainWrapper.setSigner(account.signer);
        bridge.setCurrentType(chainWrapper);

        dispatch(setAccount(account.address));

        if (!from) dispatch(setFrom(getChainObject(Chain.DFINITY)));

        if (from && to) navigateToAccountRoute();
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
