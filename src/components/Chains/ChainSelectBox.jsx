import React, { useState } from "react";
import LineArrow from "../../assets/img/nftSelect/Line.svg";
import ChainArrow from "../../assets/img/icons/Swap.svg";
import SwapHover from "../../assets/img/icons/SwapHover.svg";
import SwapPressed from "../../assets/img/icons/SwapPressed.svg";
import { useDispatch } from "react-redux";
import {
  setTo,
  setFrom,
} from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import SetDeparture from "./SetDeparture"
import SetDestination from "./SetDestination";
import { ReactComponent as LineArrowComp } from "../../assets/img/nftSelect/Line.svg";
import { ReactComponent as ChainArrowComp } from "../../assets/img/icons/Swap.svg";
import ChainListBox from "./ChainListBox";

export default function ChainSelectBox() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const widget = useSelector((state) => state.general.widget);
  const [swapHover, setSwapHover] = useState();
  const [swapDown, setSwapDown] = useState();

  const switchChains = (e) => {
    e.preventDefault();
    const temp = to;
    dispatch(setTo(from));
    dispatch(setFrom(temp));
  };

  return (
    <>
    <ChainListBox />
    <div className="nftSelectBox">
      <SetDeparture />
      {from && to ? (
        <span
          onMouseDown={() => setSwapDown(true)}
          onMouseUp={() => setSwapDown(false)}
          onMouseOut={() => setSwapHover(false)}
          onMouseOver={() => setSwapHover((prev) => !prev)}
          onClick={(e) => switchChains(e)}
          className="chainArrow"
        >
          {widget ? (
            <ChainArrowComp className="svgWidget swpBtn" />
          ) : (
            <img
              src={swapDown ? SwapPressed : swapHover ? SwapHover : ChainArrow}
              alt=""
            />
          )}
        </span>
      ) : (
        <span className="chainArrow">
          {widget ? (
            <ChainArrowComp className="svgWidget swpBtn" />
          ) : (
            <img src={ChainArrow} alt="arrow-swap" />
          )}
        </span>
      )}
      <span className="LineArrow">
        {widget ? (
          <LineArrowComp className="svgWidget lineArrow" />
        ) : (
          <img src={LineArrow} alt="" />
        )}
      </span>
      <SetDestination />
    </div>
    </>
  );
}
