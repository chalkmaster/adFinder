import angular from 'angular';
import Home from './home';

let componentModule = angular.module('app.routes', [
  Home.name,
]);

export default componentModule;
