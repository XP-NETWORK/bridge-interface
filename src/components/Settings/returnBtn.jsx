import React from "react";
import { useSelector } from "react-redux";

export const ReturnBtn = () => {
  const { widget } = useSelector((state) => ({
    widget: state.widget.widget,
  }));

  return widget ? (
    <div className="returnBtn">
      <button
        onClick={() => {
          const url = `/${window.location.search}`;
          //widget && !wsettings
          //</div>? `/connect${window.location.search}`
          //: `/connect?widget=true&wsettings=true`;

          window.open(url, "_self");
        }}
      >
        {"< Back"}
      </button>
    </div>
  ) : null;
};
