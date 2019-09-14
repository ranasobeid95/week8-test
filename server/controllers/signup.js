const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { join } = require('path');
const { addUser } = require('../database/queries/addUser');
const { signupSchema } = require('./schemas');

exports.renderSignup = (req, res) => {
  if (!req.login) {

    res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
  } else {
    res.redirect('/cities');
  }
};

exports.postsignup = (req, res, next) => {
  const SecretKey = process.env.SECRET_KEY;


  Joi.validate(req.body, signupSchema, (err, result) => {
    const { password, email } = result;

    if (err) {
      console.log(err);

      res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
    }
    else {
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => addUser({ email, hash }))
        .then(result => {
          const token = jwt.sign({ id: result.rows[0].id }, SecretKey);
          res.cookie("access", token);
          res.redirect("/cities");
        })
        .catch(err => next(err))

    }
  });






};
