import { ActionTableRow } from '../ActionTableRow/ActionTableRow'
import { LightningSvg } from '../../svg_elements/lightning';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TableCharts } from '../TableCharts/TableCharts';
import {StyledTableRow} from './StyledTableRow'
import './TableRow.scss'

export const TableRow = ({ children, tableHead, rowData, dataCollisionProbability, dataMissDistance }) => {
    
    const [openTableChart, setOpenTableChart] = useState(false)
    const handleOpenTableCharts = () => {
        setOpenTableChart( prevState => !prevState )
        console.log(openTableChart)
    }

    return (
    <>
         { tableHead &&   (<div  className="">
            <StyledTableRow tableHead={tableHead} > 
                {children}
                

             </StyledTableRow>
             </div>)
        }
        {

            rowData && (
                <>
                    <StyledTableRow onClick = {handleOpenTableCharts} classification={rowData.classification}>
                        <div className="table_cellWrapper">{rowData.conjunctionId}</div>
                        <div className="table_cellWrapper">{rowData.created}</div>
                        <div className="table_cellWrapper">{rowData.tca}</div>
                        <div className="table_cellWrapper">{rowData.collisionProbability}</div>
                        <div className="table_cellWrapper">{rowData.missDistance}</div>                        
                        <div className="table_cellWrapper">{rowData.chaser}</div>
                        <div className="table_cellWrapper">{rowData.target}</div>
                        <div className="table_cellWrapper conjunctionsClassification">
                            {rowData.classification === 'High risk' ? <LightningSvg /> : null}
                            
                            {rowData.classification}
                            
                        </div>
                        <div className="table_cellWrapper">
                            <ActionTableRow openCharts = {openTableChart} />
                        </div>
                    </StyledTableRow>
                    <TableCharts  
                        openTableChart={openTableChart}
                        dataCollisionProbability = {dataCollisionProbability}
                        dataMissDistance = {dataMissDistance}
                        />
                </>
                              
                              )
                            }
     </>

)
}
//  <div className="table_cellWrapper">{rowData.chaser}</div> 

// <div className="table_cellWrapper">
//                             {rowData.classification}
//                             <KeyboardArrowDownIcon onClick={()=>{handleOpenTableCharts()}}/> */}
//                          </div> 