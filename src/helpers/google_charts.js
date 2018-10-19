const Chart = function () {

};

// add an event listener, and assign the callback to be all the following??

Chart.prototype.bindEvents = function () {

  //Load the charts library with a callback
  GoogleCharts.load(drawChart);

  function drawChart() {

    // Standard google charts functionality is available as GoogleCharts.api after load
    const data = GoogleCharts.api.visualization.arrayToDataTable([
      ['Chart thing', 'Chart amount'],
      ['Lorem ipsum', 60],
      ['Dolor sit', 22],
      ['Sit amet', 18]
    ]);
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
    pie_1_chart.draw(data);
  }

};

module.exports = Chart;
