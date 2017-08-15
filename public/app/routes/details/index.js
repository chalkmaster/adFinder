import angular from 'angular';
import ngResource   from 'angular-resource';
import uiRouter from 'angular-ui-router';

import mainState from './states/main';

let detailsModule = angular.module('routes.details', [
    uiRouter
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      "ngInject";

      $stateProvider
        .state('main.details', mainState);
    }
  ]);

export default detailsModule;
