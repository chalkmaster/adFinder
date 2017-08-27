class LoginController {
    constructor($rootScope, $uibModal, $scope, authService, uiCommunication) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$uibModal= $uibModal;
      this.$scope.close = this.$scope.$parent.$close;
      this.authService = authService;
      this.uiCommunication = uiCommunication;
      $rootScope.$on('userLoggedIn', this.dismissFormOnLogin.bind(this));
  }
  signIn() {
    this.$scope.error = null;
    this.authService.signin({email: this.email, password: this.password}).then(() =>{
      console.log('sign in');
      this.$rootScope.$broadcast('userLoggedIn');
      this.uiCommunication.snackbar('Login realizado com sucesso.');
      this.$scope.close();
    }).catch(() => {
      console.log('auth failure');
      this.$scope.error = 'Falha ao realizar login.';
    });
  }
  openRegister(){
    this.$uibModal.open({ template : '<signup></signup>' });
  }
  dismissFormOnLogin(){
    this.$scope.close();
  }
}

LoginController.$inject = ['$rootScope', '$uibModal', '$scope', 'authService', 'uiCommunication'];


export default LoginController;
