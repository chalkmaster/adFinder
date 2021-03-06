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
    this.loading = true;
    this.authService.signin({email: this.email, password: this.password}).then(() =>{
      this.loading = false;
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
  openSignin(){
    this.$uibModal.open({ template : '<signin></signin>' });
  }
  dismissFormOnLogin(){
    this.$scope.close();
  }
}

LoginController.$inject = ['$rootScope', '$uibModal', '$scope', 'authService', 'uiCommunication'];


export default LoginController;
