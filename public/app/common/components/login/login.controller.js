class LoginController {
    constructor($scope, $uibModal) {
      this.$scope = $scope;
      this.$uibModal = $uibModal;
  }
  close(){
    this.$uibModal.close();
  }

}

LoginController.$inject = ['$scope', '$uibModal'];


export default LoginController;
