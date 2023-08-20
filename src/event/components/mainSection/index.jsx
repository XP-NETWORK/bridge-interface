import React, { useState } from "react";

import { RightSide } from "./parts/rightSide";
import { LeftSide } from "./parts/leftSide";

import "./mainSection.css";

export const MainSection = ({ bridge }) => {
  const [choosenChain, setChoosenChain] = useState(0);

  return (
    <>
      <article className="main-section-container">
        <LeftSide choosenChain={choosenChain} />
        <RightSide
          setChoosenChain={setChoosenChain}
          choosenChain={choosenChain}
          bridge={bridge}
        />
      </article>
    </>
  );
};
