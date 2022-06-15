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
import { useLocation } from "react-router";

//.nft-list__wrapper
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
  const { widget, wsettings, settings, NFTList } = useSelector(
    ({ general: { widget, wsettings, from, to, NFTList }, settings }) => ({
      widget,
      settings,
      wsettings,
      from,
      to,
      NFTList,
    })
  );

  const dispatch = useDispatch();

  const location = useLocation();

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
      const panelBackground = p.get("panelBackground");
      const modalBackground = p.get("modalBackground");
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
          panelBackground: "#" + panelBackground,
          modalBackground: "#" + modalBackground,
          color: "#" + color,
          fontFamily,
          fontSize: fontSize.replace(/\D/g,''),
          btnColor: "#" + btnColor,
          btnBackground: "#" + btnBackground,
          btnRadius: btnRadius.replace(/\D/g,''),
          selectedChains: chains,
          selectedWallets: wallets,
          cardBackground: "#" + cardBackground,
          cardBackgroundBot: "#" + cardBackgroundBot,
          cardColor: "#" + cardColor,
          cardRadius: cardRadius.replace(/\D/g,''),
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
    panelBackground,
    modalBackground,
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
    //document.getElementById("poweredId")?.remove();
    //document.querySelectorAll(".poweredLogo").forEach((e) => e.remove());
    document.querySelectorAll(".poweredWRapper").forEach((e) => e.remove());
    const kssa = document.querySelector(".NftSelect");
    const board = document.querySelector(".transfer-board");
    const $img = document.createElement("svg");
    $img.classList.add("poweredWRapper");
    $img.innerHTML = power(color);
    if (widget) {
      kssa?.appendChild($img);
      board?.appendChild($img);
    }
  }, [widget, color, NFTList]);

  useEffect(() => {
    if (widget && !wsettings && settings.selectedChains.length === 2) {
      console.log(chains.find((c) => c.text === settings.selectedChains[0]));
      setTimeout(
        () =>
          dispatch(
            setFrom(chains.find((c) => c.text === settings.selectedChains[1]))
          ),
        5
      );
      setTimeout(
        () =>
          dispatch(
            setTo(chains.find((c) => c.text === settings.selectedChains[0]))
          ),
        7
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
      console.log(location.pathname);
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
      
        overflow-y: ${
          !location.pathname.includes("account") ? "hidden" : "auto"
        };
      }

      #root {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
      }

      #root::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
      }

     .nftSlectContaine.container {
        position: relative;
        width: 90%;
        max-width: 95%;
      }

      .sendNftCol {
        padding-right: 0;
      }


      .nftContainer {
        position:relative;
        margin-top: 0;

      }

      .nft-list__wrapper {
        justify-content: center;
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
        padding-top: 107px;
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


        .modal-content, .modal-content .walletListBox, .nftInfBox, .success-nft-info__wrapper, .accountBox  {
            background: ${modalBackground ? modalBackground : ""};
            filter: brightness(90%);
        }

        .success-nft-info__wrapper {
          border-color: ${backgroundColor ? backgroundColor : ""};
        }

        .NftSelect, .navbar-connect, .mobile-col, .mobile-col__tittle, .mobile-col__header, .mobile-nfts__header, .mobile-search__top {
          background: ${panelBackground ? panelBackground : ""};
        
        }

        .selChain:hover {
          background: ${panelBackground ? panelBackground : ""};
          filter: brightness(105%);
        }

        .selChain:hover {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .approval, .fees, .selected-nfts-item, .nftListed:hover, .mobile-destination__address input, .wllListItem, .mobile-search-input__box input.serchInput, .selected-nfts__button, .success-info-box, .chain-switch, .destination__address input, .navbar-connect:hover, .import-nft__form input[type="text"]{
          background: ${panelBackground ? panelBackground : ""};
          filter: brightness(94%);
        }

        .selected-nfts-item:hover,  .chain-hash, .serchInput, .mobile-destination__address input:focus, .mobile-search-input__box input.serchInput:focus  {
          background: ${panelBackground ? panelBackground : ""};
          filter: brightness(92%);
        }

        .mobile-destination__address input:focus {
          outline:none;
          border-color: ${borderColor ? borderColor : ""};
        }

        .wallet-search__container {
          margin-bottom: 5px;
          width:auto;
        }

        .magnify {
          background-image: unset;
          width: unset;
          height: unset;
        }

        .infText, .infText:after, .approval__inf:hover::before, .approval__inf:hover::after {
          background: ${tooltipBg ? tooltipBg : ""};
          border: 1px solid ${tooltipBg ? tooltipBg : ""};
          color: ${tooltipColor ? tooltipColor : ""};
        }

        .nft_selectBox, .transfer-board, .destination__address input:focus, .accountBox , .mobile-col .approval,
        .mobile-nfts__header, .mobile-col__header, .mobile-col__tittle, .mobile-destination__container, .mobile-col .fees {
          background: ${panelBackground ? panelBackground : ""};
          border-color: ${borderColor ? borderColor : ""};
          
        }
        
        .modal-title, .modalSelectOptionsText, .selChain, .seleDestiSele, .yourNft, .yourNft span, .sendNftTit, .nfts-item__name, .destination__address input, .destination__address input::placeholder,
        .desChain span, .ComentBox p, .selectedNft span, .approveBtn, .nftFees span, .nftSelecItem, .wllListItem, .nftListed, .chain-switch, .wrongNFT, .opt-in__text, .transferred-nft-hashes span,
         .desAddress input, .nftWornTop h3, .nftWornTop p, .nftInfBox p, .about__text, .ComentBox p, .nonftAcc, .yourNft__title, .destination__title, .nftListed__info .name,
          .nonftAcc  h2,  .transfer-loader__title, .txn-hash, .sucesList span, .selected-nfts__header, .approval__header, .fees__title, .clip p,
          .fees span, .listed-view__not-whitelisted__button, .success-info-box, .accountTit, .accountBox p, .mobile-destination__address input,
          .info-item-chain, .chain-select__box, .desktop__header span, .account-modal__account,  .navbar-connect, 
          .import-nft__form, .import-nft__form form, .import-nft__form input[type="text"], .mobile-destination__address input::placeholder {
            color: ${color ? color : ""};
        }

        .nft-box__container--selected, .nft-box__container, .nft__footer {
          color: ${cardColor ? cardColor : ""};

        }

        .desAddress input,  .desAddress input:focus,  .desAddress input:active, .empty__box, .nftChainItem, .mobile-search-input__box input.serchInput,
        .destination__address input, .chain-switch, .destination-props, .NftSelect, .mobile-destination__address input, .close__btn .CloseIcon,
        .serchInput, .navbar-connect, .navbar-connect:hover, .import-nft__form input[type="text"], .selected-nfts__button {
          border-color: ${borderColor ? borderColor : ""};
        }

        .chain-sep__line {
          background: ${borderColor ? borderColor : ""};
        }

        .wllListItem, .themBtn, .selChain, .seleDestiSele, .approval, .fees {
            font-size: ${fontSize ? fontSize + "px" : ""}
        }

        a.themBtn, .nftSelectBox, .modal-content, .widget .destiAddress input, .returnBtn button, 
        .SearchDrop.dropdown .dropdown-menu, .transfer-button--disabled, .clear-selected, 
        .connect-wallet__button--disabled, .switching, .chain-switch, .transfer-button, .listed-view__not-whitelisted__button, .navbar-connect  {
            border-radius: ${btnRadius ? btnRadius + "px" : ""};
        }

        a.themBtn:hover, .switching:hover, .connect-wallet__button:hover,.transfer-button,  .transfer-button:hover, .import-nft__buttons .btn-import {
          filter: brightness(115%);
          background:  ${btnBackground ? btnBackground : ""};
          color:  ${btnColor ? btnColor : ""};
          opacity: 1;
        }

        .listed-nft-radio--selected {
          background: ${iconColor? iconColor : ""};
          filter: brightness(145%);
        }

        .chain-switch {
          box-shadow: none;
        }


        .chain-switch, .nonftAcc h2, .nonftAcc span {
          font-family: ${fontFamily ? fontFamily : ""};
        }

        .transfer-button, .transfer-button--disabled{
          opacity: .8;
          background:  ${btnBackground ? btnBackground : ""};
          color:  ${btnColor ? btnColor : ""};
        }
        
       .connectNft a.themBtn.disabled, .sendNftBox :not(.nftSendBtn.disabled) > a.themBtn, .switching, 
       .mobileOnly  .nftSendBtn > a.themBtn, .connect-wallet__button, .accountBtn button {
            background: ${btnBackground ? btnBackground : ""};
            color:  ${btnColor ? btnColor : ""};
            border-color: ${btnBackground ? btnBackground : ""};   
        }

        .accountBtn button:hover{
          background: ${btnBackground ? btnBackground : ""};
            color:  ${btnColor ? btnColor : ""};
            border-color: ${btnBackground ? btnBackground : ""};
            filter: brightness(92%);
        }

         .transfer-button--disabled, .transfer-button {
          border-color: ${btnColor ? btnColor : ""};   
          color:  ${btnColor ? btnColor : ""};
        }

        .connect-wallet__button--disabled, .import-nft__buttons .btn-cancel {
          border-color: ${btnBackground ? btnBackground : ""};   
          color:  ${btnBackground ? btnBackground : ""};
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

        .desti-alert input {
          border-color: ${borderColor} !important;
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

        .navbar-connect {
          position: absolute;
          top: -55px;
          right: 0;
          width: 200px;
        
        }


        .first-step__container {
          margin-top: 0;
        }

        .modal-backdrop.show {
          opacity: 0;
        }

        .nftChainItem, .wllListItem {
          display: none;
          cursor: pointer;
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
         .transferTable.table tr td, .brocken-url, .clearNft, .clear-selected {
          color: ${secondaryColor ? secondaryColor : ""};
        }



        .listed-view__not-whitelisted__button {
          background: ${secondaryColor ? secondaryColor : ""};
        } 

        .selectAll, .nftAut a, .loader, .changeNetwork-loader, .coming__chain, .follow-us__btn, .transferred-nft-hashes a,
        .ts-button, .sucesList .colBlue, .success-button.view-txn-btn, .bluTextBtn, .success-hash, .pending, .broken__text {
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

        .clear-selected:hover {
          background: ${btnBackground ? btnBackground : ""};
          color:  ${btnColor ? btnColor : ""};
          filter: brightness(94%);
        }

        .searchChain input, .searchChain input::placeholder, .searchChain input:focus  {
          background: transparent;
          color: ${color ? color : ""}; 
        
        }

        .searchChain input:focus, input.serchInput:focus {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb, .approveBtn input:checked + label {
          background: ${iconColor ? iconColor : ""};
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

        .svgWidget.stroke path {
          stroke:  ${iconColor ? iconColor : ""};
        }

        .svgWidget.swpBtn rect {
          fill: ${btnBackground ? btnBackground : ""};
          filter: brightness(95%);
        }

        .svgWidget.swpBtn path {
          fill: white !important;
          opacity: 1;
        }

        .svgWidget.swpBtn:hover rect {
          fill: ${btnBackground ? btnBackground : ""};
          filter: brightness(105%);
        }

        .clip, .clip p {
          background: ${cardBackgroundBot ? cardBackgroundBot : ""};
          color: ${cardColor ? cardColor : ""} !important;
        }

        .clip ::before, .clip ::after {
          box-shadow: inset 0 0 0 2px ${iconColor ? iconColor : ""};
        }
        


        .svgWidget.lineArrow line{
            stroke: ${borderColor ? borderColor : ""}
        }

        .svgWidget:hover {
          filter: brightness(125%);
        }

        .swap-chain__btn:hover:before {
          display: none;
        }



        .SearchDrop:hover svg path, .CloseIcon:hover svg path, .select-all:hover svg path, .delete-all:hover svg path, .delete-all svg path {
          fill:  ${iconColor ? iconColor : ""};
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

        .nftSelectBox, .modal-content {
          border: 1px solid ${borderColor ? borderColor : ""} !important;
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

         .refresh-button, .SearchDrop, .change-view__button, .listed-nft-radio::after,
         .select-all, .checkCircle, .CloseIcon, .delete-all , .nftList, .import-nft-button, .search-button {
          background: ${backgroundColor ? backgroundColor : ""};
         
        }

        .refresh-button--disabled {
            display:flex;
        }

        .refresh-button--disabled svg {
          margin: auto;
        }

        .refresh-button, .SearchDrop, .change-view__button, .select-all, .nft__card--selected, .nft__card, .nft__footer, .delete-all, div.import-nft-button, .search-button {
          border-color:  ${borderColor ? borderColor : ""} !important;
        }
      
        .import-nft-button {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .refresh-button:hover svg path, .approval__inf:hover svg path, .list-icon:hover svg path, .grid-icon:hover svg rect, .NFTInf:hover svg path, .swap-chain__btn:hover svg rect  {
          fill: ${iconColor ? iconColor : ""};
          /*ilter: brightness(115);*/
        }

        .list-icon, .grid-icon {
          background-image: none;
          display: flex;
          justify-content: center;
          align-items: center;
          j
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

        .accountBox {
          top: -2px;
          right: -2px;
        }

        .nft__card, .nft__card--selected, .skeleton {
          width: 192px;
        }

        

        @media only screen and (max-width: 1024px) {
          .nft__card, .nft__card--selected, .skeleton {
            width: 180px;
          }

          .serchInput {
            width: 120px;
          }

          .sendNftCol {
            margin-top: 0;
            padding-left: 15px;
          }
        }

       
        @media only screen and (max-width: 980px) {
            .sendNftCol {
              margin-top: 15px;
              padding-left: 0px;
            }
        }


        @media only screen and (max-width: 860px) {


          .mobSearch input::placeholder, .mobileOnly.seleNftMob {
            color: ${secondaryColor ? secondaryColor : ""};
          }


        }


        @media only screen and (max-width: 764px) {

          .nft__card, .nft__card--selected, .skeleton {
            width: 172px;
          }

 

          .switching {
            width: auto;
            padding: 8px 12px;
          }

          .modal-content {
            margin-top: 20vh;
          }
          
          .nft-list__wrapper {
            height: 300px;
      
          }

          .nonftAcc img {
            height: 100px
          }

          .nftListBox {
            max-height: 350px;
          }

          .nft-list__wrapper::-webkit-scrollbar {
            width: 0; 
            background: transparent; 
          }

          .nft-list__wrapper::-webkit-scrollbar-thumb {
            background: #FF0000;
          }

        }




        @media only screen and (max-width: 400px) {

          .nft__card, .nft__card--selected, .skeleton {
            width: 152px;
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
  }, [widget, settings, location]);

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
