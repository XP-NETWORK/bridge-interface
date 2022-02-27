import React from 'react'
import brokenUrl from "../../assets/img/brockenurl.png";


export default function BrockenUtlGridView() {
  return (
    <div className="broken-url__wrapper">
        <img className="broken-url__img" src={brokenUrl} alt="" />
        <span className="broken__text">Broken Token URI</span>
    </div>
  )
}
