import React from 'react'

import Close from '../assets/img/icons/close.svg'

function Aleart() {
    return (
        <div>
            <div className="aleartBox">
                Select Departure Chain and Destiantion to continue bridging
                <span className="closeBox"><img src={Close} alt="" /></span>
            </div>
        </div>
    )
}

export default Aleart
