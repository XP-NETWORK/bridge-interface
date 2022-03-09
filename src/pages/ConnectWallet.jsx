import React from 'react'
import NftSelect from '../components/NftSelect'
import Slider from '../components/Slider/Slider'

export default function ConnectWallet() {
  return (
    <div className="first-step__container">
        <Slider />
        <NftSelect />
    </div>
  )
}
