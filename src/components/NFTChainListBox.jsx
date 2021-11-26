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
    console.log("fromChains", fromChains, "from", from);
    const toChains = chains
    console.log("toChains", toChains, "to", to);

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
                            <Chain chainSelectHandler={chainSelectHandler} text={text} filteredChain={filteredChain} image={image} key={key} />
                            // <li onClick={() => chainSelectHandler(filteredChain)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
                            //     <div className="modalSelectOptionsText">
                            //         {text}
                            //     </div>
                            // </li>
                        )
                     }) 
                     :
                     toChains.filter(chain => chain.key.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : '' )).map(chain => {
                        const { image, text, key, value, coming } = chain;
                        return chain.key !== from.key ? <Chain chainSelectHandler={chainSelectHandler} text={text} filteredChain={chain} image={image} key={key} />
                        :''
                     })
                    }            
                </ul> 
            </div>
        </>
    )
}


// TODO if from defined show me to
// TODO show to with no from chain
// TODO filter to if to includes search