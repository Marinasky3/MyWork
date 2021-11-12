
import { Bar } from 'react-chartjs-2';

import './DashBoardBarChart.scss'


export const DashBoardBarChart = ({ barChartData }) => {

  // const lineChartDataMaxY = Math.max(...lineChartData.numberOfConjunctions);
  const arrWithData = Object.values(barChartData);
  const maxData = Math.max(...arrWithData);
  console.log('Object.values(barChartData)', maxData)
    let width, height, gradient;
    function backGroundGradient(ctx, chartArea) {
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (gradient === null || width !== chartWidth || height !== chartHeight) {

          width = chartWidth;
          height = chartHeight;
          gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(1, '#0CE2E2  ');
          gradient.addColorStop(0, '#27AAE1  ');

        }
        return gradient;
      }


    const labels = [ 1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001]
    const data = {
        labels: labels,
        datasets: [{
          data: [ barChartData[0] , barChartData[1], barChartData[2], barChartData[3], barChartData[4], barChartData[5], barChartData[6], barChartData[7]],

        backgroundColor: function(context) {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
    
            if (!chartArea) {
              return null;
            }
            return backGroundGradient(ctx, chartArea);
          },

          borderWidth: 1,
          barPercentage: 0.5,
          borderRadius: 4
        }]
      };

      const config = {
        type: 'bar',
        data: data,
        options: {
          elements:{
            point: 22
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins:{
            legend:{
              display: false
            },
            tooltip: {
             
              enabled: false,
              position: 'nearest',

            }
          } ,
          scales: {
            y: {
              beginAtZero: true,
              // suggestedMax: 4000,
              ticks:{ 
                // callback: function(value, index, values){
                //   if (value <= 500) return value
                //   const newValue = value / 1000 + 'k'
                //   if (newValue.length<=3) return newValue + '   '
                //   return newValue;
                // },
                color: '#7CB3BF',
                stepSize: maxData <= 10 ? 1 : null,
                backdropColor: 'red',
                major: false,
                drawTicks: false,
                offset: true,
                font:{
                  family: 'Barlow'
                }
              },
              grid:{

                color: '#223540',
                borderColor: 'red',
                drawBorder: false,
                drawTicks: true,
                tickColor: '#262628'
            }
            },
           
            x: {

                drawTicks: false,
                offset: true,
                ticks:{
                  color: '#262628',
                  font:{
                    family: 'Barlow'
                  },
                  backdropColor: 'red',
                  major: false,
    
              },
                grid:{  
                    drawOnChartArea: false,
                    drawTicks: true,
                    tickColor: '#262628'
                }
                }
    
          }
        },
      };

    return(
        <div className="dashBoardBarChart_wrapper">
            <div className="dashBoardBarChart_headerWrapper">
             Number of conjunctions at different risk thresholds last year
            </div>
            <div className="dashBoardBarChart_barChart_wrapper">
                <Bar 
                    data={data} 
                    options = {  config.options }
                />
                <div className="dashBoardBarChart_bottomLegend">
                    <div className="">
                        10 <sup>0</sup>
                    </div>
                    <div className="">
                        10 <sup>-1</sup>
                    </div>
                    <div className="">
                        10 <sup>-2</sup>
                    </div>
                    <div className="">
                        10 <sup>-3</sup>
                    </div>
                    <div className="">
                        10 <sup>-4</sup>
                    </div><div className="">
                        10 <sup>-5</sup>
                    </div>
                    <div className="">
                        10 <sup>-6</sup>
                    </div><div className="">
                        10 <sup>-7</sup>
                    </div>
                </div>
            </div>
        </div>
    )
}