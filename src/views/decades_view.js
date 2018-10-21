const PubSub = require('../helpers/pub_sub.js');


const DecadesView = function (container) {
  this.container = container;
};


DecadesView.prototype.bindEvents = function () {
  PubSub.subscribe('Keeling:data-loaded', (event) => {
    // console.log(this);
    this.allData = event.detail;
    // console.log(test = this.allData);
    const prep_decades = this.prepareDecadeDropDown(this.allData);
    // console.log(prep_decades);
    this.populateDropDown(prep_decades)
  });

   this.container.addEventListener('change', (event) => {
    const selectedDecade = event.target.value;
    PubSub.publish('DecadesView:decade-selected', selectedDecade);
  })
};


DecadesView.prototype.prepareDecadeDropDown = function (data) {
  const uniqueYears = data.map(obj => obj[0].getFullYear()).filter((year, index, years) => years.indexOf(year) === index);
  const decade_array = [];
  const decade_mini_array = [];
  for(let year of uniqueYears){
    let yr_new = year.toString().slice(0,3); //convert to str, gets first 3 characters of the year
    decade_mini_array.push(yr_new);
    // yr_new.concat();
  }
  const uniqueDecade = decade_mini_array.filter((yr, index, decades) => decades.indexOf(yr) ===index);

  for(let dec of uniqueDecade){
    let dec_new = dec.concat('0s');
    decade_array.push(dec_new);
  }
  return decade_array;
};

//pass an array of unique values to populate a dropdown menu
DecadesView.prototype.populateDropDown = function (option_array) {
  option_array.forEach((element, index) => {
    const option = document.createElement('option');
    option.textContent = element;
    option.value = element.slice(0,3); // gives string of 1st 3 chars in year str
    this.container.appendChild(option);
  })
};

module.exports = DecadesView;
