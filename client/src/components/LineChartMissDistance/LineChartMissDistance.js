import {useState} from 'react';
import { Line } from 'react-chartjs-2';
// import pattern from 'patternomaly';

import './LineChartMissDistance.scss'

let width, height, gradient;
// функция для создания градиента цвета линии
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#4776E6');
    gradient.addColorStop(1, '#54E0E9  ');
    // gradient.addColorStop(1, 'red');
  }
  return gradient;
};
// ceating custom tooltip
function backGroundGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, '#25AEE1  ');
    // gradient.addColorStop(1, 'red');
  }
  return gradient;
}
// <block:external:2>
const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.cssText =`
      background: linear-gradient(285.98deg, #0E7CAA -57.07%, #0CE2E2 199.89%);;
     
      text-align: start;
      font-family: 'Barlow', sans-serif';
      `
    tooltipEl.style.borderRadius = '8px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, -140%)';
    tooltipEl.style.transition = 'all 300ms ease';
     

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  let bodysecond ='';
  let tooltiptitle = ''
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      th.style.fontSize = '1.6rem'
      th.style.fontWeight = '400'
      const text = document.createTextNode(title); //title
      // console.log('bodysecond 2', bodysecond)
      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
      return tooltiptitle=title
    });
// console.log('tooltiptitle', tooltiptitle)
    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      // const colors = tooltip.labelColors[i];
      // console.log('body', body[0])
      const bodyArr = body[0].split(':')
      console.log('body', bodyArr)
      const span = document.createElement('span');
    
      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;
      tr.style.fontSize = '1.6rem'
      tr.style.color = 'black'

      const td = document.createElement('td');
      td.style.borderWidth = 0;
      // bodysecond = bodyArr[1];
      // console.log('bodysecond 1', bodysecond)
      const text = document.createTextNode(bodyArr[1]); //body

      
    //  const newNode = document.createElement('div')
      // elementToTh.prepend(newNode)
      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
      return bodysecond = bodyArr[1]
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  // bodysecond = bodysecond.replace(/\s+/g, '');
  // const numBodySecond = Number(bodysecond)
  // console.log('bodysecond',  bodysecond)
  // console.log('bodysecond type',  typeof bodysecond)
  // console.log('numBodySecond',  numBodySecond)
  // const newBodySecond = (numBodySecond/1000).toFixed(1) +'k'
  
  // console.log( newBodySecond)
  // const numBodySecond = 
  const elementToTh = document.querySelector('div>table>thead>tr>th')
      // elementToTh.innerText= newBodySecond+' '+tooltiptitle
      elementToTh.innerText= tooltiptitle
      // console.log('elementToTh', elementToTh)

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.fontSize = 'small';
  tooltipEl.style.fontFamily = 'Barlow'
  tooltipEl.style.padding = 6+ 'px ' + 12 + 'px';
};

  

const LineChartMissDistance = ({dataMissDistance}) => {
  
  
  // console.log('dataMissDistance', dataMissDistance)
  const data = {
    //то что написано внизу
    labels: dataMissDistance.date,
    datasets: [
        {
            label: 'GSAT - 31',
            data:  dataMissDistance.missDistance,
            // pointRadius: 0,
            // fill: true,
             borderColor: '#25AEE1',
            boxShadow: '0px 1px 15px #A4ABF7',
            borderWidth: 1,
            fill: true,
            pointBackgroundColor: 	'#25AEE1',
            backgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
      
              if (!chartArea) {
                return null;
              }
              return backGroundGradient(ctx, chartArea);
            },
            tension: 0.1,
            pointBorderColor: '#4776E6',
            pointBorderWidth: 1,
            pointBorderRadius: 2,
            pointHitRadius: 20,
            // fill: true,
            pointHoverBorderColor:'rgba(14, 124, 170, 0.2)',
            pointHoverBorderWidth: 12,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#0CE2E2          '
            // cubicInterpolationMode: 'monotone'
            },
      
    ],
  };
    const config = {
      type: 'bar',
      // data: data,
      options: {
        elements:{
          point: 22
        },
        animation: {
          duration: 0
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
            external: externalTooltipHandler
          }
        } ,
        scales: {
          y: {
            beginAtZero: true,
            // suggestedMax: 4000,
            ticks:{ 
              callback: function(value, index, values){
                if (value <= 999) return value
                const newValue = value / 1000 + 'k'
                
                if (newValue.length<=3) return newValue + '   '
                return newValue;
              },
              color: '#7CB3BF',
              backdropColor: 'red',
              major: false,
              drawTicks: false,
              offset: true,
              font:{
                family: 'Barlow'
              }
            },
            grid:{
                
              // drawOnChartArea: false,
              color: '#223540',
              borderColor: 'red',
              // borderWidth: '1px'
              // circular: true
              // display: false,
              drawBorder: false,
              drawTicks: true,
              tickColor: '#262628'
          }
          },
        
          x: {
              // beginAtZero: true,
              drawTicks: false,
              offset: true,
              // backgroundColor: 'blue',
              ticks:{
                color: '#7CB3BF',
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
  return (
  <>
   
    <div className="linechartWrapper">
      <div className="lineChart_tableHeader">Miss Distance</div>
        {/* <div className="linechart_container">
          <Line data={data} 
              options = {  config.options }
              />
        </div> */}
          <div className="linechart_container">
            <Line data={data} 
              options = {  config.options } />
          </div>

    </div>
  </>
)}

export default LineChartMissDistance;