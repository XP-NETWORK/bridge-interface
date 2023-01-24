import React from "react";
import ReactDom from "react-dom";
import { Dropdown, Accordion, Alert } from "react-bootstrap";
import power from "./assets/img/power.svg";

import settingsHoc from "./settingsHoc";
import SettingsPannel from "./SettingsPannel";
import ThemeSwitch from "./themeSwitch";

import {
  chains,
  wallets,
  availability,
  fonts,
  newChains,
} from "../../store/reducers/settingsSlice";
import "./Settings.css";

import { ReactComponent as CollapseComp } from "./assets/img/collapse.svg";
import { copyCode } from "./helpers";

import { ChainSelect } from "./elements/chainSelect";

import addItem from "./assets/img/icon/addItem.svg";

import deleteIcon from "./assets/img/icon/delete.svg";

function WSettings({
  settings,
  copied,
  handleAlert,
  list,
  deboucedSet,
  chainCheck,
  walletCheck,
  iframeSrc,
  handleScroll,
  fixedHeader,
  setCopied,
  onClickEditor,
  toggleEditor,
  toggleShow,
  showLink,
  onSaveSettings,
  onResetSettings,
  onSelectAll,
  onUnSelectAll,
  chainFeesMethods,
}) {
  const {
    backgroundColor,
    panelBackground,
    modalBackground,
    color,
    fontSize,
    btnColor,
    btnBackground,
    fontFamily,
    cardBackground,
    cardBackgroundBot,
    cardColor,
    accentColor,
    secondaryColor,
    selectedChains,
    iconColor,
    tooltipBg,
    tooltipColor,
    borderColor,
    selectedWallets,
    showAlert,
    theme,
    fromChain,
    toChain,
    affiliationSettings,
  } = settings;

  const portalDiv = document.getElementById("settingsPortal");

  return (
    portalDiv &&
    ReactDom.createPortal(
      <>
        {true && (
          <SettingsPannel
            theme={theme}
            iframeSrc={iframeSrc}
            setCopied={setCopied}
          />
        )}
        <div
          className={`setting_sidebar ${theme}`}
          style={{ width: settings.collapsed ? "35px" : "300px" }}
        >
          <CollapseComp
            className="collapseImg collapsed"
            onClick={onClickEditor}
            style={{
              display: settings.collapsed ? "inline-block" : "none",
            }}
          />

          <Alert
            show={settings.showAlert}
            variant="danger"
            style={{ position: "absolute", zIndex: "9999" }}
            onClose={handleAlert}
            dismissible
          >
            <p style={{ marginTop: "10px" }}>{showAlert}</p>
          </Alert>

          <Alert
            show={copied}
            variant="info"
            style={{ position: "absolute", zIndex: "9999", width: "100%" }}
            onClose={handleAlert}
          >
            <p style={{ marginTop: "10px" }}>
              {copied === "saved" ? "Saved" : "Copied"}!
            </p>
          </Alert>

          {/*   <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="exportCodeCont"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={importSettings}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

          <div
            className="site_setting"
            style={{ display: settings.collapsed ? "none" : "block" }}
          >
            <h2>Settings</h2>
            <CollapseComp className="collapseImg" onClick={onClickEditor} />
            <div className={`genarel_setting ${fixedHeader ? "fixed" : ""}`}>
              <ThemeSwitch />

              {false && (
                <button className="showIframe">{"< "}Hide editor</button>
              )}
              <button
                className="expandAll"
                onClick={() => {
                  document
                    .querySelectorAll(".accordion-button")
                    .forEach((el) => {
                      el.setAttribute("aria-expanded", "true");
                      el.classList.remove("collapsed");
                    });
                  document
                    .querySelectorAll(".accordion-collapse")
                    .forEach((el) => {
                      el.setAttribute("style", "");
                      el.classList.add("show");
                    });
                }}
              ></button>
              <button
                className="collapseAll"
                onClick={() => {
                  document
                    .querySelectorAll(".accordion-button")
                    .forEach((el) => {
                      el.setAttribute("aria-expanded", "false");
                      el.classList.add("collapsed");
                    });
                  document
                    .querySelectorAll(".accordion-collapse")
                    .forEach((el) => {
                      el.setAttribute("style", "");
                      el.classList.remove("show");
                    });
                }}
              ></button>
            </div>
          </div>
          <div
            className={`sidebar_content ${fixedHeader ? "shoved" : ""}`}
            style={{ display: settings.collapsed ? "none" : "block" }}
            ref={list}
            onScroll={(e) => handleScroll(e)}
          >
            <div className="setting_list">
              <Accordion defaultActiveKey="10" className="open">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Integrated Blockchains</Accordion.Header>

                  <Accordion.Body>
                    <div className="blockChainCont">
                      <ul className="select_block_chain">
                        <button
                          className="controlBtn"
                          onClick={() => onSelectAll("selectedChains")}
                        >
                          Select all
                        </button>
                        <button
                          className="controlBtn"
                          onClick={() => onUnSelectAll("selectedChains")}
                        >
                          Unselect all
                        </button>

                        {chains
                          .filter(
                            (c) =>
                              c.coming ||
                              c.maintenance ||
                              c.mainnet ||
                              c.testNet
                          )
                          ?.map((chain, i) => (
                            <li
                              key={i}
                              className="blockChain_item"
                              onClick={() => chainCheck(chain.value)}
                            >
                              <div className="select_nft">
                                <input
                                  type="checkbox"
                                  name=""
                                  id=""
                                  readOnly
                                  checked={selectedChains.includes(chain.value)}
                                />
                                <span className="icon selectNfticon"></span>
                              </div>
                              <div className="blockChainItem">
                                <img src={chain.image.src} alt={chain.value} />

                                {chain.text}

                                {newChains.includes(chain.text) && (
                                  <span>New chain</span>
                                )}

                                {chain.maintenance ? (
                                  <span
                                    style={{
                                      color: "grey",
                                      borderColor: "grey",
                                      fontSize: "11px",
                                    }}
                                  >
                                    Maintenance
                                  </span>
                                ) : (
                                  ""
                                )}

                                {chain.coming ? (
                                  <span className="comingSoon">
                                    coming soon
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </li>
                          ))}
                        <li>
                          <div
                            className="select_font"
                            style={{ padding: "10px 30px" }}
                          >
                            From Chain (Locked):
                            <ChainSelect
                              setChain={(...args) =>
                                (args[0] === undefined ||
                                  args[0] !== toChain) &&
                                deboucedSet(...args)
                              }
                              selectedChain={fromChain}
                              mode={"fromChain"}
                            />
                          </div>
                        </li>
                        <li>
                          <div
                            className="select_font"
                            style={{ padding: "10px 30px" }}
                          >
                            To Chain (Locked):
                            <ChainSelect
                              setChain={(...args) =>
                                (args[0] === undefined ||
                                  args[0] !== fromChain) &&
                                deboucedSet(...args)
                              }
                              selectedChain={toChain}
                              mode={"toChain"}
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="11">
                <Accordion.Item eventKey="111">
                  <Accordion.Header>Wallets</Accordion.Header>

                  <Accordion.Body>
                    <div className="blockChainCont">
                      <ul className="select_block_chain">
                        <button
                          className="controlBtn"
                          onClick={() => onSelectAll("selectedWallets")}
                        >
                          Select all
                        </button>
                        <button
                          className="controlBtn"
                          onClick={() => onUnSelectAll("selectedWallets")}
                        >
                          Unselect all
                        </button>
                        {wallets?.map((wallet, i) => {
                          const chain = Object.keys(availability).find((key) =>
                            availability[key].includes(wallet)
                          );
                          //const notSingleCommomChain = !selectedChains.includes()
                          const li = (
                            <li
                              key={i + "wallet"}
                              className={`blockChain_item ${
                                !chain || selectedChains.includes(chain)
                                  ? ""
                                  : "inactive"
                              }`}
                              onClick={() => walletCheck(wallet)}
                            >
                              <div className="select_nft">
                                <input
                                  type="checkbox"
                                  name=""
                                  id=""
                                  readOnly
                                  checked={selectedWallets.includes(wallet)}
                                />
                                <span className="icon selectNfticon"></span>
                              </div>
                              <div className="blockChainItem">
                                <img
                                  src={
                                    wallet === "AlgoSigner"
                                      ? require(`./assets/img/wallets/${wallet}.png`)
                                      : require(`./assets/img/wallets/${wallet}.svg`)
                                  }
                                  alt={wallet}
                                />

                                {wallet}

                                {wallet === "Ledger" || wallet === "Trezor" ? (
                                  <span className="comingSoon">
                                    coming soon
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </li>
                          );

                          return li;
                        })}
                      </ul>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="12">
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Background</Accordion.Header>
                  <Accordion.Body>
                    <div className="typographyContainer">
                      <div className="typographyBox ">
                        <div className="typo-sel header_color_select">
                          <h5>Color</h5>
                          <div className="select_color">
                            <div className="colorInp">
                              <input
                                type="color"
                                name="check_txt_fl2"
                                id="check_txt_f2"
                                value={backgroundColor}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "backgroundColor")
                                }
                              />
                            </div>
                            <div className="colorCode">
                              <input
                                type="text"
                                placeholder="# 000000"
                                id="color_of_head"
                                value={backgroundColor}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "backgroundColor")
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="typo-sel header_color_select">
                          <h5>Panel Color</h5>
                          <div className="select_color">
                            <div className="colorInp">
                              <input
                                type="color"
                                name="check_txt_fl2"
                                id="check_txt_f2"
                                value={panelBackground}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "panelBackground")
                                }
                              />
                            </div>
                            <div className="colorCode">
                              <input
                                type="text"
                                placeholder="# 000000"
                                id="color_of_head"
                                value={panelBackground}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "panelBackground")
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="typo-sel header_color_select">
                          <h5>Modal Color</h5>
                          <div className="select_color">
                            <div className="colorInp">
                              <input
                                type="color"
                                name="check_txt_fl2"
                                id="check_txt_f2"
                                value={modalBackground}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "modalBackground")
                                }
                              />
                            </div>
                            <div className="colorCode">
                              <input
                                type="text"
                                placeholder="# 000000"
                                id="color_of_head"
                                value={modalBackground}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "modalBackground")
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="13">
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Typography</Accordion.Header>

                  <Accordion.Body>
                    <div className="typographyContainer">
                      <div className="typographyBox ">
                        <h3>Body</h3>
                        <div className="typo-sel header_color_select">
                          <h5>Font Color</h5>
                          <div className="select_color">
                            <div className="colorInp">
                              <input
                                type="color"
                                name="check_txt_fl2"
                                id="check_txt_f2"
                                value={color}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "color")
                                }
                              />
                            </div>
                            <div className="colorCode">
                              <input
                                type="text"
                                placeholder="# 000000"
                                id="color_of_head"
                                value={color}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "color")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="typo-sel header_color_select">
                          <h5>Secondary Font Color</h5>
                          <div className="select_color">
                            <div className="colorInp">
                              <input
                                type="color"
                                id=""
                                value={secondaryColor}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "secondaryColor")
                                }
                              />
                            </div>
                            <div className="colorCode">
                              <input
                                type="text"
                                placeholder="# 000000"
                                id="color_of_head"
                                value={secondaryColor}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "secondaryColor")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="typo-sel header_color_select">
                          <h5>Accent Font Color</h5>
                          <div className="select_color">
                            <div className="colorInp">
                              <input
                                type="color"
                                id=""
                                value={accentColor}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "accentColor")
                                }
                              />
                            </div>
                            <div className="colorCode">
                              <input
                                type="text"
                                placeholder="# 000000"
                                id="color_of_head"
                                value={accentColor}
                                onChange={(e) =>
                                  deboucedSet(e.target.value, "accentColor")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="typo-sel font-select">
                          <h5>Font family</h5>
                          <div className="select_font">
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">
                                {fontFamily}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <ul>
                                  {fonts.map((font, i) => (
                                    <li key={i + "font"}>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        style={{ fontFamily: font }}
                                        onClick={() =>
                                          deboucedSet(font, "fontFamily")
                                        }
                                      >
                                        {font}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className="typo-sel font-size-sel">
                          <h5>Font size</h5>
                          <div className="select_font">
                            <div className="typo-sel header_color_select">
                              <div className="cornerRadi">
                                <input
                                  type="text"
                                  placeholder="16px"
                                  //value={fontSize}
                                  onChange={(e) =>
                                    deboucedSet(e.target.value, "fontSize")
                                  }
                                />
                              </div>
                            </div>
                            <Dropdown style={{ display: "none" }}>
                              <Dropdown.Toggle id="dropdown-basic">
                                {fontSize}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <ul>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        deboucedSet("28", "fontSize")
                                      }
                                    >
                                      Large (28px)
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        deboucedSet("22", "fontSize")
                                      }
                                    >
                                      Medium (22px)
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        deboucedSet("16", "fontSize")
                                      }
                                    >
                                      Normal (16px)
                                    </a>
                                  </li>
                                </ul>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="14">
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Buttons</Accordion.Header>
                  <Accordion.Body>
                    <div className="button_settCont">
                      <div className="typo-sel header_color_select">
                        <h5>Color</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={btnBackground}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "btnBackground")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={btnBackground}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "btnBackground")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="typo-sel header_color_select">
                        <h5>Text color</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl4"
                              value={btnColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "btnColor")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={btnColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "btnColor")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="typo-sel header_color_select">
                        <h5>Corner radius</h5>
                        <div className="cornerRadi">
                          <input
                            type="text"
                            placeholder="9px"
                            //value={state.btnRadius}

                            onChange={(e) =>
                              deboucedSet(e.target.value, "btnRadius")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="15">
                <Accordion.Item eventKey="7">
                  <Accordion.Header>NFT Cards</Accordion.Header>
                  <Accordion.Body>
                    <div className="button_settCont">
                      <div className="typo-sel header_color_select">
                        <h5>Background</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={cardBackground}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "cardBackground")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={cardBackground}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "cardBackground")
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="typo-sel header_color_select">
                        <h5>Background Bottom</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={cardBackgroundBot}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "cardBackgroundBot")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={cardBackgroundBot}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "cardBackgroundBot")
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="typo-sel header_color_select">
                        <h5>Color</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={cardColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "cardColor")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={cardColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "cardColor")
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="typo-sel header_color_select">
                        <h5>Card corner radius</h5>
                        <div className="cornerRadi">
                          <input
                            type="text"
                            placeholder="25px"
                            id="dsa"
                            //onClick={(e) => e.target.focus()}
                            onChange={(e) =>
                              deboucedSet(e.target.value, "cardRadius")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="16">
                <Accordion.Item eventKey="9">
                  <Accordion.Header>Borders</Accordion.Header>
                  <Accordion.Body>
                    <div className="button_settCont">
                      <div className="typo-sel header_color_select">
                        <h5>Border Color</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={borderColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "borderColor")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={borderColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "borderColor")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="17">
                <Accordion.Item eventKey="8">
                  <Accordion.Header>Icons</Accordion.Header>
                  <Accordion.Body>
                    <div className="button_settCont">
                      <div className="typo-sel header_color_select">
                        <h5>Icon Color</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={iconColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "iconColor")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={iconColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "iconColor")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="18">
                <Accordion.Item eventKey="9">
                  <Accordion.Header>Tooltips</Accordion.Header>
                  <Accordion.Body>
                    <div className="button_settCont">
                      <div className="typo-sel header_color_select">
                        <h5>Color</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={tooltipColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "tooltipColor")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={tooltipColor}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "tooltipColor")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="typo-sel header_color_select">
                        <h5>Background</h5>
                        <div className="select_color">
                          <div className="colorInp">
                            <input
                              type="color"
                              id="check_txt_fl3"
                              value={tooltipBg}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "tooltipBg")
                              }
                            />
                          </div>
                          <div className="colorCode">
                            <input
                              type="text"
                              placeholder="# 000000"
                              id="color_of_head"
                              value={tooltipBg}
                              onChange={(e) =>
                                deboucedSet(e.target.value, "tooltipBg")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="18">
                <Accordion.Item eventKey="9">
                  <Accordion.Header>Affiliation Settings</Accordion.Header>

                  <Accordion.Body>
                    {affiliationSettings?.map((chainFees, i, arr) => {
                      return (
                        <div
                          key={"feeSet" + i}
                          className="feeSettingsContainer"
                        >
                          <div className="typographyContainer">
                            <div className="typo-sel font-size-sel">
                              <h5>Extra gas fees</h5>
                              <div className="feeSettingsWrapper">
                                <div className="select_font">
                                  <div className="typo-sel header_color_select">
                                    <div className="cornerRadi">
                                      <div className="feesWrapper">
                                        <input
                                          type="number"
                                          placeholder="0"
                                          max={100}
                                          min={0}
                                          value={Number(
                                            chainFees.extraFees - 0
                                          ).toString()}
                                          onChange={(e) => {
                                            const val = e.target.value;

                                            chainFeesMethods.updateChainFees(
                                              i,
                                              "extraFees",
                                              val > 0
                                                ? val < 100
                                                  ? val
                                                  : 100
                                                : 0
                                            );
                                          }}
                                        />
                                        <span>%</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <ChainSelect
                                  setChain={(...args) =>
                                    !arr.find((c) => c.chain === args[0]) &&
                                    chainFeesMethods.updateChainFees(
                                      i,
                                      "chain",
                                      args[0]
                                    )
                                  }
                                  selectedChain={chainFees.chain}
                                  hideChains={[
                                    ...(affiliationSettings?.map(
                                      (s) => s.chain
                                    ) || []),
                                    ...chains
                                      .filter(
                                        (c) =>
                                          selectedChains.indexOf(c.key) === -1
                                      )
                                      .map((c) => c.text),
                                  ]}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="typographyContainer">
                            <div className="typo-sel font-size-sel">
                              <h5>Associated wallet</h5>
                              <div className="select_font">
                                <div className="typo-sel header_color_select">
                                  <div className="cornerRadi">
                                    <div className="feesWrapper">
                                      <input
                                        type="text"
                                        value={chainFees.wallet}
                                        onChange={(e) =>
                                          chainFeesMethods.updateChainFees(
                                            i,
                                            "wallet",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <img
                                        src={deleteIcon}
                                        alt=""
                                        className="deleteIcon"
                                        onClick={() =>
                                          chainFeesMethods.deleteChainFees(i)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {i < affiliationSettings?.length - 1 && (
                            <div className="separator"></div>
                          )}
                        </div>
                      );
                    })}

                    <div className="typographyContainer">
                      <div
                        className={`addFeesWrapper ${
                          !affiliationSettings?.length ? "default" : ""
                        }`}
                      >
                        <img src={addItem} alt="addItem" />
                        <span onClick={chainFeesMethods.addChainFees}>
                          Add gas fee & wallet
                        </span>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {false && (
                <div className="referalSwitch" onClick={toggleShow}>
                  <input type="checkbox" checked={showLink} readOnly />
                  <span>Powered by XP Network</span>
                </div>
              )}

              <div className="referalSwitch">
                <button onClick={onSaveSettings} className="controlBtn">
                  Save all settings
                </button>
                <button onClick={onResetSettings} className="controlBtn">
                  Reset all settings
                </button>
              </div>

              {false && (
                <Accordion defaultActiveKey="18">
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>Export Code</Accordion.Header>
                    <Accordion.Body>
                      <div className="export_code">
                        <div className="typo-sel header_color_select">
                          <h5>Paste this code</h5>
                          <div className="exportCodeCont">
                            <p id="iframeSrc">{`<iframe src='${iframeSrc}' frameborder='0'  width="100%" height="800px"></iframe>`}</p>
                            <button
                              className={`copyCode icon ${
                                copied ? "copied" : ""
                              }`}
                              onClick={() => copyCode(setCopied, "iframeSrc")}
                            ></button>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
            </div>
          </div>
          <div
            className="sideFooter"
            style={{ display: toggleEditor ? "none" : "block" }}
          >
            <div className="help" style={{ display: "none" }}>
              <h3>Help</h3>
              <a href="#" className="help_icon">
                <span className="icon qustion_icon"></span>
              </a>
            </div>
            <div
              className="powerBySet"
              style={{ display: settings.collapsed ? "none" : "block" }}
            >
              <a
                href="https://xp.network/"
                target={"_blank"}
                className="power_by"
                rel="noreferrer"
              >
                <img src={power} alt="XP.Network" />
              </a>
            </div>
          </div>
        </div>{" "}
      </>,
      portalDiv
    )
  );
}

export default settingsHoc(WSettings);
