import { CSVLink } from 'react-csv'

import { useState, useEffect } from 'react';
import { DashBoardAllSatellites } from '../../components/DashBoardAllSatellites/DashBoardAllSatellites'
import { DashBoard } from '../../components/DashBoard/DashBoard'
import { DashBoardHeader } from '../../components/DashBoardHeader/DashBoardHeader'
import { NoDataSatellite } from '../../svg_elements/NoDataSatellite';
import { CircleLoader } from '../../components/Loader/CircleLoader';
import {Button} from "@material-ui/core";
import  AddSat  from '../../Containers/AddSat/AddSat' 
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './DashBoardPage.scss'


const defaultAllSatellites = [
    {
        name: '',
        isGuarded : ' ',
        risk: ''
    }
]
 const defaultAllSatelliteInfo = {
    totalNumConjunctions: '',
    mostCommonObjectThatSatellitesConjunct: '',
    highestCollisionRisk: {
        num :'',
        satellite: ''
    },
    closestEncounter: {
        num :'',
        satellite: ''
    },
    charts:{
        donutChart: {
            debris: '',
            payload: '',
            rocketBody: '',
            unknown: '',
            other: '', 
        },
        barChart: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0 
        },
        lineChart: {
            numberOfConjunctions:  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                    0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    }}



export const DashBoardPage = ({setIsAuthenticated}) => {
    // const classes = useStyles();
    const [showLoader, setShowLoader] = useState(false)
 
    const [ allSatellites, setAllSatellites]  = useState([])
    const [ activeSatellite, setActiveSatellite ] = useState()
    const [ allSatelliteInfo, setAllSatelliteInfo ] = useState()

    const handleLoadDataFromBack = async() => {
        setShowLoader(true)
        const response = await  fetch('api/dashboard/getInfo?sat=allSatellite', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        });
        
        if(response.status === 200 ){

            const json = await response.json();
            if (json.data ) setAllSatelliteInfo(json.data)
        }
        if(response.status === 401 ){
            localStorage.setItem('login', "false");
            setIsAuthenticated(false)
      }

        
       
         fetch('/api/dashboard/allSatellite', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        }).then(async (res) => await res.json()).then((json) =>{
            if (json.data){
            // if (!(json.data.length === 0) )setAllSatellites(json.data)  
            setAllSatellites(json.data)
            setActiveSatellite(undefined)
            }
            setShowLoader(false)

        })
             
    }
    useEffect(() => {
        handleLoadDataFromBack()
    }, []);

    const handleGetExactSatellite = async (satellite) => {
        // console.log('hangleGetExactSatellite')
        let requestParam = ''
        if ( typeof satellite === "object" ){
             requestParam = satellite.id
        } else {
            requestParam = 'allSatellite'
            setActiveSatellite(undefined)
        }

        const response = await fetch(`api/dashboard/getInfo?sat=${requestParam}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'credentials': "include",
            }
        });
        if(response.status === 200 ){

            const json = await response.json();
            setAllSatelliteInfo(json.data)
        }
        if(response.status === 401 ){
            localStorage.setItem('login', "false");
            setIsAuthenticated(false)
      }

    }

    const [openAddSatModal, setOpenAddSatModal] = useState(false)
    const handleOpenAddSatModal = () => {
        setOpenAddSatModal( prevState => !prevState )
    }

  

    return (
        <>
            { showLoader &&   < CircleLoader type={'dashBoard'} /> }
            
             { 
            //  ( allSatellites.length !== 0 && allSatellites[0].name!=='' ) 
            allSatellites.length !==0  && 
                <div className="dashBoardPage_wrapper">
                < DashBoardHeader
                    allSatellites = {allSatellites}
                    activeSatellite = {activeSatellite}
                    setActiveSatellite = {setActiveSatellite}
                    setAllSatelliteInfo = {setAllSatelliteInfo}
                    handleGetExactSatellite={handleGetExactSatellite}
                    handleLoadDataFromBack={handleLoadDataFromBack}
                />
                <div className="dashBoardPage_dashboardWrapper">
                    < DashBoard 
                        activeSatellite = { activeSatellite }
                        setActiveSatellite = { setActiveSatellite }
                        allSatellites = { allSatellites }
                        allSatelliteInfo = { allSatelliteInfo } 
                        handleGetExactSatellite={handleGetExactSatellite}
                        handleLoadDataFromBack={handleLoadDataFromBack}
                        setIsAuthenticated={setIsAuthenticated}
                        // setActiveSatellite={setActiveSatellite}
                    />
                    < DashBoardAllSatellites allSatellites={allSatellites} />
                </div>
            </div>
            } 
            {/* {console.log('all sat name', allSatellites[0].name==='')} */}

            {/* new user add satellite */}

            { (allSatellites.length === 0 && !showLoader ) && 
                <div className="dashBoardPage_wrapper">
                    <div className="dashBoardPage_noSatWrapper">
                        <div className="dashBoardPage_dashBoardHeader">Dashboard</div>
                        < NoDataSatellite />
                        <div className="dashBoardPage_dashBoardWelcome">Welcome!</div>
                        <div className="dashBoardPage_dashBoardAddWrap">Please add satellite for working with system</div>
                        <div className="dashBoardPage_dashBoardNoSat">
                            <Button
                                // className={classes.button }
                                variant="contained"
                                color="primary" 
                                onClick={() => { handleOpenAddSatModal() }} 
                                // className="dashBoardHeader_addButton" 
                                > Add Satellite 
                            </Button>
                        </div>
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
                                    onclose={ ()=>{ setOpenAddSatModal(false) } }
                                    type={'noSat'}
                                    handleLoadDataFromBack={handleLoadDataFromBack}
                                    // handleLoadDataFromBack={handleLoadDataFromBack}


                                    />
                            </Fade>
                        </Modal>
                    </div>
                </div>
            } 

        </>
    )
}