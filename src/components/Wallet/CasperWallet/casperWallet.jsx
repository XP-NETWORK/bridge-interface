import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getChainObject, proxy } from "../../values";
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
        navigate(getRightPath(bridge.network));
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
        console.log(provider);

        const connection = await provider.requestConnection(); //boolean

        if (!connection)
            return dispatch(
                setError({ message: "Could not establish a connection" })
            );

        account.address = await provider.getActivePublicKey();
        account.signer = provider;
        chainWrapper.chain.setProxy(proxy);

        chainWrapper.setSigner(account.signer);
        bridge.setCurrentType(chainWrapper);

        false &&
            (await chainWrapper.chain.mintNft(account.signer, {
                contract:
                    "hash-23ecf377ab0de596cbda5b6e1cdfd230bad2f8eee688d7b5902bd560ffd96b4e",
                uri: "https://meta.polkamon.com/meta?id=10002366568",
            }));

        /* console.log(await chainWrapper.chain.validateAddress(account.address));

        console.log(
            await chainWrapper.chain.validateAddress(
                "7954a874c26170cce3759deaa8f443ddcb9e354d5ed603ead669f64890d47d57"
            )
        );

        console.log(
            chainWrapper.chain.convertToAccountHash(
                "7954a874c26170cce3759deaa8f443ddcb9e354d5ed603ead669f64890d47d57"
            ),
            "d"
        );*/

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
