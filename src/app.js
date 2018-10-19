const KeelingCurve = require('./models/model.js');
const AllCO2 = require('./views/view_all.js');
// import {GoogleCharts} from 'google-charts';
// const Chart = require('./helpers/google_charts.js');

document.addEventListener('DOMContentLoaded', () => {
  // console.log('Javascript Loaded');

  const allDataContainer = document.querySelector('#chart-all-co2');
  const allCo2 = new AllCO2(allDataContainer);
  allCo2.bindEvents()

  const keeling = new KeelingCurve();
  keeling.getData();

// ----------------------------------------------

  // GoogleCharts.load('current', {'packages':['line']});
  // GoogleCharts.load(drawChart)
  //
  //
  //     function drawChart() {
  //
  //       var data = new google.visualization.DataTable();
  //       data.addColumn('date', 'Date');
  //       data.addColumn('number', 'Atmospheric CO2 (ppm)');
  //       data.addRows([
  //         [new Date('2010-01-01'), 400.1],
  //         [new Date('2010-01-02'), 401.2],
  //         [new Date('2010-01-03'), 402.6],
  //         [new Date('2010-01-04'), 404.1],
  //         [new Date('2010-01-05'), 400.9],
  //         [new Date('2010-01-06'),  401.6],
  //         [new Date('2010-01-07'),  403.7]
  //       ]);
  //
  //       var options = {
  //         chart: {
  //           title: 'Atmospheric Carbon Dioxide - Test',
  //           subtitle: 'Parts Per Million'
  //         },
  //         width: 900,
  //         height: 500
  //       };
  //
  //
  //       // var chart = new google.charts.Line(document.getElementById('chart1'));
  //       var chart = new google.visualization.LineChart(document.getElementById('chart1'));
  //
  //       chart.draw(data, options);
  //     }
// ----------------------------------------------

// // If above code is commented out, the below code will render...
//   //Load the charts library with a callback
//   GoogleCharts.load(drawChart);
//
//   function drawChart() {
//
//       // Standard google charts functionality is available as GoogleCharts.api after load
//       const data = GoogleCharts.api.visualization.arrayToDataTable([
//           ['Chart thing', 'Chart amount'],
//           ['Lorem ipsum', 60],
//           ['Dolor sit', 22],
//           ['Sit amet', 18]
//       ]);
//       const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
//       pie_1_chart.draw(data);
//   }
});
