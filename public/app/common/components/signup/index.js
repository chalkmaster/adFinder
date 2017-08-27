import angular from 'angular';
import uiRouter from 'angular-ui-router';

import signupComponent from './signup.component';

let signupModule = angular.module('components.signup', [
    uiRouter
])

  .component('signup', signupComponent);

export default signupModule;
