import angular from 'angular';
import ngResource   from 'angular-resource';
import uiRouter from 'angular-ui-router';

import mainState from './states/main';

import adsResource from './resource';

import {
  modalize
} from '../../helpers/routes';

let homeModule = angular.module('routes.home', [
    uiRouter,
    ngResource
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      "ngInject";

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main.home', mainState)
        .state('main.home.categories', modalize({
          url: 'category',
          template: '<category></category>'
        }));
    }
  ])


  .factory('ads.resource', adsResource);



export default homeModule;
