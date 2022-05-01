import React from 'react'
import { useState } from 'react'
import { ReactComponent as Play } from '../../../src/assets/img/icons/_play.svg'
import { ReactComponent as PlayHover } from "../../../src/assets/img/icons/hover_play.svg"
import { ReactComponent as Pause } from '../../../src/assets/img/icons/_pause.svg'
import { ReactComponent as PauseHover } from '../../../src/assets/img/icons/hover_pause.svg'
import { setupURI } from '../../wallet/oldHelper'
export default function VideoAndImage({ videoUrl, imageUrl, imageLoadedHandler, index }) {

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
           <video src={setupURI(videoUrl)} controls={false}  playsInline={true} autoPlay={true} loop={true}  poster={imageUrl}/>
         </div> 
         : 
         <div className='img__wrapper'>
           <img loading="lazy" onLoad={imageLoadedHandler} src={setupURI(imageUrl)} alt="" />
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
