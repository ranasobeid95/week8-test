const express = require('express');

const error = require('./error');
const city = require('./city');
const { renderSignup, postsignup } = require('./signup');
const { renderLogin, postLogin } = require('./login');
const { logout } = require('./logout');
const { isLogin } = require('./auth');

const router = express.Router();
router.use(isLogin);
router.route('/login').get(renderLogin).post(postLogin);
router.get('/logout', logout)
router.route('/signup').get(renderSignup).post(postsignup);
router.get('/cities', city.renderCities);
router.get('/all-cities', city.getAllCities);
router.post('/add-city', city.add);

router.use(error.client);
router.use(error.server);

module.exports = router;
