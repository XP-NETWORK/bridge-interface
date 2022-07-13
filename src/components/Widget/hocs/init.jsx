import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkRgbaIn } from "../../Settings/helpers";

import {
    setWidget,
    setWSettings,
    setWid
} from "../../../store/reducers/generalSlice";
import { setSettings } from "../../../store/reducers/settingsSlice";
import mobileBanner from "../../Settings/assets/img/mobileOnlyBanner.svg";
import axios from 'axios';
import { ethers } from 'ethers'

import { initialState as initialWidget } from "../../../store/reducers/settingsSlice"


const backend = 'https://xpnetwork-widget.herokuapp.com'

//.nft-list__wrappera
const mobileOnlyBanner = `
<div class="mobileOnlyBanner"><img src=${mobileBanner} alt="mobileOnlyXP"/><div class="testComp">
    <h2>Widget</h2>
    <p>Mobile is not yet supported, please use widget on desktop.</p>
</div></div>  
`;

const overlay = document.createElement("div");

overlay.classList.add("bannerOverlay");

overlay.innerHTML = mobileOnlyBanner;

function initFromQuery() {
    const p = new URLSearchParams(window.location.search);

    const settings = {
        backgroundColor: p.get("background"),
        panelBackground: p.get("panelBackground"),
        modalBackground: p.get("modalBackground"),
        color: p.get("color"),
        fontFamily: p.get("fontFamily"),
        fontSize: p.get("fontSize"),
        btnColor: p.get("btnColor"),
        btnBackground: p.get("btnBackground"),
        btnRadius: p.get("btnRadius"),
        selectedChains: p.get("chains")?.split("-"),
        selectedWallets: p.get("wallets")?.split("-"),
        cardBackground: p.get("cardBackground"),
        cardBackgroundBot: p.get("cardBackgroundBot"),
        cardColor: p.get("cardColor"),
        cardRadius: p.get("cardRadius"),
        accentColor: p.get("accentColor"),
        secondaryColor: p.get("secondaryColor"),
        borderColor: p.get("borderColor"),
        tooltipColor: p.get("tooltipColor"),
        tooltipBg: p.get("tooltipBg"),
        iconColor: p.get("iconColor"),
        showLink: p.get("showLink"),
        affiliationFees: p.get("affiliationFees"),
        fromChain: p.get("from"),
        toChain: p.get("to"),
    }

    return settings
}

async function initFormId(id) {

    if (id === 'create' && window.ethereum) {

        console.log('ds');

        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
        });

        //const acc = await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const msg = "Please sign in order to see your widgets";
        const [signature, address] = await Promise.all([signer.signMessage(msg), signer.getAddress()]);


        console.log(signature, address);

        const res = await axios.post(
            `${backend}/addWidget`,
            {
                address,
                signature,
                widget: initialWidget,
            }
        ).catch((e) => ({}))


        if (!res.data) { }//show error msg
        return
    }


    const res = await axios.get(
        `${backend}/getWidget?widgetId=${id}`).catch((e) => ({}))

    return res?.data?.settings || initialWidget


}


export const InitWidget = (Wrapped) => {



    return function CB() {

        const dispatch = useDispatch()
        const { widget, wsettings, settings, wid } = useSelector(
            ({ general: { widget, wsettings, from, to, wid }, settings }) => ({
                widget,
                settings,
                wsettings,
                wid,
                from,
                to
            })
        );


        useEffect(() => {

            const p = new URLSearchParams(window.location.search);
            const wid = p.get("wid")
            const widget = p.get("widget") === "true" || wid;
            const wsettings = p.get("wsettings") === "true";

            if (widget) {

                if (wsettings && window.innerWidth <= 600) {
                    document.body.appendChild(overlay);
                    document.body.style.pointerEvents = "none";
                }

                if (wsettings && window.innerWidth > 600) {
                    dispatch(setWSettings(true));
                    document.querySelector(".nftContainer").style = "margin-left: 300px";
                }



                dispatch(setWidget(true));
                wid && dispatch(setWid(wid))
                document.body.classList.add("widget");


            }

        }, []);


        useEffect(() => {

            let settings;

            widget && (async () => {
                if (!wsettings) {
                    settings = wid ? await initFormId(wid) : initFromQuery()
                } else {
                    // const settings = localStorage.getItem("widgetSettings"); //get from api
                    /*if (settings) {
                        dispatch(setSettings(JSON.parse(settings)));
                    }*/
                    const widget = await initFormId(wid);
                }


                const { backgroundColor,
                    panelBackground,
                    modalBackground,
                    color,
                    secondaryColor,
                    fontFamily,
                    fontSize,
                    btnColor,
                    btnBackground,
                    btnRadius,
                    cardBackground,
                    cardBackgroundBot,
                    cardColor,
                    cardRadius,
                    accentColor,
                    borderColor,
                    iconColor,
                    tooltipColor,
                    tooltipBg,
                    showLink,
                    selectedChains,
                    fromChain,
                    toChain,
                    selectedWallets,
                    affiliationFees } = settings

                dispatch(
                    setSettings({
                        backgroundColor: checkRgbaIn("#" + backgroundColor),
                        panelBackground: checkRgbaIn("#" + panelBackground),
                        modalBackground: checkRgbaIn("#" + modalBackground),
                        color: checkRgbaIn("#" + color),
                        fontFamily,
                        fontSize: fontSize.replace(/\D/g, ""),
                        btnColor: checkRgbaIn("#" + btnColor),
                        btnBackground: checkRgbaIn("#" + btnBackground),
                        btnRadius: btnRadius.replace(/\D/g, ""),
                        selectedChains: selectedChains.map((c) => (c === "Gnosis" ? "xDai" : c)),
                        selectedWallets,
                        cardBackground: checkRgbaIn("#" + cardBackground),
                        cardBackgroundBot: checkRgbaIn("#" + cardBackgroundBot),
                        cardColor: checkRgbaIn("#" + cardColor),
                        cardRadius: cardRadius.replace(/\D/g, ""),
                        accentColor: checkRgbaIn("#" + accentColor),
                        secondaryColor: checkRgbaIn("#" + secondaryColor),
                        borderColor: checkRgbaIn("#" + borderColor),
                        tooltipColor: checkRgbaIn("#" + tooltipColor),
                        tooltipBg: checkRgbaIn("#" + tooltipBg),
                        iconColor: checkRgbaIn("#" + iconColor),
                        showLink: showLink === "true" ? true : false,
                        affiliationFees: ((+affiliationFees - 1) * 100).toFixed(0),
                        fromChain: fromChain,
                        toChain: toChain,
                    })
                );

            })()

        }, [widget, wsettings, wid])




        return <Wrapped widget={widget} wsettings={wsettings} settings={settings} />
    }
} 