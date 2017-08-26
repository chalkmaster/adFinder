import angular from 'angular';
import uiRouter from 'angular-ui-router';

import categoryComponent from './category.component';

let categoryModule = angular.module('components.category', [
    uiRouter
])

  .component('category', categoryComponent);

export default categoryModule;
