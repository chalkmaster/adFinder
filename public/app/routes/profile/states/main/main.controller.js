class ProfileController {
  constructor($scope, $state, authCredentials) {
    this.authCredentials = authCredentials;
    this.$state = $state;
    this.$scope = $scope;
    this.getCurrentUser();
  }
  getCurrentUser() {
    let token = this.authCredentials.currentAccessToken();
    if(token) {
      this.currentUser = JSON.parse(token);
    }else {
      this.$state.go('main.home');
    }
  }
}

ProfileController.$inject = ['$scope', '$state', 'authCredentials'];

export default ProfileController;
