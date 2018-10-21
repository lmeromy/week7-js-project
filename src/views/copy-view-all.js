const PubSub = require('../helpers/pub_sub.js');
// const GoogleCharts = require('google-charts');

const AllCO2 = function (container) {
  this.container = container;
};

AllCO2.prototype.bindEvents = function () {
  PubSub.subscribe('Keeling:data-loaded', (event) => {
    // console.log(this);
    this.allData = event.detail;
    this.renderChart(this.allData, 'Atmospheric Carbon Dioxide Full Keeling Record');
  });

  PubSub.subscribe('YearsView:year-selected', (event) => {
    // console.log(event.detail); // gives the year
    this.year = event.detail;
    // console.log(test = this.allData);
    const year_array = this.prepYearChart(this.allData, this.year);
    console.log(year_array);
    // this.renderChart(year_array, `Carbon Dioxide for Year: ${this.year}`);
  });

};

AllCO2.prototype.prepYearChart = function (allData, selectedYear) {
  const year_array = [];

  for(let item of allData){
    if(item[0].getFullYear() === selectedYear){
      year_array.push(item);
    }
  }
  return year_array;
};


AllCO2.prototype.renderChart = function (rows, chartTitle, chartID) {
  //Load the charts library with a callback, need Line package
  this.container.innerHTML = '';
  google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        const data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Atmospheric CO2 (ppm)');
        data.addRows(rows)

        const options = {
          chart: {
            title: chartTitle,
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
