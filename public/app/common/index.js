import angular from 'angular';
import Api from './api';
import Main from './components/main';
import Navigation from './components/navigation';
import Login from './components/login';
import Auth from './components/auth';

let commonModule = angular.module('app.common', [
  Api.name,
  Auth.name,
  Login.name,
  Main.name,
  Navigation.name
]);

export default commonModule;
