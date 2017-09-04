class ProfileRequestsController {
  constructor($scope) {
    this.name = 'Profile Screen';
    this.$scope = $scope;
    this.$scope.currentUser = $scope.$parent.$ctrl.currentUser;
  }
}

ProfileRequestsController.$inject = ['$scope'];

export default ProfileRequestsController;
