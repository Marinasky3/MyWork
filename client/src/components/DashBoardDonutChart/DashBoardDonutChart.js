
import earth from './globe (1).png'
import {  Doughnut} from 'react-chartjs-2';
import './DashBoardDonutChart.scss'

const dataToDonutChart = [41, 29, 15, 10, 5]

export const DashBoardDonutChart = ({ donutChartData }) => {
    console.log('donutChartData', donutChartData)
    const donutChartDataKeys = Object.keys(donutChartData)
    const donutChartDataValues = Object.values(donutChartData)
    console.log('donutChartData.values', donutChartDataValues)
    console.log('donutChartDataKeys', donutChartDataKeys)

    const data = {

        datasets: [{
          label: 'Object types',
          data: donutChartDataValues,
          backgroundColor: [
            '#21449E',
            '#3467CA',
            '#3494CA',
            '#5BC8EB',
            '#5BEBE2'
            
          ],
          borderColor: [
            '#21449E',
            '#3467CA',
            '#3494CA',
            '#5BC8EB',
            '#5BEBE2'
            
          ],
          borderWidth: 1
        }]
      };

 const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
        
         ctx = chart.ctx;
         var image = new Image();      
          image.src = earth;      
          const imageSize = 100;
          ctx.drawImage(image, chart.width / 2 - imageSize / 2, chart.height / 2 - imageSize / 2, imageSize, imageSize);
          ctx.restore();
    } 
  }]

    const config = {
        type: 'bar',
        data: donutChartDataValues,
        options: {
            cutout: '75%',
            plugins:{
                tooltip: {
                    enabled: false,
                  },
                legend:{
                    display: false,
                }
            },
        },
      };

      let i =-1

    return (
     <div className="dashBoardDonutChart_wrapper">
        <div className="dashBoardDonutChart_generalInfo">
            Distribution of chaser object types
        </div>
        <div className="dashBoardDonutChart_donutChart_wrapper">
            <Doughnut 
                data={data} 
                plugins ={plugins}
                options =   {config.options} 
            />
        </div>
        <div className="dashBoardDonutChart_donutChart_legend">
            {
                donutChartDataKeys.map((key)=>{
                    i++
                    return(
                        <div className="dashBoardDonutChart_donutChart_legendFor">
                           <div className="">
                                {donutChartDataValues[i]}%
                            </div>
                            <div className="">{key}</div>
                        </div> 
                    )
                })
            }
              {
                // donutChartDataValues.map((value)=>{
                //     return(
                //         <div className="dashBoardDonutChart_donutChart_legendFor">
                //             <div className="">
                //                 {value}%
                //             </div> 
                //             <div className=""></div>
                //         </div>
                //     )
                // })
            }
            {/* <div className="dashBoardDonutChart_donutChart_legendFor">
                <div className="">
                    {donutChartData.DEBRIS}%
                </div>
                <div className="">Debris</div>
            </div>

            <div className="dashBoardDonutChart_donutChart_legendFor">
                <div className="">
                    {donutChartData.PAYLOAD}%
                </div>
                <div className="">Payload</div>
            </div>

            <div className="dashBoardDonutChart_donutChart_legendFor">
                <div className="">
                    {donutChartData.ROCKETBODY}%
                </div>
                <div className="">Rocket Body</div>
            </div>

            <div className="dashBoardDonutChart_donutChart_legendFor">
                <div className="">
                    {donutChartData.UNKNOWN}%
                </div>
                <div className="">Unknown</div>
            </div>

            <div className="dashBoardDonutChart_donutChart_legendFor">
                <div className="">
                    {donutChartData.OTHER}%
                </div>
                <div className="">Other</div>
            </div> */}

        </div>
      </div>
    )
}