const DecadeRenderView = function(container, year) {
  this.yearsContainer = container;
  this.year = year; // this is an array of all data within that year
};


DecadeRenderView.prototype.render = function () {
  const yearContainer = document.createElement('div');
  yearContainer.classList.add('year');

  const yearName = this.createYearName();
  yearContainer.appendChild(yearName);

  const yearAvg = this.calcYearAvg();
  yearContainer.appendChild(yearAvg);

  // const yearMax = this.calcYearMax();
  // yearContainer.appendChild(yearMax);
  //
  // const yearMin = this.calcYearMin();
  // yearContainer.appendChild(yearMin);

  const yearChart = this.createYearChart(this.year);
  yearContainer.appendChild(yearChart);

  this.yearsContainer.appendChild(yearContainer);

};

DecadeRenderView.prototype.createYearName = function () {
  const name = document.createElement('h4');
  name.textContent = this.year[0][0].getFullYear();
  return name;
};
//
// DecadeRenderView.prototype.calcYearAvg = function () {
//   const avg = document.createElement('p');
//   const year_array = this.year;
//   year_array.reduce() // come back to this (class notes, mdn docs)
//   avg.textContent =
//   return avg;
// };

DecadeRenderView.prototype.methodName = function (rows) {
  this.container.innerHTML = '';// do i need this here?

  google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        const data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Atmospheric CO2 (ppm)');
        data.addRows(rows)

        const options = {
          chart: {
            title: 'Annual Atmospheric Carbon Dioxide',
            subtitle: 'Parts Per Million'
          },
          width: 900,
          height: 500,
          colors: ['green']
        };
// not sure which element to assign this chart to...
        const chart = new google.charts.Line(document.getElementById('chart1'));



        chart.draw(data, options);
      }
};


module.exports = DecadeRenderView;
