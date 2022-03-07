import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../store/reducers/sliderSlice';


export default function Pagination({start}) {
    const dispatch = useDispatch()
    const initalState = 0;
    const [count, setCount] = useState(initalState);
    const width = useRef(initalState);
    const step = useSelector(state => state.slider.step)

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
                    if(width.current === 100){
                        if(step === 1){
                            dispatch(setStep(2))
                        }
                        else{
                            dispatch(setStep(3))
                        }
                    }
                    clearInterval(s)
                }
            }, 50);
        }
    }, [start]);


  return (
    <span className='pagination__bg'>
        <span style={{width: `${width.current}%`}} className='pagination__progress'></span>
    </span>
  )
}
