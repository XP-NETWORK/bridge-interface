import React, { useEffect, useRef, useState } from 'react'


export default function Pagination() {
    const initalState = 0;
    const [count, setCount] = useState(initalState);
    const width = useRef(initalState);

    useEffect(() => {
        width.current = count;
    })
  
    useEffect(() => {
        const s = setInterval(() => {
            if(width.current < 100){
                setCount(width.current + 1);
            }
            else{
                clearInterval(s)
            }
        }, 100);
    }, []);


  return (
    <span className='pagination__bg'>
        <span style={{width: `${width.current}%`}} className='pagination__progress'></span>
    </span>
  )
}
