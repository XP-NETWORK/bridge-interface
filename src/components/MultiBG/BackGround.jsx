import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function BackGround() {

  const location = useLocation()
  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
  const [pathname, setPathname] = useState()
            
  const bgStyle = {
    backgroundColor: `#E5E5E5`,
    backgroundImage: `url(${(pathname === "/connect" || pathname === "/") && nfts[step].image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: "all 2s",
  }

  useEffect(() => {
    setPathname(location.pathname)
  },[location.pathname])
  

  return (
    <div style={bgStyle} className='multi-background'>
      <div className='multi-background__color'></div>
    </div>
  )
}
