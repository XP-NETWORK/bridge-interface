import React, { useEffect, useState, use } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function BackGround() {

  const location = useLocation()
  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
  const [style, setStyle] = useState({})

  const showBG = location.pathname === '/connect' || location.pathname === '/'


  useEffect(() => {

      setStyle({
        backgroundColor: '#E5E5E5',
        ...showBG ? {backgroundImage:`url(${nfts[step].image})`}: {backgroundImage: 'unset'} ,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        transition: "all 2s",
      })
  }, [step,location])

  return (
    <div style={style} className='multi-background'>
            <div className="preloader" style={{display:"none"}}>
        {
          nfts.map(nft => <img src={nft.image} alt="" style={{display:"none"}}/>)
        }
      </div>
      <div style={{background: showBG? 'hsla(0,0%,89.8%,.9098039215686274)': '#F0F0F3'}} className='multi-background__color'></div>
    </div>
  )
}
