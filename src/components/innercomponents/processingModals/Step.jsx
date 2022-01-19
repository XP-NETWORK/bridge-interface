import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

export default function Step(start) {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const width = useRef(0)
    const maxTimeInSeconds = 100
 


    useEffect(() => {
        let s
        if(start){
            s = setInterval(() => {
                if(progress < 100){
                    setProgress(prevProgress => prevProgress + 1)
                }
                else{
                    clearInterval(s)
                }
            }, 100);
        }
        if(progress === 100){
            console.log();
            clearInterval(s)
        }
    }, [start])



    return (
        <div className='process-loader--grey step-one'>
            <div style={{width: `${progress}%`}} className='process-loader--green'></div>
        </div>
    )
}
