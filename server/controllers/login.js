const { join } = require('path');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { loginSchema } = require('./schemas');
const { getUser } = require('../database/queries/getUser');


exports.renderLogin = (req, res, next) => {
  if (!req.login) {

    res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
  } else {
    res.redirect('/cities');
  }
};
exports.postLogin = (req, res, next) => {
  const SecretKey = process.env.SECRET_KEY;
  Joi.validate(req.body, loginSchema, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      getUser(data)
        .then(result => {
          if (result.rows[0]) {
            bcrypt.compare(data.password, result.rows[0].password, (err, isVaild) => {
              if (isVaild) {
                const token = jwt.sign({ id: result.rows[0].id }, SecretKey);
                res.cookie('access', token);
                res.redirect("/cities");
              } else {
                res.send('Password or email is wrong');
              }
            })
          } else {
            res.send('Please Sign up')
          }
        }).catch(err => next(err))
    }
  })

}
