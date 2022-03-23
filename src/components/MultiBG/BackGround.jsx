import React from 'react'
import { useSelector } from 'react-redux'

export default function BackGround() {

  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
            
  const bgStyle = {
    backgroundColor: `#E5E5E5`,
    backgroundImage: `url(${nfts[step].image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: "2s",
  }

  return (
    <div style={bgStyle} className='multi-background'>
      <div className='multi-background__color'></div>
    </div>
  )
}
