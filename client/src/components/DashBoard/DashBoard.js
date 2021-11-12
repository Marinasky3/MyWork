import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React from 'react';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

import { useState } from 'react';

import { DeleteModal } from '../DeleteModal/DeleteModal';
import { EditSatellite } from '../EditSatellite/EditSatellite';
import { DashBoardLineChart } from '../DashBoardLineChart/DashBoardLineChart';
import { DashBoardBarChart } from '../DashBoardBarChart/DashBoardBarChart';
import { DashBoardDonutChart } from '../DashBoardDonutChart/DashBoardDonutChart';
import {StyledDashBoard} from  './StyledDashBoard'
import { FirstDashboardSatellite } from '../../svg_elements/firstDashboardSatellite'
import { SecondDashboardSatellite } from '../../svg_elements/secondDashboardSatellite';
import { ThirdDashboardSatellite } from '../../svg_elements/thirdDashboardSatellite';
// const totalSatellitesAdded = 42;
const highestCollisionRisk = '4 748';
const closestEncounterDistance = '52m';
const closestEncounterSatelite = 'Cartosat-2 Series Satellite'
const totalNumberOfConjunctions = '785 458 585';
const commonObjectThatTheSatellitesConjunct =  "Ariane-5 VA-215  Ariane-5 VA-21Ariane-5 VA-21vAriane-5 VA-21";

export const DashBoard = ({activeSatellite, setActiveSatellite, allSatellites, allSatelliteInfo, handleGetExactSatellite, handleLoadDataFromBack, setIsAuthenticated }) => {

    const [ openEditModal, setOpenEditModal ] = useState(false)
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false)

    const handleOpenEditModal = () => {
        setOpenEditModal( prevState => !prevState)
    }
    const handleOpenDeleteModal = () => {
        setOpenEditModal( prevState => !prevState)
        setOpenDeleteModal( prevState => !prevState)
        console.log(openDeleteModal)
    }


    return(

        <StyledDashBoard>
            <div className="dashBoard_headerWrapper"> 
                { activeSatellite &&
                    <div className="dashBoard_headerButton_shawAll" onClick = {()=>{handleGetExactSatellite(false)}} >
                       <KeyboardArrowDownIcon />
                        Show All
                    </div>
                 }
                { activeSatellite ? activeSatellite.name : 'All Satellites' }
                {  activeSatellite &&  <CreateOutlinedIcon onClick ={handleOpenEditModal} /> }
                
                <Modal
                    open={ openEditModal }
                    onClose={ ()=>{ setOpenEditModal(false)  }}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                      }}
                >
                    <Fade in={ openEditModal }>
                         <EditSatellite 
                            satellite={activeSatellite} 
                            onclose={() => {setOpenEditModal(false)}}
                            onOpenDeleteModal = {handleOpenDeleteModal}
                            openDeleteModal = {openDeleteModal}
                            setIsAuthenticated={setIsAuthenticated}
                            />
                    </Fade>
                </Modal>
                    {/* delete modal */}
                <Modal
                    open={ openDeleteModal }
                    onClose={ ()=>{ setOpenDeleteModal(false)  }}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                      }}
                >
                    <Fade in={ openDeleteModal }>
                        <DeleteModal 
                            satellite={activeSatellite} 
                            onclose={() => {setOpenDeleteModal(false)}}
                            handleLoadDataFromBack={handleLoadDataFromBack}
                            setActiveSatellite={setActiveSatellite}
                            setIsAuthenticated={setIsAuthenticated}
                        
                        />
                    </Fade>
                </Modal>

            </div>
            <div className="dashBoard_firstThird_wrapper">
                <div className="dashBoard_firstThird_countersWrapper">

                    <div className="dashBoard_firstThird_counters__firstCounter">
                        <span> The highest collision risk so far </span>
                        <div className="dashBoard_firstThird_counters__num"> {allSatelliteInfo.highestCollisionRisk.num} </div>
                        <div className="dashBoard_firstThird_counters__satellite">{allSatelliteInfo.highestCollisionRisk.satellite}</div>

                    </div>
                     

                    <div className="dashBoard_firstThird_counters__secondCounter">
                        <span> The closest encounter so far </span>
                        <div className="dashBoard_firstThird_counters__num"> {allSatelliteInfo.closestEncounter.num} </div>
                        <div className="dashBoard_firstThird_counters__satellite">{allSatelliteInfo.closestEncounter.satellite}</div>
                    </div>
                    <div className="dashBoard_firstThird_satellitesQuantity">
                        <div className="dashBoard_firstThird_satellitesQuantity_svgWrapper">
                            < FirstDashboardSatellite />
                        </div>
                        <div className="dashBoard_firstThird_satellitesQuantity_containerWrapper">
                            <div className="dashBoard_generalInfo_wrapper">
                                Most common object that the satellites conjunct with
                            </div>
                            <div className="dashBoard_firstThird_counters__satellite">
                                {allSatelliteInfo.mostCommonObjectThatSatellitesConjunct}
                            </div>
                            
                        </div>
                    </div>

                </div>
                <div className="dashBoard_firstThird_satellitesQuantityWrapper">
                        <div className="dashBoard_firstThird_satellitesQuantity_totalSat">
                            <div className="dashBoard_firstThird_satellitesQuantity_svgWrapper">
                                < SecondDashboardSatellite />
                            </div>
                            <div className="">
                                <div className="dashBoard_generalInfo_wrapper">
                                    Total number of satellites added
                                </div>
                                <div className="dashBoard_firstThird_counters__satellite">
                                    {allSatellites.length}
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard_firstThird_satellitesQuantity_totalConj">
                            <div className="dashBoard_firstThird_satellitesQuantity_svgWrapper">
                                < ThirdDashboardSatellite />
                            </div>
                            <div className="">
                                <div className="dashBoard_generalInfo_wrapper">
                                    Total number of conjunctions 
                                </div>
                                <div className="dashBoard_firstThird_counters__satellite">
                                    {allSatelliteInfo.totalNumConjunctions}
                                </div>
                            </div>
                        </div>
                </div>

            </div>
            <div className="dashBoard_secondThird_wrapper">
                < DashBoardDonutChart  donutChartData={allSatelliteInfo.charts.donutChart}/>
                < DashBoardBarChart  barChartData={allSatelliteInfo.charts.barChart} / >
            </div>
            < DashBoardLineChart  activeSatellite={activeSatellite} lineChartData={allSatelliteInfo.charts.lineChart} />
        </StyledDashBoard>
    )
}