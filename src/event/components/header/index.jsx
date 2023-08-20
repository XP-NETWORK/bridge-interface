import React from "react";

//import title from "../../assets/header/titlecampaign.svg";

import icon from "../../assets/header/arrow_rotator.svg";
import "./header.css";

export const HeaderEvent = () => {
    return (
        <a
            href="https://galxe.com/aurora/campaign/GCo35UjkS8"
            target="_blank"
            rel="noreferrer"
        >
            <header className="event-header">
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
