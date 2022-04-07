import React from 'react'
import "./Planet.css"

export default function Planet() {
  return (
        <div className="content">
            <div className="planet">
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
            </div>
            <p>Approving</p>
        </div>
  )
}
