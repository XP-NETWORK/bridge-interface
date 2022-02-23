import React from 'react'
import { useState } from 'react'
import { ReactComponent as Play } from '../../../src/assets/img/icons/Play.svg'
import { ReactComponent as Pause } from '../../../src/assets/img/icons/Pause.svg'
import { ReactComponent as PauseHover } from '../../../src/assets/img/icons/PauseHover.svg'
import { ReactComponent as PlayHover } from "../../../src/assets/img/icons/PlayHover.svg"
export default function VideoAndImage({ videoUrl, imageUrl, imageLoadedHandler }) {

  const [play, setPlay] = useState(false)
  console.log("🚀 ~ file: VideoAndImage.jsx ~ line 10 ~ VideoAndImage ~ play", play)
  const [playHover, setPlayHover] = useState(null)
  console.log("🚀 ~ file: VideoAndImage.jsx ~ line 11 ~ VideoAndImage ~ playHover", playHover)
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
           <video onLoadedData={imageLoadedHandler} src={videoUrl} autoPlay muted loop />
         </div> 
         : 
         <div className='img__wrapper'>
           <img src={imageUrl} alt="nft" />
         </div>
      }
      {play &&
       playHover? 
       <PauseHover onMouseEnter={() => setPauseHover(true)} onMouseLeave={() => setPauseHover(false)} className='video--toggle' onClick={(e) => playHolder(e, "pause")} video />
       : 
       <Pause onMouseEnter={() => setPauseHover(true)} onMouseLeave={() => setPauseHover(false)} className='video--toggle' onClick={(e) => playHolder(e, "pause")} video />
      }
      {!play &&
       pauseHover ? 
       <PlayHover onMouseEnter={() => setPlayHover(true)} onMouseLeave={() => setPlayHover(false)} className='image--toggle' onClick={(e) => playHolder(e, "play")} />
       :
       <Play onMouseEnter={() => setPlayHover(true)} onMouseLeave={() => setPlayHover(false)} className='image--toggle' onClick={(e) => playHolder(e, "play")} />
      }
    </div>
  )
}
