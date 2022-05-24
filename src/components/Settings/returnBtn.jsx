import React from "react";
import { useSelector } from "react-redux";

export const ReturnBtn = () => {
  const { widget, wsettings } = useSelector((state) => ({
    widget: state.general.widget,
    wsettings: state.general.wsettings,
  }));

  const url =
    widget && !wsettings
      ? `/connect${window.location.search}`
      : `/connect?widget=true&wsettings=true`;

  return widget ? (
    <div className="returnBtn">
      <button onClick={() => window.open(url, "_self")}>{"< Back"}</button>
    </div>
  ) : null;
};
