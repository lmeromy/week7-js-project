// 'https://api.carbondoomsday.com/api/co2/?date__range=1950-01-01%2C%202018-01-01&ordering=date&limit=50000'
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
    PubSub.publish('Keeling:data-loaded', this.data)
    // console.log(this.data);
  });

};

module.exports = KeelingCurve;
