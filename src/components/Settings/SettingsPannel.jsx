import React, {useState} from 'react';
import ReactDom from "react-dom"
import { Modal } from "react-bootstrap";
import {ReactComponent as UndoComp} from "./assets/img/undo.svg"
import {ReactComponent as RedoComp} from "./assets/img/undo.svg"


const CodeModal = () => {


    return <div className="codeModal">

    </div>
}



const SettingsPannel = ({theme}) => {
    
    const portalDiv = document.getElementById('settingsPanelContainer')
    const [modal, setModal] = useState(false)

    return (
        portalDiv &&
        ReactDom.createPortal(<>
                <div className={`settingsPannel ${theme}`}>
                    <div className="arrows">
                        <UndoComp className="controlArrow"/>
                        <UndoComp className="controlArrow"/>
                    </div>
                    <button className="controlBtn arrowed">Export code</button>
                </div>
                <Modal show={true}>
                   <div className="codeModal">
                        <div className="header"></div>
                        <div className="main">
                            <div className="controlPannel">

                            </div>
                            <p>
                                
                            </p>
                        </div>
                   </div>
                </Modal>
        </>, portalDiv)
    )
}

export default SettingsPannel