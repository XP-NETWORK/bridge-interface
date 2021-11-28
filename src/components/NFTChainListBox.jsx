import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { chains }from '../components/values'
import { setChainModal, setDepartureOrDestination, setTo, setFrom, setChainSearch, setSwitchDestination } from "../store/reducers/generalSlice"
import Chain from './innercomponents/Chain';
import ChainSearch from './innercomponents/ChainSearch';
import SelectDestination from './SelectDestination';


export default function NFTChainListBox() {
    const dispatch = useDispatch()
    const departureOrDestination = useSelector(state => state.general.departureOrDestination)
    const chainSearch = useSelector(state => state.general.chainSearch)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const fromChains = chains
    const toChains = chains

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
    // if to selected 
    return (
        <>
            {/* <SelectDestination /> */}
            <div className="nftChainListBox">
                <ChainSearch />
                <ul className="nftChainList scrollSty">
                    { !from ? fromChains.filter(chain => chain.text.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : '' )).map( filteredChain => { 
                        const { image, text, key, value, coming } = filteredChain;
                        return ( 
                            <Chain chainSelectHandler={chainSelectHandler} coming={coming} text={text} filteredChain={filteredChain} image={image} key={key} />
                        )
                     }) 
                     :
                     toChains.filter(chain => chain.key.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : '' )).map(chain => {
                        const { image, text, key, value, coming } = chain;
                        return chain.key !== from.key ? <Chain chainSelectHandler={chainSelectHandler} coming={coming} text={text} filteredChain={chain} image={image} key={key} />
                        :''
                     })
                    }            
                </ul> 
            </div>
        </>
    )
}