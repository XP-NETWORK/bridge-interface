import React from "react";
import { useSelector } from "react-redux";


export const ReturnBtn = () => {

<<<<<<< HEAD
  const {widget, wsettings} = useSelector((state) => ({widget:state.general.widget, wsettings: state.general.wsettings}));

  const url = widget && !wsettings ? `/connect${window.location.search}` : `/connect?widget=true&wsettings=true`


  return widget ? (
    <div className="returnBtn">
      <button onClick={() => window.open(url, "_self")}>{"< Back"}</button>
=======
  const {widget, wsettings} = useSelector((state) => ({widget:state.general.widget, wsettings:state.general.wsettings }));

  return widget ? (
    <div className="returnBtn">
      <button onClick={() => window.open(`/connect?widget=true${wsettings? '&wsettings=true' : ''}`, "_self")}>{"< Back"}</button>
>>>>>>> 91ca19dc2cd78cd2f44856f8df107ab01aad4739
    </div>
  ) : null;
};
