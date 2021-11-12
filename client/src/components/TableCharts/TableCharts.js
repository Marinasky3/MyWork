// import { Doughnut } from 'react-chartjs-2';
import LineChartMissDistance from '../LineChartMissDistance/LineChartMissDistance'
import LineChartCollisionProbability from '../LineChartCollisionProbability/LineChartCollisionProbability'
import { DonutChart } from '../DonutChart/DonutChart'

import { StyledTableCharts } from './StyledTableCharts'
import './TableCharts.scss'

export const TableCharts = ({openTableChart, dataCollisionProbability, dataMissDistance }) => {
    return (
       < StyledTableCharts openTableChart={openTableChart}>
       {/* {collisionProbability} */}
       {/* <div className="tableCharts_title"></div> */}
       {openTableChart && 
       <>
       <LineChartMissDistance dataMissDistance={dataMissDistance} />
        <LineChartCollisionProbability dataCollisionProbability={dataCollisionProbability}/>
        </>
       }

       </StyledTableCharts>
    )
}