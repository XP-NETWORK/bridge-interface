/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ReactComponent as FileCopy } from "../../assets/img/icons/FileCopy.svg";

export const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState();

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 300);
  };

  return (
    <div style={{ position: "relative" }}>
      <CopyToClipboard text={text}>
        <div className="tron-modal__copyIcon">
          <FileCopy
            onClick={() => copy()}
            className={`${copied ? "justCopied" : ""}`}
          />
        </div>
      </CopyToClipboard>
    </div>
  );
};
