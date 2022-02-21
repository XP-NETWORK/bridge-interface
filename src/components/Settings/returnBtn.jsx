import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setReset } from "../../store/reducers/generalSlice";

export const ReturnBtn = () => {
  const dispatch = useDispatch();
  const widget = useSelector((state) => state.general.widget);

  return widget ? (
    <div className="returnBtn">
      <button onClick={() => dispatch(setReset())}>&#129060;{" Back"}</button>
    </div>
  ) : null;
};
