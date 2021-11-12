
import styles from'./LineChartCollisionProbability.module.scss'

import { Line } from 'react-chartjs-2';
// import pattern from 'patternomaly';



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
    gradient.addColorStop(0, '#23C095    ');
    gradient.addColorStop(1, '#FEC36A    ');
    // gradient.addColorStop(1, 'red');
  }
  return gradient;
};
// gradient for main part of chart
function getGradientToMainPart(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (gradient === null || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, 'rgba(0,0,0,0)    ');
      gradient.addColorStop(1, 'rgba(127,190,98,0.5)');
      // gradient.addColorStop(1, 'red');
    }
    return gradient;
  };
// ceating custom tooltip
// function toolTip(ctx, chartArea) {
//   const chartWidth = chartArea.right - chartArea.left;
//   const chartHeight = chartArea.bottom - chartArea.top;
//   if (gradient === null || width !== chartWidth || height !== chartHeight) {
//     // Create the gradient because this is either the first render
//     // or the size of the chart has changed
//     width = chartWidth;
//     height = chartHeight;
//     gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//     gradient.addColorStop(0, '#6E56E3');
//     gradient.addColorStop(1, '#E9AFD7');
//     // gradient.addColorStop(1, 'red');
//   }
//   return gradient;
// }
// <block:external:2>
const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.cssText =`
      background: linear-gradient(285.98deg, #E3C26F -57.07%, #23C095 199.89%);
     
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

  // console.log('context', context.chart.tooltip.$context.tooltip.dataPoints[0].dataIndex)

  // console.log('tooltipData', tooltipData[tooltipIndex])
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

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
      return tooltiptitle=title
    });
//console.log('tooltiptitle', tooltiptitle)
    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {

      const bodyArr = body[0].split(':')
      const span = document.createElement('span');
    
      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;
      tr.style.fontSize = '1.6rem'
      tr.style.color = 'black'

      const td = document.createElement('td');
      td.style.borderWidth = 0;
      console.log('try to find date ', context.chart.tooltip.$context.tooltip.dataPoints[0].label)
      const tooltipIndex = context.chart.tooltip.$context.tooltip.dataPoints[0].dataIndex;
      const tooltipData =  context.chart.tooltip.$context.tooltip.dataPoints[0].dataset.data;
      const text = document.createTextNode(tooltipData[tooltipIndex]); //body

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



const leftData = [ 2400, 1500, 2344, 555, 234, 3145, 2345, 3214, 1234, 2131, 876, 456,   2400, 1500, 2344, 555, 234, 3145, 2345, 3214, 1234, 2131, 876, 456,3145, 2345, 3214, 1234, 2131, 876, 456]




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
              
              if(value<1 && value>=0.1 ) return value.toFixed(2);
              if(value<0.1 && value>=0.01 ) return value.toFixed(3);
              if(value<0.01 && value>=0.001 ) return value.toFixed(4);
              if(value<0.001 && value>=0.0001 ) return value.toFixed(5);
              if(value<0.0001 && value>=0.00001 ) return value.toFixed(6);
              if(value<0.00001 && value>=0.000001 ) return value.toFixed(7);
              if(value<0.000001 && value>=0.000001 ) return value.toFixed(8);
              if(value<0.0000001 && value>=0.0000001 ) return value.toFixed(9);
              if(value<0.00000001 && value>=0.00000001 ) return value.toFixed(10);
              // if (newValue.length<=3) return newValue + '  '
              return value;
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


  

const LineChartCollisionProbability = ({dataCollisionProbability}) => {
  
  const data = {
    //то что написано внизу
    labels: dataCollisionProbability.date,
    datasets: [
        {
            // label: 'GSAT - 31',
            data: dataCollisionProbability.collisionProbability,
            // pointRadius: 0,
            // fill: true,
             borderColor:  '#93C04E',
          //    function(context) {
          //     const chart = context.chart;
          //     const {ctx, chartArea} = chart;
      
          //     if (!chartArea) {
          //       return null;
          //     }
          //     return getGradient(ctx, chartArea);
          //   },
          //   boxShadow: '0px 1px 15px #A4ABF7',
            borderWidth: 1,
          //   fill: true,
            backgroundColor:  function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
      
              if (!chartArea) {
                return null;
              }
              return getGradientToMainPart(ctx, chartArea);
            },
              pointBackgroundColor: 	'#93C04E   ',
            fill: true,
            
            tension: 0.1,
            pointBorderColor: '#52C11E  ',
            pointBorderWidth: 1,
            pointBorderRadius: 2,
            pointHitRadius: 20,
            // fill: true,
            pointHoverBorderColor:'rgba(158, 192, 67, 0.2)',
            pointHoverBorderWidth: 12,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#93C04E          '
            // cubicInterpolationMode: 'monotone'
            },
      
    ],
  };

  return(
  <>
   
    <div className="linechartWrapper">
      <div className={styles.lineChart_tableHeader}>Collision Probability</div>
        {/* <div className="linechart_container">
          <Line data={data} 
              options = {  config.options }
              />
        </div> */}
          <div className={styles.linechart_container}>
            <Line data={data} 
              options = {  config.options } />
          </div>

    </div>
  </>
)}

export default LineChartCollisionProbability;