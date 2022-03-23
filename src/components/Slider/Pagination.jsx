import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../store/reducers/sliderSlice';


export default function Pagination({ start, index, click }) {
    const dispatch = useDispatch()
    const initialState = 0;
    const [count, setCount] = useState(initialState);
    const width = useRef(initialState);
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
                        if(step === 0){
                            setTimeout(() => dispatch(setStep(1)), 100)
                        }
                        else if(step === 1){
                            setTimeout(() => dispatch(setStep(2)), 100)
                        }
                        else if(step === 2){
                            setTimeout(() => dispatch(setStep(0)), 100)
                        }
                    }
                    clearInterval(s)
                }
            }, 35);
        }
        else{
            setCount(0)
        }
    }, [start]);


  return (
    <span className='pagination__bg'>
        <span style={{width: `${width.current}%`}} className='pagination__progress'></span>
    </span>
  )
}
