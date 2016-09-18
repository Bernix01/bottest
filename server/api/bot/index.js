'use strict';

var express = require('express');
var controller = require('./bot.controller');

var router = express.Router();

router.get('/', controller.hook);

module.exports = router;
