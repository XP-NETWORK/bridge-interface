import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNFTsListView } from '../../store/reducers/generalSlice';

export default function ViewButton() {
    const dispatch = useDispatch()
    const NFTListView = useSelector((state) => state.general.NFTListView);

    const handleView = () => {
        dispatch(setNFTsListView());
    };

  return (
    <div onClick={() => handleView()} className="change-view__button">
    { NFTListView ? <div className="grid-icon"></div>:<div className="list-icon"></div> }
    </div>
  )
}
