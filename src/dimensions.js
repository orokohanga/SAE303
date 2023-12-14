// import {
//     Chart,
//     Colors,
//     BubbleController,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Legend
//   } from 'chart.js'
  
//   Chart.register(
//     Colors,
//     BubbleController,
//     PointElement,
//     CategoryScale,
//     LinearScale,
//     Legend
//   );
// import { getDimensions } from './api'


// (async function() {
//   const data = await getDimensions();
//   const data2 = data.map(row => ({
//     x: row.width,
//     y: row.height,
//     r: row.count
//   }));

//   const chartAreaBorder = {
//     id: 'chartAreaBorder',

//     beforeDraw(chart, args, options) {
//       const { ctx, chartArea: { left, top, width, height } } = chart;

//       ctx.save();
//       ctx.strokeStyle = options.borderColor;
//       ctx.lineWidth = options.borderWidth;
//       ctx.setLineDash(options.borderDash || []);
//       ctx.lineDashOffset = options.borderDashOffset;
//       ctx.moveTo(left,top)
//       ctx.lineTo(left+width, top)
//       ctx.lineTo(left+width, top+height)
//       ctx.stroke()
//       ctx.restore();
//     }
//   };
//   console.log()

//   function check(value) {
//     if(value %100 == 0) {
//         return value
//     }
//     }

//   let options = {
//     aspectRatio: 1,
//     scales: {
//       x: {  
//         max: 500,
//         ticks: {
//             callback: value => check(value)
//           }
//       },
//       y: {
//         max: 500,
//         ticks: {
//             callback: value => check(value)
//       } 
//     }
//     },
//     plugins: {
//         chartAreaBorder: {
//           borderColor: 'red',
//           borderWidth: 2,
//           borderDash: [ 5, 5 ],
//           borderDashOffset: 2,

//         }
//     }
//   }
 
//   new Chart(
//     document.getElementById('dimensions'),
//     {
//       type: 'bubble',
//       plugins: [ chartAreaBorder ],
//       options: options,
//       data: {
//         labels: data2.map(x => x.year),
//         datasets: [
//             {
//               label: 'width = height',
//               data: data2
//                 .filter(row => row.x === row.y)
//             },
//             {
//               label: 'width > height',
//               data: data2
//                 .filter(row => row.x > row.y)
//             },
//             {
//               label: 'width < height',
//               data: data2.filter(row => row.x < row.y)
                
//             }
//           ]
//       }
//     }
//   );
// })();
