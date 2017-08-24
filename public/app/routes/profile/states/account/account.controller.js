class ProfileAccountController {
  constructor($scope) {
    this.name = 'Profile Account Screen';
    this.$scope = $scope;
    this.$scope.currentUser = $scope.$parent.$ctrl.currentUser;
  }
}

ProfileAccountController.$inject = ['$scope'];

export default ProfileAccountController;
