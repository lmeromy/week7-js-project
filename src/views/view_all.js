const PubSub = require('../helpers/pub_sub.js');
// const GoogleCharts = require('google-charts');

const AllCO2 = function (container) {
  this.container = container;
};

AllCO2.prototype.bindEvents = function () {
  PubSub.subscribe('Keeling:data-loaded', (event) => {
    // console.log(this);
    this.allData = event.detail;
    this.renderChart(this.allData, 'Atmospheric Carbon Dioxide: Keeling Curve 1958 - 2018');
  });

  PubSub.subscribe('YearsView:year-selected', (event) => {
    // console.log(event.detail); // gives the year
    this.year = event.detail;
    // console.log(test = this.allData);
    const year_array = this.prepYearChart(this.allData, this.year);
    // console.log(year_array);
    this.renderChart(year_array, `Carbon Dioxide for Year: ${this.year}`);
  });

  // PubSub.subscribe('DecadesView:decade-selected', (event) => {
  //   this.dec_string = event.detail;
  //
  //   const decade_array = this.prepDecadeChart(this.allData, this.dec_string);
  //   console.log(decade_array);
  //   // this.renderChart(decade_array, `Carbon Dioxide for: ${this.dec_string}+0s`);
  //   // this.renderDecadeCharts(decade_array);
  // });

  const ViewFullKeeling = document.querySelector('#see-full-keeling');
  ViewFullKeeling.addEventListener('click', (event) => {
    this.renderChart(this.allData, 'Atmospheric Carbon Dioxide: Keeling Curve 1958 - 2018');
  });

};

AllCO2.prototype.prepYearChart = function (allData, selectedYear) {
  const year_array = [];

  for(let item of allData){
    if(item[0].getFullYear() == selectedYear){
      year_array.push(item);
    }
  }
  return year_array;
};

// NOT READY
// AllCO2.prototype.prepDecadeChart = function (allData, decadeStr) {
//   const decade_array = [];
//   let years_array = [];
//   let i = 0;
//   do {
//     i+=1;
//     let year = Number(Number(decadeStr)+i)
//     years_array.push(year)
//   } while(i<10);
//   return years_array;
//
//   const yearData = this.prepYearChart(allData,)
// };

AllCO2.prototype.renderChart = function (rows, chartTitle) {
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
            subtitle: 'Parts per million'
          },
          width: 800,
          height: 475,
          colors: ['blue'],
          legend: {position: 'none'}
        };

        const chart = new google.charts.Line(document.getElementById('chart1'));

        chart.draw(data, options);
      }
};


module.exports = AllCO2;
