import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Widget.css";
import "./WidgetNight.css";
import "./WidgetLight.css";
import { setSettings } from "../../store/reducers/settingsSlice";
import { setWidget, setWSettings } from "../../store/reducers/generalSlice";

import { power } from "../Settings/assets/power.js";

export default function Widget() {
  const { widget, wsettings, settings } = useSelector(
    ({ general: { widget, wsettings }, settings }) => ({
      widget,
      settings,
      wsettings,
    })
  );

  const dispatch = useDispatch();

  const [state, setState] = useState({});

  useEffect(() => {
    // debugger
    const p = new URLSearchParams(window.location.search);
    const widget = p.get("widget") === "true";
    const wsettings = p.get("wsettings") === "true";

    if (widget && wsettings && window.innerWidth > 600) {
      dispatch(setWSettings(true));
      document.querySelector(".nftContainer").style = "margin-left: 300px";
    }

    if (widget && !wsettings) {
      const backgroundColor = p.get("background");
      const color = p.get("color");
      const secondaryColor = p.get("secondaryColor");
      const fontFamily = p.get("fontFamily");
      const fontSize = p.get("fontSize");
      const btnColor = p.get("btnColor");
      const btnBackground = p.get("btnBackground");
      const btnRadius = p.get("btnRadius");
      const cardBackground = p.get("cardBackground");
      const cardRadius = p.get("cardRadius");
      const accentColor = p.get("accentColor");
      const borderColor = p.get("borderColor");
      const iconColor = p.get("iconColor");
      const showLink = p.get("showLink");
      const chains = p.get("chains")?.split("-");
      const wallets = p.get("wallets")?.split("-");
      console.log(showLink);

      dispatch(
        setSettings({
          backgroundColor: "#" + backgroundColor,
          color: "#" + color,
          fontFamily,
          fontSize,
          btnColor: "#" + btnColor,
          btnBackground: "#" + btnBackground,
          btnRadius,
          selectedChains: chains,
          selectedWallets: wallets,
          cardBackground: "#" + cardBackground,
          cardRadius,
          accentColor: "#" + accentColor,
          secondaryColor: "#" + secondaryColor,
          borderColor: "#" + borderColor,
          iconColor: "#" + iconColor,
          showLink: showLink === "true" ? true : false,
        })
      );
    }
    if (widget) {
      onlyBridge();
    }
  }, []);

  const {
    backgroundColor,
    color,
    fontFamily,
    fontSize,
    btnColor,
    btnBackground,
    btnRadius,
    selectedChains,
    selectedWallets,
    cardBackground,
    cardRadius,
    accentColor,
    secondaryColor,
    borderColor,
    iconColor,
    wallets,
    showLink,
  } = settings;

  useEffect(() => {
    document.getElementById("poweredId")?.remove();
    const kssa = document.querySelector(".NftSelect");
    const $img = document.createElement("svg");
    $img.innerHTML = power(color);
    if (widget) kssa?.appendChild($img);
  }, [widget, color]);

  useEffect(() => {
    if (widget) {
      document.getElementById("bridgeSettings")?.remove();
      const $style = document.createElement("style");
      $style.id = "bridgeSettings";
      document.head.appendChild($style);

      //$img.onclick = window.open("https://xp.network/", "_blank").focus();

      $style.innerHTML = `
      
      html, body, #root, .App, .nftContainer {
        height: 100%;
      }


      .nftContainer {
        position:relative;
        margin-top: 0;

      }

      .NftSelect {
        position: absolute;
        top: 50%;
        right:50%;
        transform: translate(50%,-50%);


      }

      #poweredId {
        visibility: ${showLink ? "visible" : "hidden"};
        margin-top: 15px;
        width: 150px;
      }
      
      body.bridgeBody {
            background: ${backgroundColor ? backgroundColor : ""};
            color: ${color ? color : ""};
            font-size: ${fontSize ? fontSize + "px" : ""};
            font-family: ${fontFamily ? fontFamily : ""}
        }


        .modal-content, .modal-content .walletListBox, .nftInfBox {
            background: ${backgroundColor ? backgroundColor : ""};
        }
        
        .modal-title, .modalSelectOptionsText, .selChain, .seleDestiSele, .yourNft, .yourNft span, .sendNftTit, 
        .desChain span, .ComentBox p, .selectedNft span, .approveBtn, .nftFees span, .nftSelecItem, .wllListItem, .nftListed,
         .desAddress input, .nftWornTop h3, .nftWornTop p, .nftInfBox p, .about__text, .ComentBox p, .nonftAcc,
          .nonftAcc  h2, .nft-box__container--selected, .nft-box__container, .transfer-loader__title {
            color: ${color ? color : ""};
        }

        .desAddress input,  .desAddress input:focus,  .desAddress input:active, .empty__box {
          border-color: ${borderColor ? borderColor : ""};
        }

        .wllListItem, .themBtn {
            font-size: ${fontSize ? fontSize + "px" : ""}
        }

        a.themBtn, .nftSelectBox, .modal-content, .widget .destiAddress input {
            border-radius: ${btnRadius ? btnRadius + "px" : ""};
        }

        a.themBtn:hover, .switching:hover {
          filter: brightness(115%);
          background:  ${btnBackground ? btnBackground : ""};
          color:  ${btnColor ? btnColor : ""};
        }
        
       .connectNft a.themBtn.disabled, .sendNftBox :not(.nftSendBtn.disabled) > a.themBtn, .switching, 
       .mobileOnly  .nftSendBtn > a.themBtn {
            background: ${btnBackground ? btnBackground : ""};
            color:  ${btnColor ? btnColor : ""};
            border-color: ${btnBackground ? btnBackground : ""};   
        }


        a.themBtn.disabled span {
          position: relative;
          top: 1px;
        }

        .disabled .themBtn.disabled, .sendNftBox .nftSendBtn.disabled > a.themBtn,
        .mobileOnly  .nftSendBtn.disabled > a.themBtn
        {
          background: ${btnBackground ? btnBackground : ""};
          color:  ${btnColor ? btnColor : ""};
          border-color: ${btnBackground ? btnBackground : ""};
          opacity: .5;
        }

        .modal-title.h4, .yourNft, .yourNft span, h3, .yourNft__chain span:first-child, .transTitle h3,
         .walletalgotitle, .transfer-loader__title, .tn-process__message, .custom-success-modal__header {
            font-size: ${fontSize ? fontSize * 1.12 + "px" : ""}
        }

        .videoLink, .about_Nft, .nftAut a,.aleartBox, .SearchDrop.dropdown input, .nftCont span, 
        .nftInfBox label, .nftInfBox p, .nftInfBox label, .bluTextBtn, .label, .details, .transferTable.table tbody tr td, .ComentBox p, 
        .changeBtn, a.disconBtn, .nft-box__container, .nft-box__container--selected, .success-buttons {
            font-size: ${fontSize ? fontSize * 0.87 + "px" : ""}
        }

        #collecSlideCont, #footer, #aboutnft, #tttt, #Header, #alertb, .get-featured   {
            display:none;
        }

        .modal-backdrop.show {
          opacity: 0;
        }

        .nftChainItem, .wllListItem {
          display: none;
        }

        ${selectedChains
          ?.map((chain) => `.nftChainItem[data-chain="${chain}"]`)
          .join(", ")} {
          display: flex;
        }

        ${selectedWallets
          ?.map((wallet) => `li[data-wallet="${wallet}"]`)
          .join(", ")} {
          display: flex;
        }

        .nft-image__container {
          background: ${cardBackground ? cardBackground : ""};
        }

        .singleNft {
          border-radius: ${cardRadius ? cardRadius + "px" : ""};
        }

        .nft-box__container, .nft-box__container--selected,  .empty__box {
          -webkit-border-radius: ${cardRadius ? cardRadius + "px" : ""}
        }

        .nft-image__container {
          border-top-left-radius:  ${cardRadius ? cardRadius + "px" : ""};
          border-top-right-radius:  ${cardRadius ? cardRadius + "px" : ""};
        }

        .nft-content__container {
          background: ${cardBackground ? cardBackground : ""};
          filter: brightness(115%);
        }

        .approvTop, .nftFees, .SearchDrop.dropdown input, .yourNft__title,
         .destiAddress input::placeholder, .nftInfBox label, .sucesList label, .switchingAcc p, .transferTable.table thead th,
         .transferTable.table tr td, .accountBox p, .brocken-url {
          color: ${secondaryColor ? secondaryColor : ""};
        }

        .preload__name, .preload__number {
          background: ${secondaryColor ? secondaryColor : ""};
        } 

        .selectAll, .clearNft, .nftAut a, .loader, .changeNetwork-loader, .coming__chain, .follow-us__btn, .ts-button {
          color: ${accentColor ? accentColor : ""};
        }

        /*.chainArrow img {
          background: ${backgroundColor ? backgroundColor : ""};
          filter: brightness(130%);
        }

        .chainArrow img:hover {
          background: ${btnBackground ? btnBackground : ""};
          filter: initial;
        }*/
        

        .searchChain input {
          background: transparent;
          color: ${secondaryColor ? secondaryColor : ""}; 
        
        }

        ::-webkit-scrollbar-thumb {
          background: ${accentColor ? accentColor : ""};
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${accentColor ? accentColor : ""};
          filter: brightness(85%);
        }

        .singleNft.missing {
          background: initial;
        }

        .svgWidget path {
          fill: ${iconColor ? iconColor : ""};
        }

        .swpBtn path:first-child {
          fill: ${btnBackground ? btnBackground : ""};
          filter: brightness(95%);
        }

        .swpBtn path:nth-child(2) {
          fill: ${btnBackground ? btnBackground : ""};
          filter: brightness(95%);
        }
        
        .swpBtn path:nth-child(3)  {
          fill: #ffffff;
        }

        .svgWidget:hover {
          filter: brightness(125%);
        }

        .swpBtn:hover path:nth-child(1){
          fill: ${btnBackground ? btnBackground : ""};
        
        }

        .swpBtn:hover path:nth-child(2){
          fill: ${btnBackground ? btnBackground : ""};
          filter: brightness(100%);
        }

        .nft-box__container--selected, .nft-box__container:hover {
          border-color: ${accentColor ? accentColor : ""} !important;
        }

        .svgWidget.trg {
          width:10px;
          height:10px;
        }


        .nftSelectBox, .modal-content, .modal-header, .nftChainList, .singleNft.missing, .nftInfBox, .wllListItem  {
          border-color: ${borderColor ? borderColor : ""};
        }

        .searchChain input {
          border: 1px solid ${borderColor ? borderColor : ""};
         
        }

        .svgWidgetBorder line {
            stroke: ${borderColor ? borderColor : ""};
        }

        .selChain > div:hover:after {
          filter: brightness(5);
         
        }

        .wllListItem:hover {
          background: initial;
          border: 1px solid  ${borderColor ? borderColor : ""};
        }


        @media only screen and (max-width: 860px) {
          .mobSearch input::placeholder, .mobileOnly.seleNftMob {
            color: ${secondaryColor ? secondaryColor : ""};
          }


        }

        `;
    }
  }, [widget, settings]);

  const screenSize = useRef();

  useEffect(() => {
    const handler = () => {
      screenSize.current = window.innerWidth;

      if (screenSize.current < 600) {
        dispatch(setWSettings(false));
        document.querySelector(".nftContainer").style = "margin-left: 0px";
      } else if (wsettings === false) {
        dispatch(setWSettings(true));
        document.querySelector(".nftContainer").style = "margin-left: 300px";
      }
    };
    if (new URLSearchParams(window.location.search).get("wsettings")) {
      window.addEventListener("resize", handler);
    }
    return () => window.removeEventListener("resize", handler);
  }, []);

  const onlyBridge = () => {
    dispatch(setWidget(true));
    document.body.classList.add("widget");
  };

  return <></>;
}
