import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Widget.css";

import { setWidget, setWSettings } from "../../store/reducers/generalSlice";
import { chains } from "../values";
import { power } from "../Settings/assets/power.js";

import { withStyles } from "./hocs/withStyles";
import { InitWidget } from "./hocs/init";

import { compose } from "@reduxjs/toolkit";

import WSettings from "../Settings";

function Widget({ setState, widget, settings, wsettings }) {
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

  // useEffect(() => {
  //   if (widget && !wsettings && settings.selectedChains.length === 2) {
  //     setChainsLengthEqauls2(true);
  //     console.log(chains.find((c) => c.text === settings.selectedChains[0]));
  //     setTimeout(
  //       () =>
  //         dispatch(
  //           setFrom(chains.find((c) => c.text === settings.selectedChains[1]))
  //         ),
  //       5
  //     );
  //     setTimeout(
  //       () =>
  //         dispatch(
  //           setTo(chains.find((c) => c.text === settings.selectedChains[0]))
  //         ),
  //       7
  //     );
  //   }
  // }, [widget]);

  useEffect(() => {
    if (
      widget &&
      !wsettings &&
      chains.find((c) => c.text === settings.fromChain) &&
      chains.find((c) => c.text === settings.toChain)
    ) {
      setState.setChainsLengthEqauls2(true);
    }
    if (
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
    }
  }, [settings]);

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

export default compose(InitWidget, withStyles)(Widget);
