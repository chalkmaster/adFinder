import angular from 'angular';
import MessageQueue from '../../helpers/messageQueue';

let module = angular.module('ps.snackbar', []);

module.factory("psSnackbar", ['$rootScope', function($rootScope) {
  return {
    create: function(content, duration) {
      $rootScope.$broadcast('createSnackbar', {
        'content': content,
        'duration': duration
      });
    }
  };
}]);

module.directive("psSnackbar", ["$rootScope", "$compile", "$timeout", "$q", function($rootScope, $compile, $timeout, $q) {
  return function(scope, element, attrs) {
    const snackbarDuration = attrs.snackbarDuration || 5000;
    const snackbarRemoveDelay = attrs.snackbarRemoveDelay || 200;
    const queue = new MessageQueue((message) => {
      let template = `<span>${message.content}</span>`;
      let snackbar = angular.element($compile(template)(scope));
      let snackbarContainer = angular.element(element);
      let deferred = $q.defer();

      snackbarContainer.append(snackbar);
      $timeout(() => {
        snackbar.parent().addClass("active");
      }, 100);

      $timeout(() => {
        snackbar.parent().removeClass("active");
        $timeout(() => {
          snackbar.remove();
          deferred.resolve();
        }, snackbarRemoveDelay, false);
      }, message.duration || snackbarDuration, false);
      return deferred.promise;
    });

    $rootScope.$on('createSnackbar', function(event, received) {
      queue.submit(received);
    });
  };
}]);

export default module;
