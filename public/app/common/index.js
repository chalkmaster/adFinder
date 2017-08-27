import angular from 'angular';
import Api from './api';
import Main from './components/main';
import Navigation from './components/navigation';
import Login from './components/login';
import Signup from './components/signup';
import Category from './components/category';
import Auth from './components/auth';
import UiCommunication from './uiCommunication';

let commonModule = angular.module('app.common', [
  Api.name,
  Auth.name,
  Category.name,
  Signup.name,
  Login.name,
  Main.name,
  Navigation.name,
  UiCommunication.name
]);

export default commonModule;
