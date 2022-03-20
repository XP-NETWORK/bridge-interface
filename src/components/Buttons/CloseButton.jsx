import React from 'react'

export default function CloseButton({handleSearchTop}) {
  return (
    <div onClick={handleSearchTop} className='close__btn'></div>
  )
}
