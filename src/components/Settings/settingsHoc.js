import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSettings,
  activeChains,
  availability,
  initialState as initSettings,
  initialState,
} from "../../store/reducers/settingsSlice";
import {
  setBigNumFees,
  setFees
} from "../../store/reducers/generalSlice";


import { usePrevious } from "./hooks";

 const Web3Utils = require("web3-utils");

const settingsHoc = (Wrapped) => (props) => {
  const { settings, selectedNFTList } = useSelector(({ settings, general :{selectedNFTList}}) => ({
    settings,
    selectedNFTList
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
    cardBackgroundBot,
    cardColor,
    cardRadius,
    accentColor,
    secondaryColor,
    selectedChains,
    iconColor,
    borderColor,
    selectedWallets,
    tooltipBg,
    tooltipColor,
    showAlert,
    bridgeState,
    showLink,
    affiliationFees,
    originalFees
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
        cardBackground.split("#")[1]}&cardBackgroundBot=${cardBackgroundBot &&
          cardBackgroundBot.split("#")[1]}&cardColor=${cardColor &&
            cardColor.split("#")[1]}&cardRadius=${cardRadius &&
        cardRadius}&secondaryColor=${secondaryColor &&
        secondaryColor.split("#")[1]}&accentColor=${accentColor &&
        accentColor.split("#")[1]}&borderColor=${borderColor &&
        borderColor.split("#")[1]}&iconColor=${iconColor &&
        iconColor.split("#")[1]}&tooltipBg=${tooltipBg &&
          tooltipBg.split("#")[1]}&tooltipColor=${tooltipColor &&
            tooltipColor.split("#")[1]}&wallets=${selectedWallets.join(
        "-"
      )}&bridgeState=${JSON.stringify(bridgeState)}&showLink=${showLink}&affiliationFees=${affiliationFees ? +affiliationFees/100 + 1:1}`,
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


  useEffect(() => {
    //console.log(originalFees);
    //console.log(originalFees?.multipliedBy(+affiliationFees/100 + 1));
    originalFees && (async () => {
     const bigNum = originalFees.multipliedBy(+affiliationFees/100 + 1).integerValue().toString(10);
     console.log(bigNum);
    dispatch(setBigNumFees(bigNum));
   
   })()
  }, [settings.affiliationFees])

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

  const onUnSelectAll = () => {
    dispatch(
      setSettings({
        ...settings,
        selectedChains: [selectedChains[0], selectedChains[1]]
      })
    );
    setActiveChains(2);
  }

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
      onUnSelectAll={onUnSelectAll}
    />
  );
};

export default settingsHoc;
