'use strict';

var express = require('express');
var controller = require('./bot.controller');
var csrf = require('csurf');
const bodyParser = require('body-parser');

var router = express.Router();
var parserr = bodyParser.json({
  verify: controller.verifyRequestSignature
});
var csrfProtection = csrf({
  cookie: true
});
router.get('/', controller.hook);
router.post('/', parserr, csrfProtection, controller.chat)

module.exports = router;
