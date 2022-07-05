const express = require('express');
const controller = require('../controllers/loginController');
const route = express.Router();

route.post('/login', controller.login);

module.exports = route;
