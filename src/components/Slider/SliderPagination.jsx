import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../store/reducers/sliderSlice';

export default function SliderPagination({start, force}) {

    const [width, setWidth] = useState(0)
    const dispatch = useDispatch()
    const step = useSelector(state => state.slider.step)
  

    useEffect(() => {
        let s
        if(start){
            s = setInterval(() => {
                if(width < 100){
                    setWidth(width + 1)
                }
                else if(width === 100){
                    clearInterval(s)
                 
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
            }, 35)}
        return () => {
            clearInterval(s)
        }
      }, );

      useEffect(() => {
          if(force){
            setWidth(100)
          }
      }, [force])
      

  return (
    <span onClick={() => setWidth(0)} className='pagination__bg'>
        <span style={{width: `${width}%`}} className='pagination__progress'></span>
    </span> 
  )
}
