
const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const KeelingCurve = function () {
  this.data = [];
};

KeelingCurve.prototype.getData = function () {
  const url = 'https://api.carbondoomsday.com/api/co2/?date__range=1958-01-01%2C%202018-10-01&ordering=date&limit=15000';
  const request = new Request(url);
  request.get().then(data => {
    this.data = data;
    // console.log(this.data);
    const prep_rows = this.prepareData(this.data.results);
    PubSub.publish('Keeling:data-loaded', prep_rows)
    // console.log(this.data);
  });

};

// process data so that it is in Google chart format (array of arrys with proper data types)
KeelingCurve.prototype.prepareData = function (mydata) {

  const array_objects = mydata;
  const array_of_arrays = [];

  for(let object of array_objects){
    let new_ppm = Number(object.ppm);
    let new_date = new Date(object.date);
    let newItem = [new_date, new_ppm];
    array_of_arrays.push(newItem);
  }
  return array_of_arrays;
};


module.exports = KeelingCurve;
