import React from 'react'
import { useState } from 'react'

export default function VideoAndImage({ videoUrl, imageUrl }) {

  const [play, setPlay] = useState(false)

  return ( play ? 
  <div className='video__wrapper'>
    <div>VIDEO</div>
    <div>video toggle</div>
  </div> 
  : 
  <div className='img__wrapper'>
    <div>IMAGE</div>
    <div>image toggle</div>
  </div>
  )
}
