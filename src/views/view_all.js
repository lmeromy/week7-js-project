const PubSub = require('../helpers/pub_sub.js');
// const GoogleCharts = require('google-charts');

const AllCO2 = function (container) {
  this.container = container;
};

AllCO2.prototype.bindEvents = function () {
  PubSub.subscribe('Keeling:data-loaded', (event) => {
    // console.log(this);
    this.allData = event.detail;
    this.renderAllChart(this.allData);
  })
};

AllCO2.prototype.renderAllChart = function (rows) {
  //Load the charts library with a callback, need Line package
  google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        const data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Atmospheric CO2 (ppm)');
        data.addRows(rows)

        const options = {
          chart: {
            title: 'Atmospheric Carbon Dioxide - Test',
            subtitle: 'Parts Per Million'
          },
          width: 900,
          height: 500,
          colors: ['red']
        };

        const chart = new google.charts.Line(document.getElementById('chart1'));



        chart.draw(data, options);
      }
};


module.exports = AllCO2;
