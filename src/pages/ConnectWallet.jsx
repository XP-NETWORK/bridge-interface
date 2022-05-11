import React from 'react'
import NftSelect from '../components/NftSelect'
import Slider from '../components/Slider/Slider'
import xpnetwork from "../assets/img/xpsticker.svg"
import hacken from "../assets/img/hackensticker.svg"
import ChangeWalletModal from '../components/Modals/ChangeWallet/ChangeWalletModal'

export default function ConnectWallet() {
  return (
    <>
    <div className="first-step__container">
        <ChangeWalletModal />
        <Slider />
        <NftSelect />
    </div>
    <div className='stickers'>
      <img src={xpnetwork} alt="" />
      <img src={hacken} alt="" />
    </div>
    </>
  )
}
