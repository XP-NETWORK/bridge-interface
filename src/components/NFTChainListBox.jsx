import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { chains, CHAIN_INFO }from '../components/values'
import { setChainModal, setDepartureOrDestination, setTo, setFrom, setChainSearch, setSwitchDestination } from "../store/reducers/generalSlice"
import Chain from './innercomponents/Chain';
import ChainSearch from './innercomponents/ChainSearch';
import SelectDestination from './SelectDestination';
// import CHAIN_INFO from "./values"


export default function NFTChainListBox() {
    const dispatch = useDispatch()
    const departureOrDestination = useSelector(state => state.general.departureOrDestination)
    const chainSearch = useSelector(state => state.general.chainSearch)
    const from = useSelector(state => state.general.from)
    const to = useSelector(state => state.general.to)
    const fromChains = chains.sort((a,b) =>  a.order - b.order);
    const toChains = chains.sort((a,b) =>  a.order - b.order);
    const validatorsInfo = useSelector(state => state.general.validatorsInfo)

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

    // const checkIfLive = chain => {
    //     const nonce = CHAIN_INFO[chain]?.nonce
    //     if(validatorsInfo){
    //         return validatorsInfo[nonce]?.bridge_alive
    //     }
    // }
    
    useEffect(() => {
    }, [to])
    // if to selected 
    return (
        <>
            {/* <SelectDestination /> */}
            <div className="nftChainListBox">
                <ChainSearch />
                <ul className="nftChainList scrollSty">
                    { !from ? fromChains.filter(chain => chain.text.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : '' )).sort(chain => {
                        // if(chain.text === "Velas" && chain.newChain) return -1
                        // if(chain.newChain) return -1
                        // else return chain.a - chain.b
                       
                    }).map( filteredChain => { 
                        const { image, text, key, value, coming, newChain } = filteredChain;
                        
                        return ( 
                            <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`} />
                        )
                     }) 
                     :
                     toChains.filter(chain => chain.key.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : '' )).sort(chain => (
                        chain.newChain ? -1 : ''
                    )).map(chain => {
                        const { image, text, key, value, coming , newChain } = chain;
                        return chain.key !== from.key ? <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} chainKey={key} coming={coming} text={text} filteredChain={chain} image={image} key={`chain-${key}`}  />
                        :''
                     })
                    }            
                </ul> 
            </div>
        </>
    )
}