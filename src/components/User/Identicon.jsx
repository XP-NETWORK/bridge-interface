import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Blockies from 'react-blockies';

export default function Identicon({ account }) {

  const getRgb = () => Math.floor(Math.random() * 256 )

  const rgbToHex = (r, g, b) => 
  "#" + 
  [r, g, b]. map( x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')

  const generate = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    }
    return rgbToHex(color.r, color.g, color.b)

  }
  
  return (
    <Blockies
      seed={account} 
      size={10}
      scale={3}
      color={generate()} 
      bgColor="#fff" 
      spotColor={generate()} 
      className="identicon" 
  />
  )
}


