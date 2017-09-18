import angular from 'angular';
import Home from './home';
import Details from './details';
import Profile from './profile';

let routesModule = angular.module('app.routes', [
  Home.name,
  Details.name,
  Profile.name
]);

export default routesModule;
