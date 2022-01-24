import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

export default function Step({start}) {

    const initalState = 0;
    const [count, setCount] = useState(initalState);
    const width = useRef(initalState);
  
    useEffect(() => {
        width.current = count;
    })
  
    useEffect(() => {
      if(start){
        const s = setInterval(() => {
            if(width.current < 100){
                setCount(width.current + 1);
            }
            else{
                clearInterval(s)
            }
        }, 100);
      }
    }, [start]);

    return (
        <div className='process-loader--grey step-one'>
            <div style={{width: `${width.current}%`}} className='process-loader--green'></div>
        </div>
    )
}
