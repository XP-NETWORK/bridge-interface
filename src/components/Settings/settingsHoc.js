import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSettings,
  activeChains,
  availability,
  initialState as initSettings,
  initialState,
} from "../../store/reducers/settingsSlice";

import { usePrevious } from "./hooks";

const settingsHoc = (Wrapped) => (props) => {
  const { settings } = useSelector(({ settings }) => ({
    settings,
  }));

  const [copied, setCopied] = useState(false);
  const [activeChainsNumber, setActiveChains] = useState(activeChains.length);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [toggleEditor, onToggleEditor] = useState(false);
  //const [showLink, onToggleShow] = useState(true);

  const dispatch = useDispatch();

  const list = useRef(null);

  const {
    backgroundColor,
    color,
    fontSize,
    btnColor,
    btnBackground,
    btnRadius,
    fontFamily,
    cardBackground,
    cardRadius,
    accentColor,
    secondaryColor,
    selectedChains,
    iconColor,
    borderColor,
    selectedWallets,
    showAlert,
    bridgeState,
    showLink,
  } = settings;
  console.log(showLink);

  const prevSelected = usePrevious(selectedChains);

  const onClickEditor = () => {
    document.querySelector(".nftContainer").style = `margin-left: ${
      !settings.collapsed ? "35" : "300"
    }px;`;
    //document.body.classList.toggle("editorCollapsed");
    //onToggleEditor(!toggleEditor);

    dispatch(
      setSettings({
        ...settings,
        collapsed: !settings.collapsed,
      })
    );
  };

  const deboucedSet = (e, key) =>
    dispatch(setSettings({ ...settings, [key]: e }));

  console.log(activeChainsNumber);
  const chainCheck = (val) => {
    console.log(val);
    const checked = selectedChains.includes(val);

    if (checked) {
      if (activeChains.includes(val)) {
        const canCheckout = activeChainsNumber > 2;

        dispatch(
          setSettings({
            ...settings,
            showAlert: !canCheckout ? "chains" : false,
            selectedChains: !canCheckout
              ? selectedChains
              : selectedChains.filter((chain) => chain !== val),
          })
        );

        return setActiveChains(
          canCheckout ? activeChainsNumber - 1 : activeChainsNumber
        );
      }
    }

    dispatch(
      setSettings({
        ...settings,
        selectedChains: checked
          ? selectedChains.filter((chain) => chain !== val)
          : [...selectedChains, val],
      })
    );

    setActiveChains(
      activeChains.includes(val) ? activeChainsNumber + 1 : activeChainsNumber
    );
  };

  const walletCheck = (val, deleted) => {
    const checked = selectedWallets.includes(val);
    const newSelected = checked
      ? selectedWallets.filter((wallet) => wallet !== val)
      : [...selectedWallets, val];
    dispatch(
      setSettings({
        ...settings,
        //showAlert: newSelected.length < 2 ? "wallets" : false,
        selectedWallets: newSelected,
      })
    );
  };

  const iframeSrc = useMemo(
    () =>
      `${window.location.href
        .replace("#", "")
        .replace("wsettings=true", "")}background=${backgroundColor &&
        backgroundColor.split("#")[1]}&color=${color &&
        color.split("#")[1]}&fontSize=${fontSize &&
        fontSize}&btnColor=${btnColor &&
        btnColor.split("#")[1]}&btnBackground=${btnBackground &&
        btnBackground.split("#")[1]}&btnRadius=${btnRadius &&
        btnRadius}&fontFamily=${fontFamily &&
        fontFamily}&chains=${selectedChains.join(
        "-"
      )}&cardBackground=${cardBackground &&
        cardBackground.split("#")[1]}&cardRadius=${cardRadius &&
        cardRadius}&secondaryColor=${secondaryColor &&
        secondaryColor.split("#")[1]}&accentColor=${accentColor &&
        accentColor.split("#")[1]}&borderColor=${borderColor &&
        borderColor.split("#")[1]}&iconColor=${iconColor &&
        iconColor.split("#")[1]}&wallets=${selectedWallets.join(
        "-"
      )}&bridgeState=${JSON.stringify(bridgeState)}&showLink=${showLink}`,
    [settings]
  );

  const handleScroll = (e) => {
    if (list.current.scrollTop > 20) {
      if (fixedHeader !== true) {
        setFixedHeader(true);
      }
    } else {
      if (fixedHeader !== false) {
        setFixedHeader(false);
      }
    }
  };

  const handleAlert = () =>
    dispatch(setSettings({ ...settings, showAlert: false }));

  const removMultiple = (wallets) => {
    const newSelected = selectedWallets.filter(
      (wallet) => !wallets.includes(wallet)
    );

    dispatch(
      setSettings({
        ...settings,
        selectedWallets: newSelected,
      })
    );
  };

  const addMultiple = (wallets) => {
    dispatch(
      setSettings({
        ...settings,
        selectedWallets: [...selectedWallets, ...wallets],
      })
    );
  };

  useEffect(() => {
    const settings = localStorage.getItem("widgetSettings");
    if (settings) {
      dispatch(setSettings(JSON.parse(settings)));
    }
  }, []);

  useEffect(() => {
    if (prevSelected) {
      const difference = prevSelected.filter(
        (x) => !selectedChains.includes(x)
      );

      if (difference.length > 0) {
        const wallets = availability[difference[0]];
        if (wallets) {
          removMultiple(wallets);
        }
      } else {
        const wallets = availability[selectedChains[selectedChains.length - 1]];
        if (wallets) {
          addMultiple(wallets);
        }
      }
    }
  }, [selectedChains]);

  const toggleShow = () =>
    dispatch(
      setSettings({
        ...settings,
        showLink: !showLink,
      })
    );

  const onSaveSettings = () => {
    localStorage.setItem("widgetSettings", JSON.stringify(settings));
    setCopied("saved");

    setTimeout(() => {
      setCopied(false);
    }, 700);
  };

  const onResetSettings = () => {
    dispatch(setSettings(initSettings));
    localStorage.removeItem("widgetSettings");
  };

  const onSelectAll = () => {
    dispatch(
      setSettings({
        ...settings,
        selectedChains: initialState.selectedChains,
      })
    );
    setActiveChains(activeChains.length);
  };

  return (
    <Wrapped
      list={list}
      copied={copied}
      deboucedSet={deboucedSet}
      chainCheck={chainCheck}
      walletCheck={walletCheck}
      iframeSrc={iframeSrc}
      handleScroll={handleScroll}
      fixedHeader={fixedHeader}
      handleAlert={handleAlert}
      settings={settings}
      setCopied={setCopied}
      toggleEditor={toggleEditor}
      onClickEditor={onClickEditor}
      toggleShow={toggleShow}
      showLink={showLink}
      onSaveSettings={onSaveSettings}
      onResetSettings={onResetSettings}
      onSelectAll={onSelectAll}
    />
  );
};

export default settingsHoc;
