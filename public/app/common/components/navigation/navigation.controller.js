class NavigationController {
  constructor($scope, $uibModal) {
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.$scope.userLogged = false;
  }
  openLogin(){
    this.$uibModal.open({ template : '<login></login>' });
  }
}

NavigationController.$inject = ['$scope', '$uibModal'];

export default NavigationController;
