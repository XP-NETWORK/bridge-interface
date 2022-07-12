import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setTo } from "../../store/reducers/generalSlice";
import {
  setSettings,
  activeChains,
  availability,
  initialState as initSettings,
  initialState,
  chains,
} from "../../store/reducers/settingsSlice";
import { comingSoonChains } from "../../store/reducers/settingsSlice";
import { debounce } from "../helpers";
import { usePrevious } from "./hooks";

import { checkRgbaOut } from "./helpers";

const Web3Utils = require("web3-utils");
const evms = chains.filter(c => c.type === "EVM").map(c => c.value);

const settingsHoc = (Wrapped) => (props) => {
  const { settings, widget, selectedNFTList } = useSelector(
    ({ settings, general: { selectedNFTList, widget } }) => ({
      settings,
      selectedNFTList,
      widget,
    })
  );

  const [copied, setCopied] = useState(false);
  const [activeChainsNumber, setActiveChains] = useState(activeChains.length);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [toggleEditor, onToggleEditor] = useState(false);
  const [debouncedAcc, setDebouncedAcc] = useState({
    key: "",
    val: "",
  });
  //const [showLink, onToggleShow] = useState(true);

  const dispatch = useDispatch();

  const list = useRef(null);

  const {
    backgroundColor,
    modalBackground,
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
    bridgeState,
    showLink,
    affiliationFees,
    panelBackground,
    fromChain,
    toChain,
  } = settings;

  // console.log(settings);

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

  const deboucedSet = (e, key, debounce) => {
    dispatch(setSettings({ ...settings, [key]: e }));
  };

  useEffect(() => {
    debounce(
      (arg) => dispatch(setSettings(arg)),
      1000
    )({ ...settings, [debouncedAcc.key]: debouncedAcc.val });
  }, [debouncedAcc]);

  useEffect(() => {
    if (settings.fromChain !== "") {
      dispatch(setFrom(chains.find((c) => c.text === fromChain)));
    }
  }, [fromChain]);

  useEffect(() => {
    if (settings.toChain !== "") {
      dispatch(setTo(chains.find((c) => c.text === toChain)));
    }
  }, [toChain]);

  const chainCheck = (val) => {
    const checked = selectedChains.includes(val);

    if (checked) {
      if (activeChains.includes(val)) {
        const canCheckout = activeChainsNumber > 2; //comingSoonChains.includes(val)? true: activeChainsNumber - selectedChains.reduce((acc, cur) => acc + comingSoonChains.includes(cur)? 1: 0, 0) > 2;

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
        checkRgbaOut(backgroundColor).split(
          "#"
        )[1]}&panelBackground=${panelBackground &&
        checkRgbaOut(panelBackground).split(
          "#"
        )[1]}&modalBackground=${modalBackground &&
        checkRgbaOut(modalBackground).split("#")[1]}&color=${color &&
        checkRgbaOut(color).split("#")[1]}&fontSize=${fontSize &&
        fontSize}&btnColor=${btnColor &&
        checkRgbaOut(btnColor).split("#")[1]}&btnBackground=${btnBackground &&
        checkRgbaOut(btnBackground).split("#")[1]}&btnRadius=${btnRadius &&
        btnRadius}&fontFamily=${fontFamily &&
        fontFamily}&chains=${selectedChains
        .map((c) => (c === "xDai" ? "Gnosis" : c))
        .join(
          "-"
        )}&from=${fromChain}&to=${toChain}&cardBackground=${cardBackground &&
        checkRgbaOut(cardBackground).split(
          "#"
        )[1]}&cardBackgroundBot=${cardBackgroundBot &&
        checkRgbaOut(cardBackgroundBot).split("#")[1]}&cardColor=${cardColor &&
        checkRgbaOut(cardColor).split("#")[1]}&cardRadius=${cardRadius &&
        cardRadius}&secondaryColor=${secondaryColor &&
        checkRgbaOut(secondaryColor).split("#")[1]}&accentColor=${accentColor &&
        checkRgbaOut(accentColor).split("#")[1]}&borderColor=${borderColor &&
        checkRgbaOut(borderColor).split("#")[1]}&iconColor=${iconColor &&
        checkRgbaOut(iconColor).split("#")[1]}&tooltipBg=${tooltipBg &&
        checkRgbaOut(tooltipBg).split("#")[1]}&tooltipColor=${tooltipColor &&
        checkRgbaOut(tooltipColor).split(
          "#"
        )[1]}&wallets=${selectedWallets.join("-")}&bridgeState=${JSON.stringify(
        bridgeState
      )}&showLink=${showLink}&affiliationFees=${
        affiliationFees ? +affiliationFees / 100 + 1 : 1
      }`,
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
    if (prevSelected) {
      const difference = prevSelected.filter(
        (x) => !selectedChains.includes(x)
      );

      if (difference.length > 0) {
        const removeWallets = [];

        for (let i = 0; i < difference.length; i++) {
    
          const wallets = availability[difference[i]];
          
          wallets && removeWallets.push(...wallets);
        }
     
       // if (selectedChains.every(c => !evms.includes(c))) {
         // removMultiple(availability['Evms'])
       // }
        removeWallets && removMultiple(removeWallets);
      } else {
        const addWallets = [];
        for (let i = 0; i < selectedChains.length; i++) {
          const wallets = availability[selectedChains[i]];
          wallets && addWallets.push(...wallets);
        }
        addWallets && addMultiple(addWallets);
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

  const onSelectAll = (entity) => {
    dispatch(
      setSettings({
        ...settings,
        [entity]: initialState[entity],
        //selectedChains: initialState.selectedChains,
      })
    );
    entity === "selectedChains" && setActiveChains(activeChains.length);
  };

  const onUnSelectAll = (entity) => {
    dispatch(
      setSettings({
        ...settings,
        [entity]: [
          settings[entity][0],
          entity === "selectedChains" && settings[entity][1],
        ],
        // selectedChains: [selectedChains[0], selectedChains[1]],
      })
    );
    entity === "selectedChains" && setActiveChains(2);
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
      onUnSelectAll={onUnSelectAll}
      debouncedAcc={debouncedAcc}
    />
  );
};

export default settingsHoc;
