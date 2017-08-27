import angular from 'angular';
import ngResource   from 'angular-resource';
import uiRouter from 'angular-ui-router';

import profileMain from './states/main';
import profileAccountState from './states/account';
import profileModerationsState from './states/moderations';
import profileRequestsState from './states/requests';
import profileServicesState from './states/services';

import categoryResource from './states/services/resource';
import aproveResource from './states/moderations/resource';

import aproveComponent from './states/moderations/aprove';

import {
  modalize
} from '../../helpers/routes';

let profileModule = angular.module('routes.profile', [
    uiRouter
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      "ngInject";
      $urlRouterProvider.when('/profile','/profile/account');

      $stateProvider
        .state('main.profile', profileMain)
        .state('main.profile.account', profileAccountState)
        .state('main.profile.moderations', profileModerationsState)
        .state('main.profile.moderations.aprove', modalize({
          url: '/:id/aprove',
          template: '<aprove></aprove>',
        }))
        .state('main.profile.requests', profileRequestsState)
        .state('main.profile.services', profileServicesState);
    }
  ])

  .component('aprove', aproveComponent)
  .factory('aprove.resource', aproveResource)
  .factory('categories.resource', categoryResource);

export default profileModule;
