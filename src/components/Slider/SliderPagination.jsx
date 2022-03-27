import { set } from 'immutable';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProgWidth, setStep, setActionOn, setActionOff, setPosition } from '../../store/reducers/sliderSlice';

export default function SliderPagination({start, force, index}) {
    
    const length = useSelector(state => state.slider.nfts.length)
    const width = useSelector(state => state.slider.nfts[index].progWidth)
    const action = useSelector(state => state.slider.nfts[index].action)
    const dispatch = useDispatch()
    const step = useSelector(state => state.slider.step)
  
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
            }, 35)}
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
    <span className='pagination__bg'>
        <span style={{width: `${width}%`}} className='pagination__progress'></span>
    </span> 
  )
}
