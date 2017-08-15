import angular from 'angular';
import ngResource   from 'angular-resource';
import uiRouter from 'angular-ui-router';

import mainState from './states/main';

let homeModule = angular.module('routes.home', [
    uiRouter
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      "ngInject";

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('main.home', mainState);
    }
  ]);

export default homeModule;
