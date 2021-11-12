import React from 'react';
// import { Line } from 'react-chartjs-2';
// import pattern from 'patternomaly';

import earth from './Vector (1).png'

import {  Doughnut} from 'react-chartjs-2';
import './DonutChart.css'

export const DonutChart = () => {
    const labels = ['Type 1', 'Type 2','Type 3','Type 4']
    const data = {
        labels: labels,
        datasets: [{
          label: 'Object types',
          data: [65, 59, 80, 81],
        //   data:[30, 40, 20, 30, 40, 20, 35 ],
          backgroundColor: [
            '#21449E',
            '#3467CA',
            '#3494CA',
            '#5BC8EB',
            
          ],
          borderColor: [
            '#21449E',
            '#3467CA',
            '#3494CA',
            '#5BC8EB',
            
          ],
          borderWidth: 1
        }]
      };
      // const earth = '/Vector (1).png'
 const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
        
         ctx = chart.ctx;
         var image = new Image();      
          image.src = earth;      
          const imageSize = 140;
          ctx.drawImage(image, chart.width / 2 - imageSize / 2, chart.height / 2 - imageSize / 2, imageSize, imageSize);
          ctx.restore();
        //  const context = chart.getContext("2d");
        //  context.drawImage(earth, 10, 10);
        //  ctx.restore();
        //  var fontSize = (height / 160).toFixed(2);
        //  ctx.font =  fontSize + "em sans-serif" ;
        //  ctx.fillStyle = "red";
        //  ctx.textBaseline = "top";
        //  var text = 'hgh',
        //  textX = Math.round((width - ctx.measureText(text).width) / 2),
        //  textY = (height+35 )/ 2;
        //  ctx.fillText(text, textX, textY);
        // //  ctx.color('rgb(255, 99, 132)')
        //  ctx.save();
    } 
  }]

    const config = {
        type: 'bar',
        data: data,
        options: {
            // elements: {
            //     center: {
            //       text: '2/3'
            //     }},
            cutout: '75%',
            // radius: '90%', размер кольца
            rotation: 201, //поворот кольца
            // circumference: 320,
            plugins:{
                title:{
                    text:'sddfgg',
                    display: true,
                    align:'center',
                    position: 'center',
                    color: 'white'
                },
                legend:{
                    display: false,
                    // position: 'top',
                    // align: 'end',
                    // title:{
                    //     color: 'white',
                    //     display: false
                    // }
                    labels:{
                        color: 'white',
                        font:{
                            size: 18,
                            // family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                            
                        }
                    }
                }
            },
          scales: {
              
            // y: {
            //     title: {
            //         text:'index', 
            //         display: true,
            //         color: 'white',
            //         display: false
            //     },
            // backgroundColor: 'rgba(23, 52, 71, 0.589)',
            // ticks:{
            //     color: 'white',
            //     padding: 10,
            //     display: false
            //     // textStrokeWidth: 20
            // },
            // beginAtZero: true,
            // },
            // x: {
            //     // beginAtZero: true,
            //     title: {
            //         text:'MONTH', 
            //         display: true,
            //         color: 'rgba(23, 52, 71, 0.1)',
            //         display: false
            //     },
            //     backgroundColor: 'rgba(23, 52, 71, 0.1)',
            //     ticks:{
            //         color: 'white',
            //         padding: 10,
            //         display: false
                    
            //     },
            //     grid:{
            //         borderColor: 'rgba(23, 52, 71, 0.1)',
            //         tickColor: 'rgba(23, 52, 71, 0.1)',
            //         display: false,
            //         drawOnChartArea: false
            //     }
            //     }

          }
        },
      };

    return (
        <div className="donutWrapper">
        <Doughnut 
            data={data} 
            plugins ={plugins}
            options =   {config.options} 
        />
        </div>
    )
}