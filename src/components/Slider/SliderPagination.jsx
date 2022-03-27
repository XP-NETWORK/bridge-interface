import { set } from 'immutable';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProgWidth, setStep, setActionOn, setActionOff, setPosition, moveForward } from '../../store/reducers/sliderSlice';

export default function SliderPagination({start, force, index}) {
    
    const length = useSelector(state => state.slider.nfts.length)
    const width = useSelector(state => state.slider.nfts[index].progWidth)
    const action = useSelector(state => state.slider.nfts[index].action)
    const dispatch = useDispatch()
    const step = useSelector(state => state.slider.step)

    const handleClick = () => {
      if(index > step && (index !== length - 1 && index !== length - 2 && index !== length - 3 )){
        dispatch(moveForward(+(index - step)))
      }
      else if(index < step){
        // dispatch(())
      }
    }
  
    useEffect(() => {
        let s
        if(action && !s){
            s = setInterval(() => {
                if(width < 100){
                  dispatch(setProgWidth())
                }
                else if(width === 100 && index !== length - 1){
                    clearInterval(s)
                    dispatch(setActionOff())
                    dispatch(setStep(index + 1))
                    if(index > 1){
                        dispatch(setPosition())
                    }
                }
            }, 40)}
        return () => {
            clearInterval(s)
        }
      });
     

      useEffect(() => {
         if(step === index){
           dispatch(setActionOn())
         }
      }, [step])
      

  return (
    <span onClick={handleClick} className='pagination__bg'>
        <span style={{width: `${width}%`}} className='pagination__progress'></span>
    </span> 
  )
}
