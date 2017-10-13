class SigninController {
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
    this.loading = true;
    this.authService.signin({email: this.email, password: this.password}).then(() =>{
      this.loading = false;
      this.$rootScope.$broadcast('userLoggedIn');
      this.uiCommunication.snackbar('Login realizado com sucesso.');
      this.$scope.close();
    }).catch(() => {
      this.loading = false;
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

SigninController.$inject = ['$rootScope', '$uibModal', '$scope', 'authService', 'uiCommunication'];


export default SigninController;
