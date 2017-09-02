import angular from 'angular';
import uiRouter from 'angular-ui-router';

import categoryComponent from './category.component';
import categoryHelper from './helper';

let categoryModule = angular.module('components.category', [
    uiRouter
])

  .component('category', categoryComponent)
  .service('categoryHelper' ,categoryHelper);

export default categoryModule;
