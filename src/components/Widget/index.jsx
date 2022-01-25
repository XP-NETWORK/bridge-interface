import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Widget.css";
import "./WidgetNight.css";
import "./WidgetLight.css";
import { setWidget } from "../../store/reducers/generalSlice";
import { keys } from "@airgap/beacon-sdk/dist/cjs/utils/utils";

export default function Widget() {
  const reg = new RegExp(/^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/gi);
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const step = useSelector((state) => state.general.step);
  const {
    showChainModal,
    widget,
    account,
    NFTList,
    selectedNFTList,
    approved,
  } = useSelector(
    ({
      general: {
        showChainModal,
        widget,
        account,
        NFTList,
        selectedNFTList,
        approved,
      },
    }) => ({
      showChainModal,
      widget,
      account,
      NFTList,
      selectedNFTList,
      approved,
    })
  );
  const dispatch = useDispatch();

  const [state, setState] = useState({});

  const changePalette = (palette) => {
    document.body.classList.add(`${palette}-palette`);
  };

  const changeFontSize = (fontSize) => {
    document.body.classList.add(`font-size-${fontSize}`);
  };

  const changeButtons = (config) => {
    const btn = document.querySelector("a.themBtn");
    Object.keys(config).forEach((key) => {
      const pre = key === "borderRadius" ? "" : "#";
      const after = key === "borderRadius" ? "px" : "";
      if (btn && config[key]) console.log(config[key]);
      btn.style[key] = pre + String(config[key]) + after;
    });
  };

  const changeMain = (config) => {
    Object.keys(config).forEach((key) => {
      const pre = key === "borderRadius" ? "#" : "#";
      const after = key === "borderRadius" ? "" : "";
      console.log(config[key]);
      if (config[key])
        document.body.style[key] = pre + String(config[key]) + after;
    });
  };

  const changeBgc = (elements, color) => {
    if (!elements.length) elements = [elements];
    elements.forEach((el) => {
      return (el.style.background = "#" + color);
    });
  };

  const changeColor = (elemnts, color) => {
    if (!elemnts.length) elemnts = [elemnts];
    //if (!elemnts.length) return (elemnts.style.color = "#" + color);
    elemnts.forEach((el) => {
      return (el.style.color = "#" + color);
    });
  };

  useEffect(() => {
    // debugger
    const p = new URLSearchParams(window.location.search);
    const widget = p.get("widget") === "true";
    //const body = document.getElementsByTagName("body");

    // const nftSelectBox = document.querySelector(".nftSelectBox")

    if (widget) {
      const backgroundColor = p.get("background");
      const color = p.get("color");
      const fontFamily = p.get("fontFamily");
      const fontSize = p.get("fontSize");
      const btnColor = p.get("btnColor");
      const btnBackground = p.get("btnBackground");
      const btnRadius = p.get("btnRadius");
      setState({
        backgroundColor,
        color,
        fontFamily,
        fontSize,
        btnColor,
        btnBackground,
        btnRadius,
      });

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
  } = state;

  useEffect(() => {
    if (widget) {
      const $style = document.createElement("style");
      document.head.appendChild($style);
      $style.innerHTML = `body.bridgeBody {
            background: ${backgroundColor ? "#" + backgroundColor : ""};
            color: ${color ? "#" + color : ""};
            font-size: ${fontSize ? fontSize + "px" : ""};
            font-family: ${fontFamily ? fontFamily : ""}
        }

        .modal-content, .modal-content .walletListBox {
            background: ${backgroundColor ? "#" + backgroundColor : ""};
        }
        
        .modal-title, .modalSelectOptionsText, .selChain, .seleDestiSele, .yourNft, .yourNft span, .sendNftTit, 
        .desChain span, .ComentBox p, .selectedNft span, .approveBtn, .nftFees span, .nftSelecItem, .wllListItem, .nftListed, .desAddress input {
            color: ${color ? "#" + color : ""};
        }

        .desAddress input {
            border-color: ${color ? "#" + color : ""};
        }

        .wllListItem {
            font-size: ${fontSize ? fontSize + "px" : ""}
        }

        a.themBtn {
            border-radius: ${btnRadius ? btnRadius + "px" : ""};
        }
        
        .connectNft a.themBtn.disabled, .sendNftBox :not(.nftSendBtn.disabled) > a.themBtn {
            background: ${btnBackground ? "#" + btnBackground : ""};
            color:  ${btnColor ? "#" + btnColor : ""};
            border-color: ${btnBackground ? "#" + btnBackground : ""};
            
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
        
        `;
    }
  }, [widget]);

  const onlyBridge = () => {
    dispatch(setWidget(true));
    // if(step === 1)document.getElementById('collecSlideCont')?.remove()//!Collection in the bottom
    /* if (document.getElementById("footer"))
      document.getElementById("footer")?.remove();
    if (document.getElementById("aboutnft"))
      document.getElementById("aboutnft")?.remove();
    // if(document.getElementById('#'))document.getElementById('tttt')?.remove()//! Tittle
    // if(document.getElementById('Header'))document.getElementById('Header')?.remove() //! Navbar
    // if(document.getElementById('alertb'))document.getElementById('alertb')?.remove() //!Alert*/
    document.body.classList.add("widget");
  };
  return <></>;
}
