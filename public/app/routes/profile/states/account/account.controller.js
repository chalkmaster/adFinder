class ProfileAccountController {
  constructor($scope, $http, authCredentials, uiCommunication) {
    this.name = 'Profile Account Screen';
    this.$scope = $scope;
    this.$http = $http;
    this.authCredentials = authCredentials;
    this.uiCommunication = uiCommunication;
    this.$scope.currentUser = $scope.$parent.$ctrl.currentUser;
  }
  save(){
    let model = {
      name: this.$scope.currentUser.name,
      id: this.$scope.currentUser.cpf,
      region: this.$scope.currentUser.region,
      phone: this.$scope.currentUser.phone,
      email: this.$scope.currentUser.email,
      site: this.$scope.currentUser.site
    };
    this.$http.post('api://api/v1/profile/update/', angular.toJson(model)).then(response => {
      this.uiCommunication.snackbar('Perfil salvo com sucesso !');
      this.$http.get('api://api/v1/user/' + this.$scope.currentUser.email).then( response => {
        this.authCredentials.updateToken(response.data);
        this.$scope.$parent.$ctrl.getCurrentUser();
      });
    }, (response) => {
      this.uiCommunication.snackbar('Não foi possível salvar os dados do perfil.');
      if (response.data && response.data.error_description) {
        console.log('error');
      }
    }), () => {
    };
  }
}

ProfileAccountController.$inject = ['$scope', '$http', 'authCredentials', 'uiCommunication'];

export default ProfileAccountController;
