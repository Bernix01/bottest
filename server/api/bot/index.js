'use strict';

var express = require('express');
var controller = require('./bot.controller');
const bodyParser = require('body-parser');

var router = express.Router();

router.get('/', controller.hook);
router.post('/',bodyParser.json({ verify: controller.verifyRequestSignature }),controller.chat)

module.exports = router;
