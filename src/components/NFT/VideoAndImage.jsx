import React from 'react'
import { useState } from 'react'
import { ReactComponent as Play } from '../../../src/assets/img/icons/Play.svg'
import { ReactComponent as Pause } from '../../../src/assets/img/icons/Pause.svg'
import { ReactComponent as PauseHover } from '../../../src/assets/img/icons/PauseHover.svg'
import { ReactComponent as PlayHover } from "../../../src/assets/img/icons/PlayHover.svg"
import { setupURI } from '../../wallet/oldHelper'
export default function VideoAndImage({ videoUrl, imageUrl, imageLoadedHandler }) {

  const [play, setPlay] = useState(false)
  const [playHover, setPlayHover] = useState(null)
  const [pauseHover, setPauseHover] = useState(null)

  const playHolder = (e, str) => {
    e.stopPropagation();
    switch (str) {
      case "play":
        setPlay(true)
        break;
      case "pause":
        setPlay(false)
        break;
      default:
        break;
    }
  }

  return ( 
    <div className="play__container">
      {play ? 
         <div className='video__wrapper'>
           <video src={setupURI(videoUrl)} autoPlay muted loop  poster={imageUrl}/>
         </div> 
         : 
         <div className='img__wrapper'>
           <img onLoad={imageLoadedHandler} src={setupURI(imageUrl)} alt="nft" />
         </div>
      }
      {play ?
       pauseHover? 
       <PauseHover onMouseEnter={() => setPauseHover(true)} onMouseLeave={() => setPauseHover(false)} className='video--toggle' onClick={(e) => playHolder(e, "pause")} video />
       : 
       <Pause onMouseEnter={() => setPauseHover(true)} onMouseLeave={() => setPauseHover(false)} className='video--toggle' onClick={(e) => playHolder(e, "pause")} video />
      :
       playHover ? 
       <PlayHover onMouseEnter={() => setPlayHover(true)} onMouseLeave={() => setPlayHover(false)} className='image--toggle' onClick={(e) => playHolder(e, "play")} />
       :
       <Play onMouseEnter={() => setPlayHover(true)} onMouseLeave={() => setPlayHover(false)} className='image--toggle' onClick={(e) => playHolder(e, "play")} />
      }
    </div>
  )
}
