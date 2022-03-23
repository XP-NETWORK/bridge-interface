import React, { useEffect, useState } from 'react'
import failedIcon from "../../../assets/img/icons/Failed.svg"
import pending from "../../../assets/img/icons/Pending.svg"
import complete from "../../../assets/img/icons/completed.svg"

export default function TxStatus({status}) {

  const [dots, setDots] = useState("")
  

  useEffect(() => {
      let interval
      if(status === "pending"){
      interval = setInterval(() => {
        if(dots?.length !== 3){
            setDots(dots+".")
        }
        else if(dots?.length === 3){
          setDots("")
        }
      }, 500);}
      return () => clearInterval(interval);
    }, );

    const showStatus = () => {
        switch (status) {
            case "failed":
            return (
              <div className='tx-status failed'>
                <div className='tx-icon'><img src={failedIcon} alt="" /></div>
                <div className='tx-txt'>Failed</div>
              </div>)
            case "pending":
            return (
              <div className='tx-status pending'>
                <div className='tx-icon'><img src={pending} alt="" /></div>
                <div className='tx-txt'>{`Pending${dots}`}</div>
              </div>)
            case "completed":
            return ( 
              <div className='tx-status completed'>
                <div className='tx-icon'><img src={complete} alt="" /></div>
                <div className='tx-txt'>Completed</div>
              </div>)
            default:
            return (
            <div className='tx-status pending'>
              <div className='tx-icon'><img src={pending} alt="" /></div>
              <div className='tx-txt'>{`Pending${dots}`}</div>
            </div>);
        }
    }

  return (
    showStatus()
  )
}
