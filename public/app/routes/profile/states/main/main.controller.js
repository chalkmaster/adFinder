class ProfileController {
  constructor($scope) {
    this.name = 'Profile Main';
    this.$scope = $scope;
  }
}

ProfileController.$inject = ['$scope'];

export default ProfileController;
