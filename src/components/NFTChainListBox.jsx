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
    const testnet = useSelector(state => state.general.testNet)

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
            }
            else{
                dispatch(setTo(''))
                dispatch(setFrom(chain))
                handleClose()
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
                    { !from ? fromChains.filter(chain => chain.text.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : '')).map( filteredChain => { 
                        const { image, text, key, value, coming, newChain, maintenance, testNet } = filteredChain;
                        if(testnet){
                            return testNet ? <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`} /> : ''
                        }
                        else return ( 
                            <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} maintenance={maintenance} coming={coming} text={text} chainKey={key} filteredChain={filteredChain} image={image} key={`chain-${key}`} />
                        )
                     }) 
                     :
                     toChains.filter(chain => testnet && chain.testNet).filter(chain => chain.key.toLowerCase().includes(chainSearch ? chainSearch.toLowerCase() : '' )).map(chain => {
                        const { image, text, key, value, coming , newChain, maintenance } = chain;
                        return chain.key !== from.key ? <Chain  chainSelectHandler={chainSelectHandler} newChain={newChain} chainKey={key} coming={coming} text={text} filteredChain={chain} image={image} key={`chain-${key}`}  maintenance={maintenance} />
                        :''
                     })
                    }            
                </ul> 
            </div>
        </>
    )
}