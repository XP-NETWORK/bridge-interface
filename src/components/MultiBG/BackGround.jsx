import React, { useEffect, useState, use } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function BackGround() {

  const location = useLocation()
  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
  const [pathname, setPathname] = useState()

  console.log('slider');
            
  const bgStyle = {
    backgroundColor: `#E5E5E5`,
    ...location.pathname === '/connect' || location.pathname === '/' ? {backgroundImage:`url(${nfts[step].image})`}: {} ,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: "all 2s",
  }

  /*useEffect(() => {
    console.log('tlalim');
    setPathname(location.pathname)
  },[location.pathname])*/
  

  useEffect(() => {
      console.log('ralli');
  }, [step])

  return (
    <div style={bgStyle} className='multi-background'>
      <div className='multi-background__color'></div>
    </div>
  )
}
