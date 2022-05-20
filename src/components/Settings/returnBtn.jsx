import React from "react";
import { useSelector } from "react-redux";


export const ReturnBtn = () => {

  const widget = useSelector((state) => state.general.widget);

  return widget ? (
    <div className="returnBtn">
      <button onClick={() => window.open(`/connect?widget=true&wsettings=true`, "_self")}>{"< Back"}</button>
    </div>
  ) : null;
};
