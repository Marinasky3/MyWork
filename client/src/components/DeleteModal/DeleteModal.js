import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import { DeleteSatelliteSvg } from '../../svg_elements/deleteSatelliteSvg'
import { CircleLoader } from '../Loader/CircleLoader';

import './DeleteModal.scss'



export const DeleteModal = ({satellite, onclose, handleLoadDataFromBack, setActiveSatellite, setIsAuthenticated}) => {

    const [showLoader, setShowLoader] = useState(false)
    const handleDeleteModal = async (satellite) => {
        setShowLoader(true)
        console.log('satellite.id: ', satellite.id);
       const response = await fetch(`api/dashboard/deleteSatellite`, {
            method: 'POST',
            body: JSON.stringify({id: satellite.id}),
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",

        }
    });
    if(response.status === 200 ){
        // setTimeout(()=>{
            handleLoadDataFromBack()
        //     console.log('hello from delete ---------------------')
        // }, 2000)
        setIsAuthenticated(true)
        onclose()
        setShowLoader(false)
    }
    if(response.status === 401 ){
        localStorage.setItem('login', "false");
        setIsAuthenticated(false)
  }
    }


    return (
        <>
        { showLoader && < CircleLoader type={'dashBoard'} /> }
        <div className="deleteModal_wrapper">
            <div className="deleteModal_mainWrapper">
                <DeleteSatelliteSvg />
                <div className="deleteModal_textWrapper">
                    <div className="deleteModal_headerWrapper">
                        Remove Satellite
                    </div>
                    Are you sure you want to remove “{ satellite ? satellite.name : null}” Satellite?
                </div>
                <CloseIcon  onClick={onclose}/>
            </div>
            <div className="deleteModal_footerWrapper">
                <button onClick={onclose} className='deleteModal_cancelButton' type="button">Cancel</button>
                <button 
                    className='deleteModal_deleteButton' 
                    type="button"
                    onClick={()=>{handleDeleteModal(satellite); onclose(); setActiveSatellite(undefined)}}>
                        Remove
                </button>
            </div>
            

        </div>
        </>
    )
}