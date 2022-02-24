import React from 'react'
import brokenUrl from "../../assets/img/brockenurl.png";


export default function BrockenUtlGridView() {
  return (
    <div className="broken-url-listed__wrapper">
        <img className="broken-url__img" src={brokenUrl} alt="" />
    </div>
  )
}
