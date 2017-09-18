import angular from 'angular';
import ngCookies from 'angular-cookies';
import uiRouter from 'angular-ui-router';

import AuthCredentials from './auth.credentials';
import AuthService from './auth.service';
import UserValidator from './user.validator';

import AuthResource from './resource';

let authModule = angular.module('routes.auth', [
  uiRouter,
  ngCookies
]);

authModule.service('authCredentials', AuthCredentials);
authModule.service('userValidator', UserValidator);
authModule.service('authService', AuthService);
authModule.factory('auth.resource', AuthResource);


export default authModule;
