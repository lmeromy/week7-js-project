const PubSub = require('../helpers/pub_sub.js');


const YearsView = function (container) {
  this.container = container;
};


YearsView.prototype.bindEvents = function () {
  PubSub.subscribe('Keeling:data-loaded', (event) => {
    // console.log(this);
    this.allData = event.detail;
    // console.log(test = this.allData);
    const prep_years = this.prepareYearDropDown(this.allData);
    // console.log(test = prep_years);
    this.populateDropDown(prep_years)
  });

   this.container.addEventListener('change', (event) => {
    const selectedYear = event.target.value;
    PubSub.publish('YearsView:year-selected', selectedYear);
  })
};



// gets unique years from full dataset, returns array with years as elements 1958 - 2018
YearsView.prototype.prepareYearDropDown = function (data) {
  const years_array = data.map(obj => obj[0].getFullYear()).filter((year, index, years) => years.indexOf(year) === index);
  return years_array;
};

//pass an array of unique values to populate a dropdown menu
YearsView.prototype.populateDropDown = function (option_array) {
  option_array.forEach((year, index) => {
    const option = document.createElement('option');
    option.textContent = year;
    option.value = year;
    this.container.appendChild(option);
  })
};

module.exports = YearsView;
