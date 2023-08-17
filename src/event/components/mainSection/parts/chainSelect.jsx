import React from "react";

import { chainData } from "../utils";

export const ChainSelect = ({ setChoosenChain, choosenChain }) => {
  const chainSelect = (num) => {
    setChoosenChain(num);
  };
  return (
    <>
      <div className="chain-select-container line-down-margin-24">
        <div>Select Network</div>
        <ul>
          {chainData.map((n, i) => {
            return (
              <li
                key={`${n.name}-${i}`}
                onClick={() => chainSelect(i)}
                className={
                  i === choosenChain
                    ? "chain-select-active"
                    : "chain-select-not-active"
                }
              >
                <img src={n.image} alt={`${n.name}`} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
