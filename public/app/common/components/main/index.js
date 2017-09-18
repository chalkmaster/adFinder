import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainComponent from './main.component';

let mainModule = angular.module('common.main', [
    uiRouter
  ])

  .config(['$stateProvider',
    ($stateProvider) => {
      $stateProvider
        .state('main', {
          template: '<main></main>',
          abstract: true
        });
    }
  ])
  .component('main', mainComponent);

export default mainModule;
