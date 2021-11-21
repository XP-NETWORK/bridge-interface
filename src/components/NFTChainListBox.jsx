import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { chains }from '../components/values'
import { setChainModal, setDepartureOrDestination, setTo, setFrom } from "../store/reducers/generalSlice"
import ChainSearch from './innercomponents/ChainSearch';


export default function NFTChainListBox() {
    const dispatch = useDispatch()
    const departureOrDestination = useSelector(state => state.general.departureOrDestination)
    const handleClose = () => {
        dispatch(setChainModal(false))
        dispatch(setDepartureOrDestination(""))
    }
    const chainSelectHandler = chain => {
        if(departureOrDestination === "departure"){
            dispatch(setFrom(chain))
            handleClose()
        }
        else{
            dispatch(setTo(chain))
            handleClose()
        }
    }

    // const handleChange = e => {
    //     setSearch(e.target.value)
    // }

    return (
        <div className="nftChainListBox">
        <ChainSearch />
        <ul className="nftChainList scrollSty">
            { chains ? chains.map( chain => { 
                const { image, text, key, value, coming } = chain;
                return ( 
                <li onClick={() => chainSelectHandler(chain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
                    <div className="modalSelectOptionsText">
                        {text}
                    </div>
                </li>)
             } ) : "" }            
        </ul> 
    </div>
    )
}
