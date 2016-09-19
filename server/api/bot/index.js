'use strict';

var express = require('express');
var controller = require('./bot.controller');
const bodyParser = require('body-parser');

var router = express.Router();
var parserr = bodyParser.json({
  verify: controller.verifyRequestSignature
});
router.get('/', controller.hook);
router.post('/', parserr, controller.chat)

module.exports = router;
