const { join } = require('path');

const { getCities } = require('../database/queries/getCities');
const { addCity } = require('../database/queries/addCity');

exports.renderCities = (req, res) => {
  console.log(req.login);

  if (req.login) {

    res.sendFile(join(__dirname, '..', '..', 'public', 'cities.html'));
  } else {
    res.redirect('/');
  }
};

exports.getAllCities = (req, res, next) => {
  if (req.login) {

    getCities()
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err)); getCities()
        .then(result => {
          res.json(result.rows);
        })
        .catch(err => next(err));

  } else {

    res.redirect('/');

  }

};

exports.add = (req, res, next) => {
  if (req.login) {

    const cityInfo = req.body;
    addCity(cityInfo)
      .then(() => res.redirect('/cities'))
      .catch(err => next(err));
  } else {
    res.redirect('/')
  }
};
