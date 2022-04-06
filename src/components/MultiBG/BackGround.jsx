import React, { useEffect, useState, use } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function BackGround() {

  const location = useLocation()
  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
  const [style, setStyle] = useState({})


  useEffect(() => {

      setStyle({
        backgroundColor: `#E5E5E5`,
        ...location.pathname === '/connect' || location.pathname === '/' ? {backgroundImage:`url(${nfts[step].image})`}: {} ,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        transition: "all 2s",
      })
  }, [step])

  return (
    <div style={style} className='multi-background'>
            <div className="preloader" style={{display:"none"}}>
        {
          nfts.map(nft => <img src={nft.image} alt="" style={{display:"none"}}/>)
        }
      </div>
      <div className='multi-background__color'></div>
    </div>
  )
}
