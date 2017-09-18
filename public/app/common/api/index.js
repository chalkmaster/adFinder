import angular from 'angular';
import ApiHttpInterceptor from './api.http.interceptor';

let apiModule = angular.module('common.api', []);

apiModule.service('apiHttpInterceptor', ApiHttpInterceptor);

apiModule.config(['$httpProvider', '$sceDelegateProvider', ($httpProvider, $sceDelegateProvider) => {
  $httpProvider.interceptors.push('apiHttpInterceptor');
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'localhost'
  ]);
}]);

export default apiModule;
