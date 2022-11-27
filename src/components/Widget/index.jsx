import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Widget.css";

import { setWSettings } from "../../store/reducers/widgetSlice";
import { chains } from "../values";
import { power } from "../Settings/assets/power.js";

import { withStyles } from "./hocs/withStyles";
import { InitWidget } from "./hocs/init";

import { compose } from "@reduxjs/toolkit";

import WSettings from "../Settings";

import { setFrom, setTo } from "../../store/reducers/generalSlice";

import PropTypes from "prop-types";

function Widget({ setState, widget, settings, wsettings, wid }) {
  const { NFTList } = useSelector(({ general: { NFTList } }) => ({
    NFTList,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    //document.getElementById("poweredId")?.remove();
    //document.querySelectorAll(".poweredLogo").forEach((e) => e.remove());
    document.querySelectorAll(".poweredWRapper").forEach((e) => e.remove());
    const kssa = document.querySelector(".NftSelect");
    const board = document.querySelector(".transfer-board");
    const $img = document.createElement("svg");
    $img.classList.add("poweredWRapper");
    $img.innerHTML = power(settings.color);
    if (widget) {
      kssa?.appendChild($img);
      board?.appendChild($img);
    }
  }, [widget, settings.color, NFTList]);

  useEffect(() => {
    const from = chains.find((c) => c.text === settings.fromChain);
    const to = chains.find((c) => c.text === settings.toChain);
    if ((widget || wid) && !wsettings && (from || to)) {
      setState.setChainsLengthEqauls2(true);
      from && setState.setIsFrom(true);
      to && setState.setIsTo(true);
      from &&
        dispatch(setFrom(chains.find((c) => settings.fromChain === c.text)));

      to && dispatch(setTo(chains.find((c) => settings.toChain === c.text)));
    }
    /*  if (
      widget &&
      !wsettings &&
      chains.find((c) => c.text === settings.fromChain)
    ) {
      setState.setIsFrom(true);
    }
    if (
      widget &&
      !wsettings &&
      chains.find((c) => c.text === settings.toChain)
    ) {
      setState.setIsTo(true);
    }*/
  }, [settings.fromChain, settings.toChain]);

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

  return <>{wsettings && <WSettings />}</>;
}

Widget.propTypes = {
  setState: PropTypes.any,
  widget: PropTypes.bool,
  settings: PropTypes.any,
  wsettings: PropTypes.bool,
  wid: PropTypes.string,
};

export default compose(InitWidget, withStyles)(Widget);
