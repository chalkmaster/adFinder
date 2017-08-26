import template from './app.html';

class AppController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

AppController.$inject = ['$scope'];

let appComponent = {
  template,
  restrict: 'E',
  controller: AppController
};

export default appComponent;