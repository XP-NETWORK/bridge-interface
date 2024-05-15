import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ChainSelect } from "../parts/chainSelect";
import { MintNft } from "../parts/mintNft";

import xpSingSvg from "../../../assets/mainSection/Xp-sign.svg";
import xpTextLing from "../../../assets/mainSection/xpLogoText.svg";

import { startDate, endDate } from "../utils";
import { ProjectTimer } from "./ProjectTimer";

export const RightSide = ({
  setChoosenChain,
  choosenChain,
  bridge,
  title,
  description,
  chains,
}) => {
  const account = useSelector((state) => state.general.account);
  const { totalMinted } = useSelector((state) => state.events);

  const [beforeTimeUp, setBeforeTimeUp] = useState(false);
  //const [eventTimeUp, setEventTimeUp] = useState(false);
  //eventTimeUp;
  return (
    <>
      <div className="right-side">
        <div className="minting-line line-down-margin">
          <div className="blink_me"></div>
          <div>
            {beforeTimeUp ? (
              "Minting starts now"
            ) : (
              <ProjectTimer
                text={"Minting starts in "}
                date={startDate}
                onTimeUp={setBeforeTimeUp}
              />
            )}
          </div>
        </div>
        <div className="xp-crossroads line-down-margin">{title}</div>
        <div className="xp-sign-line line-down-margin">
          <div>By </div>
          <div>
            <img src={xpSingSvg} alt="xpSingSvg" />
            <img src={xpTextLing} alt="xpTextLing" />
          </div>
        </div>
        <div className="multichain-bridge-nft-line line-down-margin-24">
          {description}
        </div>
        <ChainSelect
          setChoosenChain={setChoosenChain}
          choosenChain={choosenChain}
          chains={chains}
        />
        <MintNft
          choosenChain={choosenChain}
          bridge={bridge}
          account={account}
          chains={chains}
        />
        <div className="info-section-container ">
          <span>{totalMinted} minted</span>
          <div className="dot-separate"></div>
          <span>Up to 5 mints per wallet</span>
          <div className="dot-separate"></div>
          {Date.now() > startDate && (
            <ProjectTimer text={""} date={endDate} onTimeUp={() => {}} />
          )}
        </div>
      </div>
    </>
  );
};
