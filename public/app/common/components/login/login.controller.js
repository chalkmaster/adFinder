class LoginController {
    constructor($scope, $uibModal) {
      this.$scope = $scope;
      this.$uibModal = $uibModal;
  }
}

LoginController.$inject = ['$scope', '$uibModal'];


export default LoginController;
