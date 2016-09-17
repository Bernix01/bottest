'use strict';

import angular from 'angular';

export default angular.module('bottestApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
