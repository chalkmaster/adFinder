import angular from 'angular';
import ngResource   from 'angular-resource';
import uiRouter from 'angular-ui-router';

import mainState from './states/main';
import ratingComponent from './states/rating';

import ratingResource from './resource';

import {
  modalize
} from '../../helpers/routes';

let detailsModule = angular.module('routes.details', [
    uiRouter
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      "ngInject";

      $stateProvider
        .state('main.details', mainState)
        .state('main.details.rating', modalize({
          url: '/rating',
          template: '<rating></rating>'
        }));
    }
  ])

  .factory('ratings.resource', ratingResource)

  .component('rating', ratingComponent);

export default detailsModule;
