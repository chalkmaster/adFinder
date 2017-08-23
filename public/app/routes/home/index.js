import angular from 'angular';
import ngResource   from 'angular-resource';
import uiRouter from 'angular-ui-router';

import mainState from './states/main';

import adsResource from './resource';

let homeModule = angular.module('routes.home', [
    uiRouter,
    ngResource
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      "ngInject";

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('main.home', mainState);
    }
  ])


  .factory('ads.resource', adsResource);



export default homeModule;
