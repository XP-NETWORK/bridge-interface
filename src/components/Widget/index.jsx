import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Widget.css";
import { setSettings } from "../../store/reducers/settingsSlice";
import {
  setWidget,
  setWSettings,
  setFrom,
  setTo,
} from "../../store/reducers/generalSlice";
import { chains } from "../values";
import { power } from "../Settings/assets/power.js";
import mobileBanner from "../Settings/assets/img/mobileOnlyBanner.svg";
import { usePrevious } from "../Settings/hooks";
import { ColorLensTwoTone } from "@mui/icons-material";

const setBanner = () => {};

const mobileOnlyBanner = `
<div class="mobileOnlyBanner"><img src=${mobileBanner} alt="mobileOnlyXP"/><div class="testComp">
    <h2>Widget</h2>
    <p>Mobile is not yet supported, please use widget on desktop.</p>
</div></div>  
`;

const overlay = document.createElement("div");

overlay.classList.add("bannerOverlay");

overlay.innerHTML = mobileOnlyBanner;

export default function Widget() {
  const { widget, wsettings, settings, from, to } = useSelector(
    ({ general: { widget, wsettings, from, to }, settings }) => ({
      widget,
      settings,
      wsettings,
      from,
      to,
    })
  );

  const dispatch = useDispatch();

  const [state, setState] = useState({});

  useEffect(() => {
    // debugger
    const p = new URLSearchParams(window.location.search);
    const widget = p.get("widget") === "true";
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
      const backgroundColor = p.get("background");
      const color = p.get("color");
      const secondaryColor = p.get("secondaryColor");
      const fontFamily = p.get("fontFamily");
      const fontSize = p.get("fontSize");
      const btnColor = p.get("btnColor");
      const btnBackground = p.get("btnBackground");
      const btnRadius = p.get("btnRadius");
      const cardBackground = p.get("cardBackground");
      const cardBackgroundBot = p.get("cardBackgroundBot");
      const cardColor = p.get("cardColor");
      const cardRadius = p.get("cardRadius");
      const accentColor = p.get("accentColor");
      const borderColor = p.get("borderColor");
      const iconColor = p.get("iconColor");
      const tooltipColor = p.get("tooltipColor");
      const tooltipBg = p.get("tooltipBg");
      const showLink = p.get("showLink");
      const chains = p.get("chains")?.split("-");
      const wallets = p.get("wallets")?.split("-");
      const affiliationFees = p.get("affiliationFees");

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
          cardBackgroundBot: "#" + cardBackgroundBot,
          cardColor: "#" + cardColor,
          cardRadius,
          accentColor: "#" + accentColor,
          secondaryColor: "#" + secondaryColor,
          borderColor: "#" + borderColor,
          tooltipColor: "#" + tooltipColor,
          tooltipBg: "#" + tooltipBg,
          iconColor: "#" + iconColor,
          showLink: showLink === "true" ? true : false,
          affiliationFees: ((+affiliationFees - 1) * 100).toFixed(0),
        })
      );
    } else {
      const settings = localStorage.getItem("widgetSettings");
    if (settings) {
      dispatch(setSettings(JSON.parse(settings)));
    }
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
    cardBackgroundBot,
    cardColor,
    cardRadius,
    accentColor,
    secondaryColor,
    borderColor,
    iconColor,
    tooltipColor,
    tooltipBg,
    wallets,
    showLink,
    collapsed,
  } = settings;

  useEffect(() => {
    document.getElementById("poweredId")?.remove();
    const kssa = document.querySelector(".NftSelect");
    const $img = document.createElement("svg");
    $img.innerHTML = power(color);
    if (widget) kssa?.appendChild($img);
  }, [widget, color]);

  useEffect(() => {
    if (widget && !wsettings && settings.selectedChains.length === 2) {
      dispatch(
        setFrom(chains.find((c) => c.text === settings.selectedChains[1]))
      );
      dispatch(
        setTo(chains.find((c) => c.text === settings.selectedChains[0]))
      );
    }
  }, [widget]);

  useEffect(() => {
    if (widget) {
      document.getElementById("bridgeSettings")?.remove();
      const $style = document.createElement("style");
      $style.id = "bridgeSettings";
      document.head.appendChild($style);

      //$img.onclick = window.open("https://xp.network/", "_blank").focus();

      $style.innerHTML = `

      ${
        wsettings
          ? `
          .modal-backdrop.show, .modal {
              width: calc(100% - ${collapsed ? "35" : "300"}px);
              left: initial;
              right: 0;
          }
      
      `
          : ""
      }

      .setting_sidebar {
        font-size: 16px !important;
      
      }
      
      html, body, #root, .App, .nftContainer {
        height: 100%;
      }

      div#root {
        overflow-y: auto;
      }

     .nftSlectContaine.container {
        position: relative;
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
        height: auto;
      }

      .nftSlectArea {
        height: auto;
      }

      .NFTaccount {
        margin: auto;
        padding-top: 80px;
        margin-bottom: 0;
      }

      #poweredId {
        visibility: ${showLink ? "visible" : "hidden"};
        margin-top: 15px;
        width: 150px;
      }
      
      body.bridgeBody {
            display: block;
            background: ${backgroundColor ? backgroundColor : ""};
            color: ${color ? color : ""};
            font-size: ${fontSize ? fontSize + "px" : ""};
            font-family: ${fontFamily ? fontFamily : ""};
        }


        .modal-content, .modal-content .walletListBox, .nftInfBox, .NftSelect, .success-nft-info__wrapper {
            background: ${backgroundColor ? backgroundColor : ""};
            filter: brightness(90%);
        }

        .success-nft-info__wrapper {
          border-color: ${backgroundColor ? backgroundColor : ""};
        }

        .approval, .fees, .selected-nfts-item, .nftListed:hover, .success-info-box {
          background: ${backgroundColor ? backgroundColor : ""};
          filter: brightness(94%);
        }

        .selected-nfts-item:hover, .destination__address input, .chain-hash {
          background: ${backgroundColor ? backgroundColor : ""};
          filter: brightness(92%);
        }

        .wallet-search__container {
          margin-bottom: 5px;
        }

        .infText, .infText:after {
          background: ${tooltipBg ? tooltipBg : ""};
          border: 1px solid ${tooltipBg ? tooltipBg : ""};
          color: ${tooltipColor ? tooltipColor : ""};
        }

        .nft_selectBox, .transfer-board, .destination__address input:focus {
          background: ${backgroundColor ? backgroundColor : ""};
          border-color: ${borderColor ? borderColor : ""};
          filter: brightness(96%);
        }
        
        .modal-title, .modalSelectOptionsText, .selChain, .seleDestiSele, .yourNft, .yourNft span, .sendNftTit, .nfts-item__name, .destination__address input, .destination__address input::placeholder,
        .desChain span, .ComentBox p, .selectedNft span, .approveBtn, .nftFees span, .nftSelecItem, .wllListItem, .nftListed, .chain-switch, .wrongNFT, .opt-in__text, .transferred-nft-hashes span,
         .desAddress input, .nftWornTop h3, .nftWornTop p, .nftInfBox p, .about__text, .ComentBox p, .nonftAcc, .yourNft__title, .destination__title, .nftListed__info .name,
          .nonftAcc  h2,  .transfer-loader__title, .txn-hash, .sucesList span, .selected-nfts__header, .approval__header, .fees__title, 
          .fees span, .listed-view__not-whitelisted__button, .success-info-box, .info-item-chain, .chain-select__box, .desktop__header span {
            color: ${color ? color : ""};
        }

        .nft-box__container--selected, .nft-box__container, .nft__footer {
          color: ${cardColor ? cardColor : ""};

        }

        .desAddress input,  .desAddress input:focus,  .desAddress input:active, .empty__box, .nftChainItem,
        .destination__address input, .chain-switch, .destination-props{
          border-color: ${borderColor ? borderColor : ""};
        }

        .chain-sep__line {
          background: ${borderColor ? borderColor : ""};
        }

        .wllListItem, .themBtn, .selChain, .seleDestiSele, .approval, .fees {
            font-size: ${fontSize ? fontSize + "px" : ""}
        }

        a.themBtn, .nftSelectBox, .modal-content, .widget .destiAddress input, .returnBtn button, 
        .SearchDrop.dropdown .dropdown-menu, .transfer-button--disabled, .clear-selected, .connect-wallet__button--disabled  {
            border-radius: ${btnRadius ? btnRadius + "px" : ""};
        }

        a.themBtn:hover, .switching:hover, .connect-wallet__button:hover, .transfer-button:hover {
          filter: brightness(115%);
          background:  ${btnBackground ? btnBackground : ""};
          color:  ${btnColor ? btnColor : ""};
        }
        
       .connectNft a.themBtn.disabled, .sendNftBox :not(.nftSendBtn.disabled) > a.themBtn, .switching, 
       .mobileOnly  .nftSendBtn > a.themBtn, .connect-wallet__button {
            background: ${btnBackground ? btnBackground : ""};
            color:  ${btnColor ? btnColor : ""};
            border-color: ${btnBackground ? btnBackground : ""};   
        }

        .connect-wallet__button--disabled, .transfer-button--disabled {
          border-color: ${btnColor ? btnColor : ""};   
          color:  ${btnColor ? btnColor : ""};
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
         .walletalgotitle, .transfer-loader__title, .tn-process__message, .custom-success-modal__header,  {
            font-size: ${fontSize ? fontSize * 1.12 + "px" : ""}
        }

        .videoLink, .about_Nft, .nftAut a,.aleartBox, .SearchDrop.dropdown input, .nftCont span, 
        .nftInfBox label, .nftInfBox p, .nftInfBox label, .bluTextBtn, .label, .details, .transferTable.table tbody tr td, .ComentBox p, 
        .changeBtn, a.disconBtn, .nft-box__container, .nft-box__container--selected, .success-buttons {
            font-size: ${fontSize ? fontSize * 0.87 + "px" : ""}
        }

        #collecSlideCont, #footer, #aboutnft, #tttt, #Header, #alertb, .get-featured, .slider__wrapper, .stickers   {
            display:none;
        }

        .first-step__container {
          margin-top: 0;
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

        .nft-image__container, .preload__image, .nft__main, .skeleton__image, .skeleton__name, .skeleton__number {
          background: ${cardBackground ? cardBackground : ""};
        }

        .preload__name, .preload__number {
          background: ${cardBackground ? cardBackground : ""};
          filter: brightness(85%);
        }

        .singleNft, .preload__container, .nft__card, .nft-box__wrapper, .nft__card--selected, .nft__card, .nft__card--selected, .skeleton {
          border-radius: ${cardRadius ? cardRadius + "px" : ""};
        }

        .not-whitelisted__wrapper, .claimable-card__wrapper {
          backdrop-filter: unset;
        }


        .nft-box__container, .nft-box__container--selected,  .empty__box, .nft-box__wrapper {
          -webkit-border-radius: ${cardRadius ? cardRadius + "px" : ""}
        }

     

        .nft-image__container {
          border-top-left-radius:  ${cardRadius ? cardRadius + "px" : ""};
          border-top-right-radius:  ${cardRadius ? cardRadius + "px" : ""};
        }

        .nft-content__container, .preload__content, .nft__footer, .skeleton__content {
          background: ${cardBackgroundBot ? cardBackgroundBot : ""};
          
        }

        .approvTop, .nftFees, .SearchDrop.dropdown input,
         .destiAddress input::placeholder, .nftInfBox label, .sucesList label, .switchingAcc p, .transferTable.table thead th,
         .transferTable.table tr td, .accountBox p, .brocken-url, .clearNft, .clear-selected {
          color: ${secondaryColor ? secondaryColor : ""};
        }

        .listed-view__not-whitelisted__button {
          background: ${secondaryColor ? secondaryColor : ""};
        } 

        .selectAll, .nftAut a, .loader, .changeNetwork-loader, .coming__chain, .follow-us__btn, .transferred-nft-hashes a,
        .ts-button, .sucesList .colBlue, .success-button.view-txn-btn, .bluTextBtn, .success-hash, .pending {
          color: ${accentColor ? accentColor : ""} !important; 
        }

        .successIcon path {
          fill: ${accentColor ? accentColor : ""} !important; 
        }

        /*.chainArrow img {
          background: ${backgroundColor ? backgroundColor : ""};
          filter: brightness(130%);
        }

        .chainArrow img:hover, .clear-selected {
          background: ${btnBackground ? btnBackground : ""};
          filter: initial;
        }*/
        
        .clear-selected  {
          background: ${btnBackground ? btnBackground : ""};
          color:  ${btnColor ? btnColor : ""};
        }

        .searchChain input, .searchChain input::placeholder, .searchChain input:focus  {
          background: transparent;
          color: ${color ? color : ""}; 
        
        }

        ::-webkit-scrollbar-thumb, .approveBtn input:checked + label {
          background: ${accentColor ? accentColor : ""};
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${accentColor ? accentColor : ""};
          filter: brightness(85%);
        }

        .singleNft.missing {
          background: initial;
        }

        .svgWidget path, .svgWidget rect, .swpBtn path:nth-child(2), .select-all svg path {
          fill: ${iconColor ? iconColor : ""};
        }

        .swpBtn path:first-child {
          fill: ${btnBackground ? btnBackground : ""};
          filter: brightness(95%);
        }

     
        
        .swpBtn path:nth-child(3)  {
          fill: #ffffff;
        }

        .svgWidget.lineArrow line{
            stroke: ${borderColor ? borderColor : ""}
        }

        .svgWidget:hover {
          filter: brightness(135%);
        }

        .swpBtn:hover path:nth-child(1){
          fill: ${btnBackground ? btnBackground : ""};
        
        }

        .SearchDrop:hover svg path, .CloseIcon:hover svg path, .select-all:hover svg path, .delete-all:hover svg path, .delete-all svg path {
          fill:  ${iconColor ? iconColor : ""};
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

        span.not-whitelisted__text {
          color: ${secondaryColor ? secondaryColor : ""};
          filter: brightness(200%);
        }

        a.not-whitelisted__button {
          background: ${secondaryColor ? secondaryColor : ""};
    
        }


        .nftSelectBox, .modal-content, .modal-header, .nftChainList, .singleNft.missing, .nftInfBox, .wllListItem  {
          border-color: ${borderColor ? borderColor : ""};
          box-shadow: none;
        
        }

        .nftSelectBox {
          border: solid ${borderColor ? borderColor : ""};
          border-width: 1px;
          filter: unset;
          opacity: 1;
      
        }
        
         .modal-header {
           border-bottom: none;
         }

        .searchChain input {
          border: 1px solid ${borderColor ? borderColor : ""};
         
        }

        .svgWidgetBorder line {
            stroke: ${borderColor ? borderColor : ""};
        }

   
        .selChain > div:hover:after {
          /*filter: brightness(5);*/
         
        }

        .selChain:hover, .chain-switch, .refresh-button, .SearchDrop, .change-view__button, .listed-nft-radio::after,
         .select-all, .checkCircle, .CloseIcon, .delete-all , .nftList{
          background: ${backgroundColor ? backgroundColor : ""};
         
        }

        .refresh-button--disabled {
            display:flex;
        }

        .refresh-button--disabled svg {
          margin: auto;
        }

        .refresh-button, .SearchDrop, .change-view__button, .select-all, .nft__card--selected, .nft__card, .nft__footer, .delete-all {
          border-color:  ${borderColor ? borderColor : ""};
        }

        .refresh-button:hover svg path, .approval__inf:hover svg path, .list-icon:hover svg path, .grid-icon:hover svg rect, .NFTInf:hover svg path, .swap-chain__btn:hover svg rect  {
          fill: ${iconColor ? iconColor: ''};
          /*ilter: brightness(115);*/
        }

        .serchInput {
          background: ${backgroundColor ? backgroundColor : ""};
          border-color: ${borderColor ? borderColor : ""};
        }

        .wllListItem:hover {
          background: initial;
          border: 1px solid  ${borderColor ? borderColor : ""};
        }

        .approve-loader__container__text {

          color: ${color ? color : ""};
        }

        .approve-loader {
            border-left: ${color ? "0.5em solid " + color : ""}
        }

        .nftInfBox {
          filter: brightness(95%);
        }

        .returnBtn button {
          border-color: ${color ? color : ""};
          color:  ${color ? color : ""};
        }

       

        @media only screen and (max-width: 860px) {
          .mobSearch input::placeholder, .mobileOnly.seleNftMob {
            color: ${secondaryColor ? secondaryColor : ""};
          }


        }

        @media only screen and (max-height: 633px) {
          .modal-dialog {
            margin-top: 6vh;
          }
        }

        `;
      document.body.classList.remove("widgetBlur");
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
