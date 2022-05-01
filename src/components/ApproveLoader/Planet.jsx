import React from 'react'
import "./Planet.css"


export default function Planet() {



    let isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  return (
        <div className="content">
          {isIOS? null :  <div className="planet">
                <div className="ring"></div>
                <div className="cover-ring"></div>
                <div className="spots">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>}
            <p style={{bottom: isIOS? '90px': {} }}>Approving</p>
        </div>
  )
}
