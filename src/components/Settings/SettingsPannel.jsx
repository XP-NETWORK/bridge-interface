import React, { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { Modal } from "react-bootstrap";
import { ReactComponent as UndoComp } from "./assets/img/undo.svg";
import { ReactComponent as RedoComp } from "./assets/img/undo.svg";
import { useSelector, useDispatch } from "react-redux";
import { copyCode, checkRgbaIn } from "./helpers";
import { setSettings } from "../../store/reducers/settingsSlice";
import { dragElement } from "./helpers";
import close from "./assets/img/icon/close_light.svg";

const CodeModal = ({ children, mode, setMode, theme }) => {

  const modal = useRef(null)

  useEffect(() => {
    dragElement(modal.current)
  }, [])

  return (
    <div className={`codeModal ${theme}`} ref={modal} id="codeModal">
      <div className="header">
        {mode[0].toUpperCase() + mode.substr(1)} code{" "}
        <img src={close} alt="close" onClick={() => setMode(null)} />
      </div>

      <div className="main">{children}</div>
    </div>
  );
};

const SettingsPannel = ({ theme, iframeSrc, setCopied }) => {
  const dispatch = useDispatch();

  const portalDiv = document.getElementById("settingsPanelContainer");
  const [mode, setMode] = useState(null);
  const [iframeInput, setInput] = useState("");

  const { settings } = useSelector(({ settings }) => ({
    settings,
  }));

  const findValue = (param) =>
    iframeInput
      ?.match(new RegExp(`(?<=${param}\=)(.*?)(?=(\&amp\;|\&|\'|\"))`))
      ?.at(0);

  const parseIframe = () => {
    if (!iframeInput) return;
    dispatch(
      setSettings({
        btnRadius: Number(findValue("btnRadius")) || settings["btnRadius"],
        fontSize: Number(findValue("fontSize")) || settings["fontSize"],
        backgroundColor:
          checkRgbaIn("#" + findValue("background")) ||
          settings["backgroundColor"],
        panelBackground:
          checkRgbaIn("#" + findValue("panelBackground")) ||
          settings["panelBackground"],
        modalBackground:
          checkRgbaIn("#" + findValue("modalBackground")) ||
          settings["modalBackground"],
        color: checkRgbaIn("#" + findValue("color")) || settings["color"],
        btnBackground:
          checkRgbaIn("#" + findValue("btnBackground")) ||
          settings["btnBackground"],
        btnColor:
          checkRgbaIn("#" + findValue("btnColor")) || settings["btnColor"],
        fontFamily: findValue("fontFamily") || settings["fontFamily"],
        cardBackground:
          checkRgbaIn("#" + findValue("cardBackground")) ||
          settings["cardBackground"],
        cardBackgroundBot:
          checkRgbaIn("#" + findValue("cardBackgroundBot")) ||
          settings["cardBackgroundBot"],
        cardColor:
          checkRgbaIn("#" + findValue("cardColor")) || settings["cardColor"],
        cardRadius: Number(findValue("cardRadius")) || settings["cardRadius"],
        accentColor:
          checkRgbaIn("#" + findValue("accentColor")) ||
          settings["accentColor"],
        secondaryColor:
          checkRgbaIn("#" + findValue("secondaryColor")) ||
          settings["secondaryColor"],
        selectedChains:
          findValue("chains")?.split("-") || settings["selectedChains"],
        selectedWallets:
          findValue("wallets")?.split("-") || settings["selectedWallets"],
        borderColor:
          checkRgbaIn("#" + findValue("borderColor")) ||
          settings["borderColor"],
        iconColor:
          checkRgbaIn("#" + findValue("iconColor")) || settings["iconColor"],
        tooltipBg:
          checkRgbaIn("#" + findValue("tooltipBg")) || settings["tooltipBg"],
        tooltipColor:
          checkRgbaIn("#" + findValue("tooltipColor")) ||
          settings["tooltipColor"],
        affiliationFees: findValue("affiliationFees")
          ? Math.floor((Number(findValue("affiliationFees")) - 1) * 100)
          : settings["affiliationFees"],
        showLink: findValue("showLink") === "true" ? true : false,
        fromChain: "",
        toChain: "",
      })
    );
  };

  return (
    portalDiv &&
    ReactDom.createPortal(
      <>
        <div className={`settingsPannel ${theme}`}>
          {false && (
            <div className="arrows">
              <UndoComp className="controlArrow" />
              <UndoComp className="controlArrow" />
            </div>
          )}
          <button
            className="controlBtn withIcon"
            onClick={() => setMode("export")}
          >
            <span>Export code</span>
          </button>
          <button
            className="controlBtn withIcon import"
            onClick={() => setMode("import")}
          >
            <span>Import code</span>
          </button>
        </div>

        {mode && (
          <CodeModal mode={mode} setMode={setMode} theme={theme}>
            {mode === "export" && (
              <>
                <div className="controlPannel">
                  <button
                    className="controlBtn"
                    onClick={() => copyCode(setCopied, "pannelIframe")}
                  >
                    Copy Code
                  </button>
                </div>
                <textarea
                  id="pannelIframe"
                  value={`<iframe src='${iframeSrc}' frameborder='0'  width="100%" height="800px"></iframe>`}
                ></textarea>
              </>
            )}

            {mode === "import" && (
              <>
                <div className="controlPannel">
                  <button className="controlBtn" onClick={parseIframe}>
                    Import iframe code
                  </button>
                </div>
                <textarea
                  value={iframeInput}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </>
            )}
          </CodeModal>
        )}
      </>,
      portalDiv
    )
  );
};

export default SettingsPannel;
