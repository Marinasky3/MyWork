import { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import  AddSat  from '../../Containers/AddSat/AddSat'
import { StyledDashBoardSelect } from './StyledDashBoardSelect';
import { CarbonSatellite } from '../../svg_elements/carbonSatellite'
import './DashBoardHeader.scss'

const satellites = [ 'CMS-01', 'Cartosat-2 Series Satellite', 'CMS-02', 'Dasartosat-23', 
'CMS-01', 'Cartosat-2 Series Satellite', 'CMS-02', 'Dasartosat-23', 
'CMS-01', 'Cartosat-2 Series Satellite', 'CMS-02', 'Dasartosat-23',   
]
  
export const DashBoardHeader = ({allSatellites, activeSatellite, setActiveSatellite, type, handleGetExactSatellite, setAllSatellites, handleLoadDataFromBack}) => {

    // const [selectedSatellite, setSelectedSatellite ] = useState('All satellites')  
    const [ openSelectSatellite, setOpenSelectSatellite] = useState(false)
    const handleOpenSelectSatellite = () => {
        setOpenSelectSatellite( prevState => !prevState )
    }
    const handleSelectSatellite = (satellite) => {
        handleGetExactSatellite(satellite)
        setActiveSatellite(satellite)
        
        
        console.log(satellite)
    }

    const [openAddSatModal, setOpenAddSatModal] = useState(false)
    const handleOpenAddSatModal = () => {
        setOpenAddSatModal( prevState => !prevState )
    }


   

    // const selectedSatellite = 'All satellites'
    return (
        <div className="dashBoardHeader_wrapper">
            { type ==='table' ?  
            <div className="dashBoardHeader_logo">Conjunctions</div> :
            <div className="dashBoardHeader_logo">Dashboard</div>
            }
            <div className="dashBoardHeader_inputWrapper">
                 <CarbonSatellite />
                < StyledDashBoardSelect onClick={handleOpenSelectSatellite} openSelect={openSelectSatellite} type={type}>
                   <div className="dashBoardHeader_mainSelectWrapper">
                    <div className="">
                        { activeSatellite ? activeSatellite.name : 'All Satellites'}
                    </div>

                    <div className="">
                        <KeyboardArrowDownIcon />
                    </div>
                    </div>
                    <div className="allSatellitesSelection">
                            { activeSatellite &&
                                <div className="satellites_wrapper"  onClick={() => handleSelectSatellite()}>
                                    All Satellites
                                </div>
                            }
                            { allSatellites.map( satellite => {
                                if(satellite.name === '' || satellite.name === null || satellite.name === undefined){return};
                                return(
                                    <div className="satellites_wrapper"  onClick={() => handleSelectSatellite(satellite)}>
                                        { satellite.name}
                                    </div>
                                )
                            } )}
                        
                        
                    </div>
                </StyledDashBoardSelect>
                <button onClick={ handleOpenAddSatModal } type="button" className="dashBoardHeader_addButton" > Add new </button>
                    <Modal
                        open={ openAddSatModal }
                        onClose={ ()=>{ setOpenAddSatModal(false)  }}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={ openAddSatModal }>
                            < AddSat 
                                handleLoadDataFromBack={handleLoadDataFromBack}
                                onclose={ ()=>{ setOpenAddSatModal(false) } }

                                />
                        </Fade>
                    </Modal>

            </div>

        </div>
    )
}