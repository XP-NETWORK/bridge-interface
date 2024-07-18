import React from "react";

//import title from "../../assets/header/titlecampaign.svg";

import icon from "../../assets/header/arrow_rotator.svg";
import "./header.css";

export const HeaderEvent = ({ headerClass }) => {
  return (
    <a
      href="https://app.galxe.com/quest/xpnet"
      target="_blank"
      rel="noreferrer"
    >
      <header className={headerClass ?? "event-header"}>
        <div>
          <div className="rotator">
            <img src={icon} alt="arrow_rotator" />
          </div>
          {/*window.innerWidth <= 768 && (
                        <img src={title} alt={"title"} />
                    )*/}
        </div>
      </header>
    </a>
  );
};
