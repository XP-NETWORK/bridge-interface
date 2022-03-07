import React from 'react'
import { useSelector } from 'react-redux'
// import image from "../../assets/img/slider/s3.png"

export default function BackGround() {

  const image = useSelector(state => state.slider.nft.image)
            
  const bgStyle = {
    backgroundColor: `#E5E5E5`,
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div style={bgStyle} className='multi-background'>
      <div className='multi-background__color'></div>
    </div>
  )
}
