import React from 'react'
import Coment from '../../assets/img/icons/Coment.svg'

function Comment() {
    return (
        <div className="ComentBox">
            <img src={Coment} alt="Coment" />
            <p className="">Try switching to another network</p>
        </div>
    )
}

export default Comment;
