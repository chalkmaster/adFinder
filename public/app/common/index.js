import angular from 'angular';
import Api from './api';
import Main from './components/main';
import Navbar from './components/navbar';

let commonModule = angular.module('app.common', [
  Api.name,
  Main.name,
  Navbar.name
]);

export default commonModule;
