import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setChainModal,
  setDepartureOrDestination,
} from "../../store/reducers/generalSlice";
import Jazzicon from "react-jazzicon";

export default function SetDestination() {
  const to = useSelector((state) => state.general.to);
  const dispatch = useDispatch();

  const [seed, setSeed] = useState();

  useEffect(() => {

    const _seed = Math.round(Math.random() * 10000000);
    if (!seed) setSeed(_seed);

  }, []);

  const handleShow = (str) => {
    dispatch(setChainModal(true));

    str === "departure"
      ? dispatch(setDepartureOrDestination("departure"))
      : dispatch(setDepartureOrDestination("destination"));
      console.log(to);


  };
  return (
    <div
      className="selChain seleDesti"
      onClick={() => handleShow("destination")}
    >
      {to ? (
        <div className="seleDestiSele">
          <img style={{ width: "28px" }} src={to.image.src} alt="" />
          {to.text}
        </div>
      ) : (
        <div className="seleDestiSele">
          <Jazzicon diameter={28} seed={seed} />
          {window.innerWidth >= 600
            ? "Select Destination chain"
            : "Destination chain"}
        </div>
      )}
    </div>
  );
}
