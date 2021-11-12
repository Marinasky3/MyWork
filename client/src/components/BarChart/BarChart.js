import React from 'react';
import { Line } from 'react-chartjs-2';
import pattern from 'patternomaly';

import { Bar } from 'react-chartjs-2';

export const BarChart = () => {
    const labels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', ]
    const data = {
        labels: labels,
        datasets: [{
          label: 'List of monthes',
          data: [65, 59, 80, 81, 56, 55, 40],
        //   data:[30, 40, 20, 30, 40, 20, 35 ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins:{
                legend:{
                    display: true,
                    position: 'top',
                    align: 'end',
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
              
            y: {
                title: {
                    text:'index', 
                    display: true,
                    color: 'white'
                },
            backgroundColor: 'rgba(23, 52, 71, 0.589)',
            ticks:{
                color: 'white',
                padding: 10,
                // textStrokeWidth: 20
            },
            beginAtZero: true,
            // backgroundColor: 'red',
            // ticks:{ color: 'blue'}
            },
            x: {
                // beginAtZero: true,
                title: {
                    text:'MONTH', 
                    display: true,
                    color: 'white'
                },
                backgroundColor: 'rgba(23, 52, 71, 0.589)',
                ticks:{
                    color: 'white',
                    padding: 10,
                    
                },
                grid:{
                    borderColor: 'white',
                    tickColor: 'white',
                    drawOnChartArea: false
                }
                }

          }
        },
      };

    return (
        <div className="linechartWrapper">
        <Bar 
            data={data} 
            
            options = {  config.options }
        />
        </div>
    )
}