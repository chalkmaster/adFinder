import angular from 'angular';
import ngResource   from 'angular-resource';
import uiRouter from 'angular-ui-router';

import profileMain from './states/main';
import profileAccountState from './states/account';
import profileModerationsState from './states/moderations';
import profileRequestsState from './states/requests';
import profileServicesState from './states/services';

import categoryResource from './states/services/resource';

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
        .state('main.profile.requests', profileRequestsState)
        .state('main.profile.services', profileServicesState);
    }
  ])

  .factory('categories.resource', categoryResource);

export default profileModule;
