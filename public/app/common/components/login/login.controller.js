class LoginController {
    constructor($rootScope, $uibModal, $scope, authService) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$uibModal= $uibModal;
      this.$scope.close = this.$scope.$parent.$close;
      this.authService = authService;
      $rootScope.$on('userLoggedIn', this.dismissFormOnLogin.bind(this));
  }
  signIn() {
    this.authService.signin({email: this.email, password: this.password}).then(() =>{
      console.log('sign in');
      this.$rootScope.$broadcast('userLoggedIn');
      this.$scope.close();
    }).catch(() => {
      console.log('auth failure');
    });
  }
  openRegister(){
    this.$uibModal.open({ template : '<signup></signup>' });
  }
  dismissFormOnLogin(){
    this.$scope.close();
  }
}

LoginController.$inject = ['$rootScope', '$uibModal', '$scope', 'authService'];


export default LoginController;
