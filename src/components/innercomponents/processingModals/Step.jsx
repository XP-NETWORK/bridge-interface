import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Step(start) {

    const [width, setWidth] = useState(0)

    const fire = () => {
        setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            console.log('hello: ', width);   //  your code here
            setWidth(width + 1)                    //  increment the counter
            if (width <= 100) {           //  if the counter < 10, call the loop function
              fire();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
          }, 1000)
    }

    useEffect(() => {
    if(start) fire()
    }, [start])

    return (
        <div className='process-loader--grey step-one'>
            <div style={{width: `progress%`}} className='process-loader--green'></div>
        </div>
    )
}
