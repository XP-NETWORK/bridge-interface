import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getChainObject } from "../../values";
import { useCheckMobileScreen } from "../../Settings/hooks";

import { getRightPath } from "../../../utils";

import { withServices } from "../../App/hocs/withServices";

import { Chain } from "xp.network";
import {
    setAccount,
    setError,
    setFrom,
} from "../../../store/reducers/generalSlice";

import casperIcon from "../../../assets/img/wallet/casper.svg";

//import { googleAnalyticsCategories, handleGA4Event } from "../../services/GA4";

function CasperWallet({ serviceContainer }) {
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

    const onClickHandler = async () => {
        //lockBtn(true);

        const { CasperWalletProvider } = window;
        const account = {};

        if (!CasperWalletProvider) {
            return dispatch(
                setError({
                    link: {
                        href:
                            "https://chrome.google.com/webstore/detail/casper-wallet/abkahkcbhngaebpcgfmhkoioedceoigp",
                        text: "here",
                    },
                    message: "Install Casper Wallet",
                })
            );
        }

        const [chainWrapper] = await Promise.all([
            bridge.getChain(Chain.CASPER),
        ]);

        const provider = CasperWalletProvider();

        const connection = await provider.requestConnection(); //boolean

        if (!connection)
            return dispatch(
                setError({ message: "Could not establish a connection" })
            );

        account.address = await provider.getActivePublicKey();
        account.signer = provider;
        console.log(provider);
        const x = await chainWrapper.chain.mintNft(account.signer, {
            name: "bane",
            description: "yuha",
            uri: "https://meta.polkamon.com/meta?id=10002366666",
        });

        console.log(x, "x");

        chainWrapper.setSigner(account.signer);
        bridge.setCurrentType(chainWrapper);

        dispatch(setAccount(account.address));

        if (!from) dispatch(setFrom(getChainObject(Chain.CASPER)));

        if (from && to) navigateToAccountRoute();
    };

    const getStyle = () => {
        return {};
    };

    return (
        <>
            <li
                style={isMobile ? { display: "none" } : getStyle()}
                onClick={() => onClickHandler("CasperWallet")}
                className="wllListItem keplr"
                data-wallet="CasperWallet"
            >
                <img src={casperIcon} alt="CasperWallet" />
                <p>Casper Wallet</p>
            </li>
        </>
    );
}

export default withServices(CasperWallet);
