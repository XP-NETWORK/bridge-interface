import React, { useState } from 'react';
import ReactDom from "react-dom"
import { Modal } from "react-bootstrap";
import { ReactComponent as UndoComp } from "./assets/img/undo.svg"
import { ReactComponent as RedoComp } from "./assets/img/undo.svg"
import { useSelector, useDispatch } from 'react-redux';
import { copyCode } from './helpers';
import { setSettings } from '../../store/reducers/settingsSlice'

import close from './assets/img/icon/close_light.svg'

const CodeModal = ({ children, mode, setMode }) => {


    return <div className="codeModal">
        <div className="header">{mode[0].toUpperCase() + mode.substr(1)} code  <img src={close} alt="close" onClick={() => setMode(null)} /></div>

        <div className="main">
            {children}
        </div>

    </div>
}



const SettingsPannel = ({ theme, iframeSrc, setCopied }) => {

    const dispatch = useDispatch()

    const portalDiv = document.getElementById('settingsPanelContainer')
    const [mode, setMode] = useState(null)
    const [iframeInput, setInput] = useState('')

    const { settings } = useSelector(
        ({ settings }) => ({
            settings,
        })
    );

    console.log(settings);

    const findValue = (param) => iframeInput?.match(new RegExp(`(?<=${param}\=)(.*?)(?=(\&amp\;|\&|\'|\"))`))?.at(0);

    console.log(findValue('btnBackground'));


    const parseIframe = () => {
        dispatch(setSettings({
            btnRadius: Number(findValue("btnRadius")) || settings['btnRadius'],
            fontSize: Number(findValue("fontSize")) || settings['fontSize'],
            backgroundColor: '#' + findValue("background") || settings['backgroundColor'],
            panelBackground: '#' + findValue("panelBackground") || settings['panelBackground'],
            modalBackground: '#' + findValue("modalBackground") || settings['modalBackground'],
            color: '#' + findValue("color") || settings['color'],
            btnBackground: '#' + findValue("btnBackground") || settings['btnBackground'],
            btnColor: '#' + findValue("btnColor") || settings['btnColor'],
            fontFamily: findValue("fontFamily") || settings['fontFamily'],
            cardBackground: '#' + findValue("cardBackground") || settings['cardBackground'],
            cardBackgroundBot: '#' + findValue("cardBackgroundBot") || settings['cardBackgroundBot'],
            cardColor: '#' + findValue("cardColor") || settings['cardColor'],
            cardRadius: Number(findValue("cardRadius")) || settings['cardRadius'],
            accentColor: '#' + findValue("accentColor") || settings['accentColor'],
            secondaryColor: '#' + findValue("secondaryColor") || settings['secondaryColor'],
            selectedChains: findValue("chains")?.split('-') || settings['selectedChains'],
            selectedWallets: findValue("wallets")?.split('-') || settings['selectedWallets'],
            borderColor: '#' + findValue("borderColor") || settings['borderColor'],
            iconColor: '#' + findValue("iconColor") || settings['iconColor'],
            tooltipBg: '#' + findValue("tooltipBg") || settings['tooltipBg'],
            tooltipColor: '#' + findValue("tooltipColor") || settings['tooltipColor'],
            affiliationFees: findValue('affiliationFees') ? Math.floor((Number(findValue('affiliationFees')) - 1) * 100) : settings['affiliationFees'],
            showLink: findValue('showLink') === 'true' ? true : false,
            fromChain: "",
            toChain: "",
        }))
    }


    return (
        portalDiv &&
        ReactDom.createPortal(<>
            <div className={`settingsPannel ${theme}`}>
                {false && <div className="arrows">
                    <UndoComp className="controlArrow" />
                    <UndoComp className="controlArrow" />
                </div>}
                <button className="controlBtn withIcon" onClick={() => setMode('export')}>Export code</button>
                <button className="controlBtn withIcon import" onClick={() => setMode('import')}>Import code</button>
            </div>

            {mode && <CodeModal mode={mode} setMode={setMode}>

                {mode === 'export' && <>
                    <div className="controlPannel">
                        <button className="controlBtn" onClick={() => copyCode(setCopied, 'pannelIframe')}>Copy Code</button>
                    </div>
                    <p id="pannelIframe">
                        {iframeSrc}
                    </p></>}

                {mode === 'import' && <>
                    <div className="controlPannel">
                        <button className="controlBtn" onClick={parseIframe}>Import iframe code</button>
                    </div>
                    <textarea value={iframeInput} onChange={(e) => setInput(e.target.value)}></textarea></>}



            </CodeModal>
            }

        </>, portalDiv)
    )
}

export default SettingsPannel