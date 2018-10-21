const KeelingCurve = require('./models/model.js');
const AllCO2 = require('./views/view_all.js');
const YearsView = require('./views/years_view.js')
const DecadesView = require('./views/decades_view.js')


document.addEventListener('DOMContentLoaded', () => {
  // console.log('Javascript Loaded');

  const allDataContainer = document.querySelector('#chart-all-co2');
  const allCo2 = new AllCO2(allDataContainer);
  allCo2.bindEvents()

  const yearDropDown = document.querySelector('#year-dropdown-options');
  const yearOptions = new YearsView(yearDropDown);
  yearOptions.bindEvents()

  const decadeDropDown = document.querySelector('#decade-dropdown-options');
  const decadeOptions = new DecadesView(decadeDropDown);
  decadeOptions.bindEvents()

  const keeling = new KeelingCurve();
  keeling.getData();

});
