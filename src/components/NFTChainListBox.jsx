import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { chains }from '../components/values'
import { setChainModal, setDepartureOrDestination, setTo, setFrom } from "../store/reducers/generalSlice"
import ChainSearch from './innercomponents/ChainSearch';


export default function NFTChainListBox() {
    const dispatch = useDispatch()
    const departureOrDestination = useSelector(state => state.general.departureOrDestination)
    const chainSearch = useSelector(state => state.general.chainSearch)
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

    return (
        <div className="nftChainListBox">
        <ChainSearch />
        <ul className="nftChainList scrollSty">
            { chains ? chains.filter(chain => chain.text.includes(chainSearch ? chainSearch : '')).map( filteredChain => { 
                const { image, text, key, value, coming } = filteredChain;
                return ( 
                <li onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
                    <div className="modalSelectOptionsText">
                        {text}
                    </div>
                </li>)
             } ) : "" }            
        </ul> 
    </div>
    )
}
