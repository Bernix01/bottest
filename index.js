"use strict";
if (process.env.NODE_ENV != 'production')
require('babel-core/register');

require('./server/server');
