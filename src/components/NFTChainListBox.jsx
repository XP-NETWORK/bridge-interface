import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { chains }from '../components/values'
import { setChainModal, setDepartureOrDestination, setTo, setFrom, setChainSearch, setSwitchDestination } from "../store/reducers/generalSlice"
import ChainSearch from './innercomponents/ChainSearch';
import SelectDestination from './SelectDestination';


export default function NFTChainListBox() {
    const dispatch = useDispatch()
    const departureOrDestination = useSelector(state => state.general.departureOrDestination)
    const chainSearch = useSelector(state => state.general.chainSearch)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)

    const handleClose = () => {
        dispatch(setChainModal(false))
        dispatch(setDepartureOrDestination(""))
        dispatch(setChainSearch(''))
    }
    const chainSelectHandler = chain => {
        if(departureOrDestination === "departure"){
            if(to && chain.key !== to.key){
                dispatch(setFrom(chain))
                handleClose()
                // dispatch(setSwitchDestination(false))
            }
            else{
                dispatch(setTo(''))
                dispatch(setFrom(chain))
                handleClose()
                // dispatch(setSwitchDestination(false))
            }
        }
        else{
            dispatch(setTo(chain))
                dispatch(setSwitchDestination(false))
                handleClose()
        }
    }

    useEffect(() => {
    }, [to])

    return (
        <>
            {/* <SelectDestination /> */}
            <div className="nftChainListBox">
                <ChainSearch />
                <ul className="nftChainList scrollSty">
                    { chains ? chains.filter(chain => from ? chain.text !== from.key : chain.text.includes(chainSearch ? chainSearch : '' )).map( filteredChain => { 
                        const { image, text, key, value, coming } = filteredChain;
                        return ( 
                            <li onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
                                <div className="modalSelectOptionsText">
                                    {text}
                                </div>
                            </li>
                        )
                     } ) : "" }            
                </ul> 
            </div>
        </>
    )
}
