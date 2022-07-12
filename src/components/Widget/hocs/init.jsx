import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkRgbaIn } from "../../Settings/helpers";

import {
    setWidget,
    setWSettings,
} from "../../../store/reducers/generalSlice";
import { setSettings } from "../../../store/reducers/settingsSlice";
import mobileBanner from "../../Settings/assets/img/mobileOnlyBanner.svg";

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


export const InitWidget = (Wrapped) => {


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



    return function CB() {

        const dispatch = useDispatch()
        const { widget, wsettings, settings } = useSelector(
            ({ general: { widget, wsettings, from, to }, settings }) => ({
                widget,
                settings,
                wsettings,
                from,
                to
            })
        );


        useEffect(() => {

            const p = new URLSearchParams(window.location.search);
            const wid = p.get("wid")
            const widget = p.get("widget") === "true" || wid;
            const wsettings = p.get("wsettings") === "true";

            if (widget && wsettings && window.innerWidth <= 600) {
                document.body.appendChild(overlay);
                document.body.style.pointerEvents = "none";
            }

            if (widget && wsettings && window.innerWidth > 600) {
                dispatch(setWSettings(true));
                document.querySelector(".nftContainer").style = "margin-left: 300px";
            }

            if (widget && !wsettings) {
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
                    chains,
                    fromChain,
                    toChain,
                    wallets,
                    affiliationFees } = !wid ? initFromQuery() : () => ({})

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
                        selectedChains: chains.map((c) => (c === "Gnosis" ? "xDai" : c)),
                        selectedWallets: wallets,
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
            } else {
                const settings = localStorage.getItem("widgetSettings");
                if (settings) {
                    dispatch(setSettings(JSON.parse(settings)));
                }
            }

            if (widget) {
                dispatch(setWidget(true));
                document.body.classList.add("widget");
            }
        }, []);




        return <Wrapped widget={widget} wsettings={wsettings} settings={settings} />
    }
} 