class ProfileImagensController {
  constructor($scope) {
    this.$scope = $scope;
    this.$scope.currentUser = $scope.$parent.$ctrl.currentUser;
    loadImages($scope.$parent.$ctrl.currentUser.cpf);
  }
  ngLoadImages() {
    loadImages(this.$scope.currentUser.cpf);
  }
}

ProfileImagensController.$inject = ['$scope'];

export default ProfileImagensController;
