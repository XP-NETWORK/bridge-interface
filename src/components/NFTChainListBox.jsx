import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Search from '../assets/img/icons/Search.svg';
import { chains }from '../components/values'
import { setChainModal, setDepartureOrDestination, setTo, setFrom } from "../store/reducers/generalSlice"


export default function NFTChainListBox() {
    const dispatch = useDispatch()
    const departureOrDestination = useSelector(state => state.general.departureOrDestination)
    const handleClose = () => {
        dispatch(setChainModal(false))
        dispatch(setDepartureOrDestination(""))
    }
    const chainSelectHandler = value => {
        if(departureOrDestination === "departure"){
            dispatch(setFrom(value))
            handleClose()
        }
        else{
            dispatch(setTo(value))
            handleClose()
        }
    }

    return (
        <div className="nftChainListBox">
        <form action="#">
            <div className="searchChain">
                <input type="search" placeholder="Search" />
                <button type="submit"><img src={Search} alt="" /></button>
            </div>
        </form>
        <ul className="nftChainList scrollSty">
            { chains ? chains.map( chain => { 
                const { image, text, key, value, coming } = chain;
                return ( 
                <li onClick={() => chainSelectHandler(value)} className="nftChainItem"><img className="modalSelectOptionsImage" src={image.src} alt={key} />
                    <div className="modalSelectOptionsText">
                        {text}
                    </div>
                </li>)
             } ) : "" }            
        </ul> 
    </div>
    )
}
