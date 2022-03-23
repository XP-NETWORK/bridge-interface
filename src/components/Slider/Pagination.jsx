import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../store/reducers/sliderSlice';


export default function Pagination({ start, index }) {
    const dispatch = useDispatch()
    const initialState = 0;
    const [count, setCount] = useState(initialState);
    const width = useRef(initialState);
    const step = useSelector(state => state.slider.step)
    
    useEffect(() => {
        console.log("🚀 ~ file: Pagination.jsx ~ line 12 ~ Pagination ~ step", step)
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
                        if(step === 0){
                            dispatch(setStep(1))
                        }
                        else if(step === 1){
                            dispatch(setStep(2))
                        }
                        else if(step === 2){
                            dispatch(setStep(0))
                        }
                    }
                    clearInterval(s)
                }
            }, 50);
        }
    }, [start]);


  return (
    <span onClick={() => console.log("click", index)} className='pagination__bg'>
        <span style={{width: `${width.current}%`}} className='pagination__progress'></span>
    </span>
  )
}
