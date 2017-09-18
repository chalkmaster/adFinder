import angular from 'angular';
import uiRouter from 'angular-ui-router';

import loginComponent from './login.component';

let loginModule = angular.module('components.login', [
    uiRouter
])

  .component('login', loginComponent);

export default loginModule;
