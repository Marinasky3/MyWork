import { CSVLink } from 'react-csv'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { LightningSvg } from '../../svg_elements/lightning.js'
import {StyledDashBoardAllSatellites} from './StyledDashBoardAllSatellites.js'
import { StyledDashBoardAddedSatellite } from './StyledDashBoardAddedSatellit.js';
import { useState, useEffect} from 'react';
 // const defaultAllSatellites = [
//     {
//         name: 'Cartosat-2 Series Satellite',
//         isGuarded : false,
//         risk: 'High Risk'
//     },
//     {
//         name: 'CMS-01',
//         isGuarded : false,
//         risk: 'Low Risk'
//     },
//     {
//         name: 'EOS-01',
//         isGuarded : true,
//         risk: 'High Risk'
//     },
//     {
//         name: 'Chandrayaan2',
//         isGuarded : true,
//         risk: 'Low Risk'
//     },
//     {
//         name: '	GSAT-31',
//         isGuarded : false,
//         risk: 'High Risk'
//     },
//     {
//         name: '	GSAT-11 Mission',
//         isGuarded : true,
//         risk: 'High Risk'
//     },
//     {
//         name: 'INS-1A',
//         isGuarded : true,
//         risk: 'Low Risk'
//     },
//     {
//         name: 'RESOURCESAT-2A',
//         isGuarded : true,
//         risk: 'High Risk'
//     },
//     {
//         name: 'Crew module Atmospheric Re-entry Experiment (CARE)',
//         isGuarded : true,
//         risk: 'Low Risk'
//     },
//     {
//         name: '	Mars Orbiter Mission Spacecraft',
//         isGuarded : false,
//         risk: 'High Risk'
//     },
//     {
//         name: 'Megha-Tropiques',
//         isGuarded : true,
//         risk: 'High Risk'
//     },
//     {
//         name: 'Megha-Tropiques',
//         isGuarded : true,
//         risk: 'Low Risk'
//     },
//     {
//         name: 'Crew module Atmospheric Re-entry Experiment (CARE)',
//         isGuarded : true,
//         risk: 'Low Risk'
//     },
//     {
//         name: '	Mars Orbiter Mission Spacecraft',
//         isGuarded : false,
//         risk: 'High Risk'
//     },
//     {
//         name: 'Megha-Tropiques',
//         isGuarded : true,
//         risk: 'High Risk'
//     },
//     {
//         name: 'Megha-Tropiques',
//         isGuarded : true,
//         risk: 'Low Risk'
//     }
// ]
// 

export const DashBoardAllSatellites = ({ allSatellites }) => {

    const [ csvData, setCsvData ] = useState(null);
    const [ headersData, setHeadersData ] = useState(null);
    const getCsvInfo=()=> {
        // setShowLoader(true)
          fetch('/api/conjunction/export', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        }).then(async (res) => await res.json()).then((json) =>{
            console.log('dataFromAll: ', json.data.headers);
            setCsvData(json.data.rows);
            setHeadersData(json.data.headers);

        })
    }
    useEffect(()=>{
        getCsvInfo()
    },[])

    return (

        <StyledDashBoardAllSatellites >
            <div className="exportButton_wrapper">
                <button className="dashBoardAllSatellites_exportButton" type="button"> 
                    { csvData && headersData && 
                        <CSVLink 
                                // {...csvReport}  
                            filename={'Conjunctions.csv'} 
                            data={csvData} 
                            headers={headersData}
                                // onClick = {()=>{getCsvInfo()}}
                            >
                            Export CSV 
                        </CSVLink> 
                        }
                </button>
            </div>
            <div className="dashBoardAllSatellites_wrapper ">
                <div className="dashBoardAllSatellites_headerWrapper">
                    All Satellites Added ({allSatellites.length})
                </div>   
                <div className="dashBoardAllSatellites_allSatellitesWrapper">
                    { allSatellites.map( (satellite, index) => {
                        // console.log('isGuarded', satellite.isGuarded) 
                        const isGuarded = satellite.isGuarded ? 'Guarded' : 'Not Guarded' ;
                        const risk = satellite.risk === 'High risk' ? true : false;
                        
                        return(
                            <StyledDashBoardAddedSatellite 
                                isGuarded = {satellite.isGuarded} 
                                risk = {risk}
                                key = {index}
                            >
                                <div className="dashBoardAllSatellites_satellite_mainWrapper">
                                    <div className="dashBoardAllSatellites_satellite_name">
                                        {satellite.name}
                                    </div>
                                    <div className="dashBoardAllSatellites_satellite_risk">
                                       { risk && < LightningSvg /> }
                                        {satellite.risk}
                                        </div>
                                </div>
                                 <div className="dashBoardAllSatellites_satellite_isGuardedWrapper">
                                    {isGuarded}
                                    < FiberManualRecordIcon />
                                </div>
                            </StyledDashBoardAddedSatellite>
                        )
                    } )}
                </div>
            </div>

        </StyledDashBoardAllSatellites >
    )
}