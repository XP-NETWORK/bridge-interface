import React from "react";

export const ChainSelect = ({ setChoosenChain, choosenChain, chains }) => {
  const chainSelect = (num) => {
    setChoosenChain(num);
  };

  return (
    <>
      <div className="chain-select-container line-down-margin-24">
        <div>Select Network</div>
        <ul>
          {chains.map((n, i) => {
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
