const PubSub = require('../helpers/pub_sub.js');
// const GoogleCharts = require('google-charts');

const AllCO2 = function (container) {
  this.container = container;
};

AllCO2.prototype.bindEvents = function () {
  PubSub.subscribe('Keeling:data-loaded', (event) => {
    // console.log(this);
    this.allData = event.detail;
    // console.log(test = this.allData.results[0].ppm); //this is an array of objects
    console.log(this.prepareData(this.allData.results))
    // console.log(array_of_arrays);
    // this.renderAllChart(rows_prepped); //is it "this"?
  })
};

AllCO2.prototype.prepareData = function (mydata) {

// for each item(which happens to be an object) in the big array, convert to array,
// change data type from str to number and from str to Date Object
  const array_objects = mydata;
  const array_of_arrays = [];

  for(object of array_objects){
    let new_ppm = Number(object.ppm);
    let new_date = new Date(object.date);
    let newItem = [new_date, new_ppm];
    // const result = Object.values(object);
    array_of_arrays.push(newItem);
  }
  return array_of_arrays;
};


AllCO2.prototype.renderAllChart = function () {
  //Load the charts library with a callback

  google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Atmospheric CO2 (ppm)');

        // replace the following with the actual data, transformed,
        // write a loop to convert the date string to a date object, put that date and the ppm value into an array for each day (array of day arrays)
        // data.addRows([
        //   [new Date('2010-01-01'), 400.1],
        //   [new Date('2010-01-02'), 401.2],
        //   [new Date('2010-01-03'), 402.6],
        //   [new Date('2010-01-04'), 404.1],
        //   [new Date('2010-01-05'), 400.9],
        //   [new Date('2010-01-06'),  401.6],
        //   [new Date('2010-01-07'),  403.7]
        // ]);
        console.log(data);

        var options = {
          chart: {
            title: 'Atmospheric Carbon Dioxide - Test',
            subtitle: 'Parts Per Million'
          },
          width: 900,
          height: 500
        };


        // var chart = new google.charts.Line(document.getElementById('chart1'));
        // var chart = new google.visualization.LineChart(document.getElementById('chart1'));

        var chart = new google.charts.Line(document.getElementById('chart1'));



        chart.draw(data, options);
      }
};


module.exports = AllCO2;
