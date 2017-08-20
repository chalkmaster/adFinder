import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common';
import Routes from './routes';
import AppComponent from './app.component';

let app = angular.module('app', [
    uiRouter,
    Common.name,
    Routes.name
  ])

  .component('app', AppComponent)

  .config(['$compileProvider', '$locationProvider', ($compileProvider, $locationProvider) => {
    $compileProvider.debugInfoEnabled(process.env.NODE_ENV != 'production');
    $locationProvider.hashPrefix('');
  }]);

module.exports = app;