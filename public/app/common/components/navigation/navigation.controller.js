class NavigationController {
  constructor($scope) {
    this.$scope = $scope;
    this.$scope.userLogged = false;
  }
}

NavigationController.$inject = ['$scope'];

export default NavigationController;
