import React from "react";
import { useSelector } from "react-redux";


export const ReturnBtn = () => {

  const {widget, wsettings} = useSelector((state) => ({widget:state.general.widget, wsettings:state.general.wsettings }));

  return widget ? (
    <div className="returnBtn">
      <button onClick={() => window.open(`/connect${widget && !wsettings? window.location.search : '?widget=true&wsettings=true'}`, "_self")}>{"< Back"}</button>
    </div>
  ) : null;
};
