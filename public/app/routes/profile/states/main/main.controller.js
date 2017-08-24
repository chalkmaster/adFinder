class ProfileController {
  constructor($scope, authCredentials) {
    this.authCredentials = authCredentials;
    this.$scope = $scope;
    this.getCurrentUser();
  }
  getCurrentUser() {
    let token = this.authCredentials.currentAccessToken();
    if(token) {
      this.currentUser = JSON.parse(token);
    }
  }
}

ProfileController.$inject = ['$scope', 'authCredentials'];

export default ProfileController;
