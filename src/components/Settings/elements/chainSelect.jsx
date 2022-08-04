import React from "react";
import { Dropdown } from "react-bootstrap";

import { chains } from "../../../store/reducers/settingsSlice";

export const ChainSelect = ({ setChain, selectedChain, mode, hideChains }) => {
  const chainObj = chains.find(
    (c) =>
      c.text === selectedChain ||
      c.key === selectedChain ||
      c.value === selectedChain
  );

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        {selectedChain ? (
          <div className="selectedChain">
            <img src={chainObj?.image?.src} alt={""} />
            {mode && (
              <span className="selectedChainItem">{chainObj?.text}</span>
            )}
          </div>
        ) : (
          "None"
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{ maxHeight: "300px", overflow: "auto" }}
        id="fromMenu"
      >
        <ul className="chainSelector">
          <li key={"none"} className="blockChainItem">
            <span
              className="dropdown-item"
              // style={{ fontFamily: font }}
              onClick={(e) => {
                setChain(undefined, mode); //deboucedSet(undefined, "fromChain");
              }}
            >
              None
            </span>
          </li>
          {chains
            .filter((chain) => !mode || chain.text !== selectedChain)
            .filter(
              (chain) => !hideChains || hideChains.indexOf(chain.text) === -1
            )
            .map((chain, i) => (
              <li key={i + "chain"} className="blockChainItem">
                <img src={chain.image.src} alt={chain.value} />
                <span
                  className="dropdown-item"
                  onClick={(e) => {
                    setChain(chain.text, mode);
                  }}
                >
                  {chain.text}
                </span>
              </li>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
