import angular from 'angular';
import uiRouter from 'angular-ui-router';
import UiCommunicationService from './uiCommunication.service';
import PsSnackbar from './snackbar';

var uiCommunication = angular.module('uiCommunication', [
  uiRouter,
  PsSnackbar.name
]);

uiCommunication.run(['$rootScope', 'uiCommunication', ($rootScope, uiCommunication) => {
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams) => {
      uiCommunication.snackbar('error');
    });
}]);

uiCommunication.service("uiCommunication", UiCommunicationService);

export default uiCommunication;
