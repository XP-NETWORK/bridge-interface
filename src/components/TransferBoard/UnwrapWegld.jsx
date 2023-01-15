import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUnwrappedEGold,
  setWrappedEGold,
} from "../../store/reducers/generalSlice";

import { withServices } from "../App/hocs/withServices";
import { Chain } from "xp.network";

export default withServices(function UnwrapWegld({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const wrappedEGold = useSelector((state) => state.general.wrappedEGold);

  const [unwrapping, setUnwrapping] = useState("");
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const [dots, setDots] = useState("");

  const dispatch = useDispatch();

  const unwrapWegld = async () => {
    setUnwrapping(true);
    const chainWrapper = await bridge.getChain(Chain.ELROND);

    try {
      const unwrapped = await chainWrapper.unwrapWegld(wrappedEGold);
      if (unwrapped) {
        dispatch(setUnwrappedEGold(wrappedEGold));
        dispatch(setWrappedEGold(""));
        setUnwrapping(false);
      }
    } catch (error) {
      setUnwrapping(false);

      console.error(error);
    }
  };

  const handleClick = () => {
    unwrapWegld();
  };

  useEffect(() => {
    let interval;
    if (unwrapping) {
      interval = setInterval(() => {
        if (dots?.length !== 3) {
          setDots(dots + ".");
        } else if (dots?.length === 3) {
          setDots("");
        }
      }, 500);
      setTimeout(() => {
        clearInterval(interval);
        setUnwrapping(false);
      }, "20000");
    }
    if (!unwrapping) clearInterval(interval);
    return () => clearInterval(interval);
  });

  return wrappedEGold ? (
    <div
      style={unwrapping ? OFF : {}}
      onClick={handleClick}
      className="unwrapWegld"
    >
      {!unwrapping ? (
        <div>Unwrap eGold</div>
      ) : (
        <div style={{ width: "100px" }}>{`Unwrapping${dots}`}</div>
      )}
    </div>
  ) : (
    ""
  );
});
