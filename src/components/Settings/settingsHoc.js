import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSettings,
  chains,
  wallets,
  activeChains,
} from "../../store/reducers/settingsSlice";

const settingsHoc = (Wrapped) => (props) => {
  const { settings } = useSelector(({ settings }) => ({
    settings,
  }));

  const [copied, setCopied] = useState(false);
  const [activeChainsNumber, setActiveChains] = useState(activeChains.length);
  const [fixedHeader, setFixedHeader] = useState(false);

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
  } = settings;

  const deboucedSet = (e, key) =>
    dispatch(setSettings({ ...settings, [key]: e }));

  const chainCheck = (val) => {
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

  const walletCheck = (val) => {
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
      )}&bridgeState=${JSON.stringify(bridgeState)}`,
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
    />
  );
};

export default settingsHoc;
